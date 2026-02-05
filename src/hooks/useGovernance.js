import { useContext } from 'react'
import { GovernanceContext } from '../context/GovernanceContext'

export default function useGovernance() {
const ctx = useContext(GovernanceContext)

if (!ctx) {
throw new Error('useGovernance must be used inside GovernanceSimulationProvider')
}

const getTimeRemaining = (deadline) => {
const diff = deadline - Date.now()
if (diff <= 0) return 'Closed'

const hrs = Math.floor(diff / (1000 * 60 * 60))
return `${hrs}h remaining`
}

const getRiskColor = (risk) => {
if (risk === 'low') return '#10b981'
if (risk === 'medium') return '#f59e0b'
return '#ef4444'
}

return {
...ctx,
getTimeRemaining,
getRiskColor,
}
}