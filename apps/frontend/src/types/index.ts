
import type { Token } from '@packages/contracts/index';
export type Session = Token

export type AuthContextType = {
  session: Session | null;
  login: (email: string, password: string, clientId: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};