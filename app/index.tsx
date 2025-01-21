import { Redirect } from 'expo-router';

import { useStore } from '~/store';

export default function Index() {
  const onboardingCompleted = useStore((data) => data.onboardingCompleted);

  if (!onboardingCompleted) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
