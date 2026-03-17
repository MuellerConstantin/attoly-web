export interface Shortcut {
  id: string;
  tag: string;
  url: string;
  createdAt: string;
  anonymous: boolean;
  permanent: boolean;
  passwordProtected: boolean;
}

export interface ShortcutDetails {
  id: string;
  tag: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  permanent: boolean;
  expiresAt: string | null;
  passwordProtected: boolean;
}
