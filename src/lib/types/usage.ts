export interface UsageInfo {
  plan: "FREE" | "PRO";
  usageLimits: {
    maxPermanentShortcuts: number;
    maxExpirableShortcuts: number;
  };
  currentUsage: {
    currentPermanentShortcuts: number;
    currentExpirableShortcuts: number;
  };
}
