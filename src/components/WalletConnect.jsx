import { useWallet } from "../context/WalletContext";
import "../screens/profile.css";

/**
 * WalletConnect Component
 * User-facing wallet connection UI that:
 * - Shows connection status
 * - Displays wallet address and balance when connected
 * - Provides connect/disconnect controls for TON and MetaMask
 * - Displays error messages
 * - Shows loading state during connection
 */

export default function WalletConnect() {
  const {
    walletAddress,
    walletBalance,
    connectionStatus,
    walletType,
    error,
    connectTON,
    connectMetaMask,
    disconnect,
  } = useWallet();

  /**
   * Truncate wallet address for display
   * Example: 0x1234567890abcdef -> 0x1234...cdef
   */
  const truncateAddress = (address) => {
    if (!address) return "";
    if (address.length < 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  /**
   * Format balance for display
   * Shows 4 decimal places
   */
  const formatBalance = (balance) => {
    if (!balance) return "0.0000";
    const num = parseFloat(balance);
    return num.toFixed(4);
  };

  /**
   * Get wallet type display name
   */
  const getWalletTypeName = () => {
    if (walletType === "ton") return "TON";
    if (walletType === "ethereum") return "MetaMask";
    return "";
  };

  return (
    <div className="profile-section">
      <div className="profile-title">Wallet</div>

      {/* Connection Status */}
      <div className="profile-row">
        <span className="row-label">Status</span>
        <span
          className={`row-value ${
            connectionStatus === "connected" ? "" : "warning"
          }`}
        >
          {connectionStatus === "connected" ? "Connected" : "Disconnected"}
        </span>
      </div>

      {/* Wallet Type (when connected) */}
      {connectionStatus === "connected" && walletType && (
        <div className="profile-row">
          <span className="row-label">Wallet Type</span>
          <span className="row-value">{getWalletTypeName()}</span>
        </div>
      )}

      {/* Wallet Address (when connected) */}
      {connectionStatus === "connected" && walletAddress && (
        <div className="profile-row">
          <span className="row-label">Address</span>
          <span className="row-value">{truncateAddress(walletAddress)}</span>
        </div>
      )}

      {/* Wallet Balance (when connected and available) */}
      {connectionStatus === "connected" && walletBalance !== null && (
        <div className="profile-row">
          <span className="row-label">Balance</span>
          <span className="row-value">
            {formatBalance(walletBalance)} {walletType === "ton" ? "TON" : "ETH"}
          </span>
        </div>
      )}

      {/* Error Message */}
      {connectionStatus === "error" && error && (
        <div className="profile-row">
          <span className="row-value warning" style={{ fontSize: "12px" }}>
            {error}
          </span>
        </div>
      )}

      {/* Loading State */}
      {connectionStatus === "connecting" && (
        <div className="profile-row">
          <span className="row-value" style={{ fontSize: "12px" }}>
            Connecting...
          </span>
        </div>
      )}

      {/* Action Buttons */}
      {connectionStatus === "disconnected" && (
        <>
          <button className="profile-action" onClick={connectTON}>
            Connect Telegram Wallet
          </button>
          <button
            className="profile-action secondary"
            onClick={connectMetaMask}
            style={{ marginTop: "8px" }}
          >
            Connect MetaMask
          </button>
        </>
      )}

      {connectionStatus === "error" && (
        <>
          <button className="profile-action" onClick={connectTON}>
            Connect Telegram Wallet
          </button>
          <button
            className="profile-action secondary"
            onClick={connectMetaMask}
            style={{ marginTop: "8px" }}
          >
            Connect MetaMask
          </button>
        </>
      )}

      {connectionStatus === "connecting" && (
        <button
          className="profile-action secondary"
          disabled
          style={{ opacity: 0.5, cursor: "not-allowed" }}
        >
          Connecting...
        </button>
      )}

      {connectionStatus === "connected" && (
        <button className="profile-action secondary" onClick={disconnect}>
          Disconnect
        </button>
      )}
    </div>
  );
}
