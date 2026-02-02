export interface Me {
  id: string;
  email: string;
  createdAt: string;
  identityProvider: "LOCAL" | "GITHUB";
}
