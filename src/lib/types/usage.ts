export interface UsageInfo {
  plan: "FREE" | "PRO";
  usageLimits: {
    maxPermanentShortcuts: number;
    maxExpirableShortcuts: number;
    canCreatePasswordProtectedShortcuts: boolean;
  };
  currentUsage: {
    currentPermanentShortcuts: number;
    currentExpirableShortcuts: number;
  };
}
