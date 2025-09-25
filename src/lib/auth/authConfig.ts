import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

async function refresh(token: any) {
    try {
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: token.refreshToken!,
          client_id: process.env.SPOTIFY_CLIENT_ID || "",
          client_secret: process.env.SPOTIFY_CLIENT_SECRET || "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw data;
  
      return {
        ...token,
        accessToken: data.access_token,
        accessTokenExpires: Date.now() + data.expires_in * 1000, // ms
        refreshToken: data.refresh_token ?? token.refreshToken,
        error: undefined,
      };
    } catch {
      return { ...token, error: "RefreshAccessTokenError" as const };
    }
  }
  
export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 10*24*60*60, // 10 days for now
    },
    pages: {
        signIn: "/auth/sign-in",
    },
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID || "",
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }){
            // on first sign in
            if (account && user){
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires: account.expires_at! * 1000,
                    userId: account.providerAccountId, // the Spotify user id
                };
            }
            
            // use accessToken if it's not needed
            if (Date.now() < (token.accessTokenExpires as number)){
                return token;
            }

            // if refresh token needed
            return await refresh(token)
        },
        async session({ session, token }){
            console.log("session callback", { session, token });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string,
                }
            }
        }
    }

});

