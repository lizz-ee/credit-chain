import OnboardingScreen from './OnboardingScreen'
import InviteGateScreen from './InviteGateScreen'

export default function OnboardingRouter({
  inviteCode,
  step,
  setStep,
}) {
  if (step === 1) {
    return <OnboardingScreen onContinue={() => setStep(2)} />
  }

  if (step === 2) {
    return (
      <InviteGateScreen
        inviteCode={inviteCode}
        onContinue={() => setStep(3)}
      />
    )
  }

  return null
}