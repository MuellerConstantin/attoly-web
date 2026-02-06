export interface Me {
  id: string;
  email: string;
  customerId: string | null;
  createdAt: string;
  identityProvider: "LOCAL" | "GITHUB";
  plan: "FREE" | "PRO";
}
