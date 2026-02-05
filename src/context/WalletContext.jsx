import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useTonAddress, useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";
import { ethers } from "ethers";

/**
 * WalletContext
 * Owns global wallet state:
 * - wallet connection status
 * - connected wallet address
 * - wallet balance
 * - wallet type (TON or Ethereum)
 * - connection/disconnection methods
 *
 * Integrates with TON Connect for Telegram Wallet
 * and MetaMask for desktop development testing.
 *
 * NOTHING visual lives here.
 * This is pure state + intent.
 */

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected"); // disconnected | connecting | connected | error
  const [walletType, setWalletType] = useState(null); // ton | ethereum | null
  const [error, setError] = useState(null);

  // TON Connect hooks
  const tonAddress = useTonAddress();
  const tonWallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  /**
   * Connect to Telegram Wallet via TON Connect
   */
  const connectTON = useCallback(async () => {
    try {
      setConnectionStatus("connecting");
      setError(null);

      // Open TON Connect modal
      await tonConnectUI.openModal();

      // The connection state will be updated via the useEffect hook
      // that listens to tonAddress and tonWallet changes
    } catch (err) {
      setConnectionStatus("error");
      setError(err.message || "Failed to connect to Telegram Wallet");
    }
  }, [tonConnectUI]);

  /**
   * Connect to MetaMask (fallback for desktop development)
   */
  const connectMetaMask = useCallback(async () => {
    try {
      setConnectionStatus("connecting");
      setError(null);

      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("MetaMask not found. Please install MetaMask to continue.");
      }

      // Create provider
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Request connection
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get signer and address
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Get balance
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.formatEther(balance);

      // Update state
      setWalletAddress(address);
      setWalletBalance(formattedBalance);
      setWalletType("ethereum");
      setConnectionStatus("connected");

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          // User disconnected wallet
          disconnect();
        } else {
          // User switched accounts
          setWalletAddress(accounts[0]);
          updateBalance();
        }
      });

      // Listen for network changes
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    } catch (err) {
      setConnectionStatus("error");
      if (err.code === 4001) {
        setError("Connection cancelled");
      } else {
        setError(err.message || "Failed to connect to MetaMask");
      }
    }
  }, []);

  /**
   * Disconnect wallet
   */
  const disconnect = useCallback(async () => {
    try {
      // Disconnect TON Connect if connected
      if (walletType === "ton" && tonConnectUI) {
        await tonConnectUI.disconnect();
      }

      // Clear state
      setWalletAddress(null);
      setWalletBalance(null);
      setWalletType(null);
      setConnectionStatus("disconnected");
      setError(null);

      // Remove MetaMask event listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      }
    } catch (err) {
      setError(err.message || "Failed to disconnect");
    }
  }, [walletType, tonConnectUI]);

  /**
   * Update wallet balance
   */
  const updateBalance = useCallback(async () => {
    try {
      if (!walletAddress) return;

      if (walletType === "ethereum" && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(walletAddress);
        const formattedBalance = ethers.formatEther(balance);
        setWalletBalance(formattedBalance);
      }
      // TON balance updates would go here in future
      // For now, TON Connect doesn't expose balance directly
    } catch (err) {
      setError("Unable to fetch balance. Check connection.");
    }
  }, [walletAddress, walletType]);

  /**
   * Effect: Sync TON Connect state
   * Automatically updates wallet state when TON Connect connection changes
   */
  useEffect(() => {
    if (tonWallet && tonAddress) {
      // TON wallet is connected
      setWalletAddress(tonAddress);
      setWalletType("ton");
      setConnectionStatus("connected");
      setWalletBalance(null); // TON Connect doesn't expose balance directly yet
      setError(null);
    } else if (!tonWallet && walletType === "ton") {
      // TON wallet was disconnected
      setWalletAddress(null);
      setWalletBalance(null);
      setWalletType(null);
      setConnectionStatus("disconnected");
      setError(null);
    }
  }, [tonWallet, tonAddress, walletType]);

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        walletBalance,
        connectionStatus,
        walletType,
        error,
        connectTON,
        connectMetaMask,
        disconnect,
        updateBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

/**
 * Hook helper
 */
export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used inside WalletProvider");
  }
  return ctx;
}
