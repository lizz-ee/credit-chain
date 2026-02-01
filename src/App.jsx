import { useEffect, useMemo, useState } from 'react'
import { GovernanceSimulationProvider } from './context/GovernanceSimulationContext'
import { getTelegramContext } from './lib/telegram'
import { readJson, writeJson } from './utils/storage'

// Existing locked screens
import OnboardingScreen from './screens/OnboardingScreen'
import UsernameClaimScreen from './screens/UsernameClaimScreen'
import InviteGatingScreen from './screens/InviteGatingScreen'
import GovernanceSimulationScreen from './screens/GovernanceSimulationScreen'
import ProposalDetailSimScreen from './screens/ProposalDetailSimScreen'
import OffWorldContractScreen from './screens/OffWorldContractScreen'

// Memecoin UX screens
import HomeScreen from './screens/HomeScreen'
import ChartScreen from './screens/ChartScreen'
import HoldingsScreen from './screens/HoldingsScreen'
import CreateScreen from './screens/CreateScreen'
import './styles/holdings.css'
import './styles/create.css'
import './styles/loans.css'
import './styles/profile.css'
import './styles/onboarding.css'

// Components
import AppLauncher from './components/AppLauncher'
import BottomNav from './components/BottomNav'

/**
 * Minimal local token registry for UI wiring.
 * Later this becomes protocol/indexer-driven.
 */
const TOKENS = [
  {
    id: 'coin1',
    name: 'MEME1',
    marketCap: 1200000,
    videoUrl: '/mock/video1.mp4',
    mastercontrolBuy: true,
    takeProfits: [
      { id: 'tp1', marketCap: 2500000, position: 55 },
      { id: 'tp2', marketCap: 5000000, position: 35 },
    ],
  },
  {
    id: 'coin2',
    name: 'MEME2',
    marketCap: 480000,
    videoUrl: '/mock/video2.mp4',
    mastercontrolBuy: false,
    takeProfits: [],
  },
]

function App() {
  // Locked onboarding + governance flow state
  const [currentScreen, setCurrentScreen] = useState(null)
  const [username, setUsername] = useState(null)
  const [selectedProposal, setSelectedProposal] = useState(null)

  // Telegram-derived init (locked)
  const [inviteCode, setInviteCode] = useState(null)
  const [firstTime, setFirstTime] = useState(false)
  const [initialScreen, setInitialScreen] = useState(null)

  // Bottom nav tab state (memecoin shell)
  const [activeTab, setActiveTab] = useState('feed')

  // Sticky token context
  const [activeTokenId, setActiveTokenId] = useState(() => {
    return localStorage.getItem('cc_active_token') ?? null
  })

  // Favorites + holdings (persist forever)
  const [favorites, setFavorites] = useState(() => readJson('cc_favorites', []))
  const [holdings, setHoldings] = useState(() => readJson('cc_holdings', {}))

  // New memes toast count (simulated for now)
  const [newMemesCount, setNewMemesCount] = useState(0)

  const activeToken = useMemo(() => {
    return TOKENS.find(t => t.id === activeTokenId) ?? TOKENS[0] ?? null
  }, [activeTokenId])

  // Read Telegram init ONCE
  useEffect(() => {
    const ctx = getTelegramContext()

    // If not Telegram, keep dev usable but still invite-gated by design.
    if (!ctx || ctx.blocked) {
      setCurrentScreen('invite_gating')
      return
    }

    setInviteCode(ctx.startParam || null)
    setFirstTime(!!ctx.firstTime)
    setInitialScreen(ctx.screen || null)
  }, [])

  // Decide initial screen ONCE
  useEffect(() => {
    if (currentScreen !== null) return

    if (initialScreen === 'offworld_contract') {
      setCurrentScreen('offworld_contract')
      return
    }

    if (inviteCode) {
      setCurrentScreen('invite_gating')
      return
    }

    if (firstTime) {
      setCurrentScreen('onboarding')
      return
    }

    setCurrentScreen('home') // main memecoin shell entry
  }, [inviteCode, firstTime, initialScreen, currentScreen])

  // Persist sticky token id
  useEffect(() => {
    if (activeTokenId) localStorage.setItem('cc_active_token', activeTokenId)
  }, [activeTokenId])

  // Persist favorites + holdings
  useEffect(() => writeJson('cc_favorites', favorites), [favorites])
  useEffect(() => writeJson('cc_holdings', holdings), [holdings])

  // Minimal navigation helpers (locked governance flow)
  const handleNavigate = (screen, data) => {
    if (screen === 'proposal_sim') setSelectedProposal(data)
    setCurrentScreen(screen)
  }
  const handleRequireUsername = () => setCurrentScreen('username_claim')

  // Favorites toggle
  const toggleFavorite = (tokenId) => {
    setFavorites((prev) => {
      const has = prev.includes(tokenId)
      return has ? prev.filter((x) => x !== tokenId) : [...prev, tokenId]
    })
  }

  // Open chart for a specific token (sticky)
  const openChart = (tokenId) => {
    setActiveTokenId(tokenId)
    setCurrentScreen('chart')
  }

  // Close chart (return to feed same token)
  const closeChart = () => {
    setCurrentScreen('home')
    setActiveTab('feed')
  }

  // App launcher (Credit-Chain always routes to feed)
  const handleLauncherSelect = (appId) => {
    if (appId === 'credit-chain') {
      setCurrentScreen('home')
      setActiveTab('feed')
    }
  }

  if (!currentScreen) return null

  const launcherApps = [
    { id: 'credit-chain', name: 'Credit-Chain' },
    // future apps under rails go here
  ]

  const renderMemecoinShell = () => {
    return (
      <>
        {activeTab === 'feed' && (
          <HomeScreen
            tokens={TOKENS}
            activeTokenId={activeTokenId}
            setActiveTokenId={setActiveTokenId}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenChart={openChart}
            launcher={<AppLauncher apps={launcherApps} onSelect={handleLauncherSelect} />}
            newMemesCount={newMemesCount}
            onClearNewMemes={() => setNewMemesCount(0)}
          />
        )}

        {activeTab === 'holdings' && (
          <HoldingsScreen
            favorites={favorites}
            holdings={holdings}
            tokens={TOKENS}
            onOpenToken={(tokenId) => {
              setActiveTokenId(tokenId)
              setActiveTab('feed')
            }}
          />
        )}

        {activeTab === 'create' && (
          <div className="screen">
            <h1>Create</h1>
            <p className="muted">
              Launch is free. Rate-limited to 1 launch per 5 minutes.
            </p>
          </div>
        )}

        {activeTab === 'loans' && (
          <div className="screen">
            <h1>Loans</h1>
            <p className="muted">
              USDC is used here only.
            </p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="screen">
            <h1>Profile</h1>
            <p className="muted">
              Username-gated identity.
            </p>
          </div>
        )}

        <BottomNav active={activeTab} onChange={setActiveTab} />
      </>
    )
  }

  const screens = {
    onboarding: (
      <OnboardingScreen onComplete={() => setCurrentScreen('username_claim')} />
    ),

    username_claim: (
      <UsernameClaimScreen
        onClaim={(name) => {
          setUsername(name)
          setCurrentScreen('home')
        }}
      />
    ),

    invite_gating: (
      <InviteGatingScreen
        inviteCode={inviteCode}
        onContinue={() => {
          localStorage.setItem('cc_returning', '1')
          setCurrentScreen('onboarding')
        }}
      />
    ),

    home: renderMemecoinShell(),

    chart: (
      <ChartScreen
        coin={activeToken}
        isFavorited={!!activeTokenId && favorites.includes(activeTokenId)}
        onToggleFavorite={() => activeTokenId && toggleFavorite(activeTokenId)}
        onBack={closeChart}
        onSwipeBack={closeChart} // gesture hook (implemented in ChartScreen)
      />
    ),

    governance_sim: (
      <GovernanceSimulationScreen
        username={username}
        onNavigate={handleNavigate}
        onRequireUsername={handleRequireUsername}
      />
    ),

    proposal_sim: (
      <ProposalDetailSimScreen
        proposalId={selectedProposal}
        username={username}
        onBack={() => setCurrentScreen('governance_sim')}
        onRequireUsername={handleRequireUsername}
      />
    ),

    offworld_contract: (
      <OffWorldContractScreen onBack={() => setCurrentScreen('governance_sim')} />
    ),
  }

  return (
    <GovernanceSimulationProvider>
      {screens[currentScreen]}
    </GovernanceSimulationProvider>
  )
}

export default App