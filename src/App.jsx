import React, { useState } from "react";

import Feed from "./screens/Feed";
import Holdings from "./screens/Holdings";
import Create from "./screens/Create";
import Loans from "./screens/Loans";
import Profile from "./screens/Profile";

import BottomNav from "./components/BottomNav";
import TradePanel from "./components/TradePanel";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { WalletProvider } from "./context/WalletContext";
import { TradeProvider } from "./context/TradeContext";

export default function App() {
  const [activeTab, setActiveTab] = useState("feed");

  const renderScreen = () => {
    switch (activeTab) {
      case "feed":
        return <Feed />;
      case "holdings":
        return <Holdings />;
      case "create":
        return <Create />;
      case "loans":
        return <Loans />;
      case "profile":
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <TonConnectUIProvider
      manifestUrl="/tonconnect-manifest.json"
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/CreditChainBot'
      }}
    >
      <WalletProvider>
        <TradeProvider>
          <div className="app-root">
            {renderScreen()}

            {/* Global trade slide-up panel */}
            <TradePanel />

            {/* Bottom navigation */}
            <BottomNav
              active={activeTab}
              onChange={setActiveTab}
            />
          </div>
        </TradeProvider>
      </WalletProvider>
    </TonConnectUIProvider>
  );
}