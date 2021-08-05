import { AuthProvider } from './AuthProvider';
import { GithubAuthProvider } from './providers/github';

const redirectURI = (provider: string) => `http://localhost:5000/auth/${provider}/callback`;

export const AuthProviders: AuthProvider[] = [new GithubAuthProvider()];

for (const provider of AuthProviders) {
  provider.setRedirectUri(redirectURI(provider.name));
}
