export interface Me {
  id: string;
  email: string;
  createdAt: string;
  identityProvider: "LOCAL" | "GITHUB";
  plan: "FREE" | "PRO";
  billing: {
    customerId: string | null;
    subscriptionId: string | null;
    status: "ACTIVE" | "PAST_DUE" | "CANCELED" | null;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
  };
}
