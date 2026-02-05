import { useState } from "react";

export type Tab = "feed" | "search" | "holdings" | "profile";

export function useTab(defaultTab: Tab = "feed") {
  const [tab, setTab] = useState<Tab>(defaultTab);
  return { tab, setTab };
}
