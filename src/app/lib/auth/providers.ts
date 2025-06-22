import { authConfig } from './config';

export const providers = {
  google: {
    id: 'google',
    name: 'Google',
    type: 'oauth',
    authorization: {
      url: 'https://accounts.google.com/o/oauth2/v2/auth',
      params: {
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code',
        scope: 'openid email profile',
      },
    },
    token: 'https://oauth2.googleapis.com/token',
    userinfo: 'https://openidconnect.googleapis.com/v1/userinfo',
    clientId: authConfig.providers.google.clientId,
    clientSecret: authConfig.providers.google.clientSecret,
    profile(profile: any) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
  },
  github: {
    id: 'github',
    name: 'GitHub',
    type: 'oauth',
    authorization: {
      url: 'https://github.com/login/oauth/authorize',
      params: { scope: 'read:user user:email' },
    },
    token: 'https://github.com/login/oauth/access_token',
    userinfo: {
      url: 'https://api.github.com/user',
      async request({ tokens, provider }: any) {
        const profile = await fetch(provider.userinfo.url, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            'User-Agent': 'nextjs-auth',
          },
        }).then((res) => res.json());

        const emails = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            'User-Agent': 'nextjs-auth',
          },
        }).then((res) => res.json());

        const primaryEmail = emails.find((email: any) => email.primary)?.email;

        return {
          ...profile,
          email: primaryEmail || profile.email,
        };
      },
    },
    clientId: authConfig.providers.github.clientId,
    clientSecret: authConfig.providers.github.clientSecret,
    profile(profile: any) {
      return {
        id: profile.id.toString(),
        name: profile.name || profile.login,
        email: profile.email,
        image: profile.avatar_url,
      };
    },
  },
};

export type ProviderType = keyof typeof providers;