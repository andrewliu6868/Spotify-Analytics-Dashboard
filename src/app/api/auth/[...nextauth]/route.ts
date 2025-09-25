import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: "true",
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
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_SECRET_ID,
        }),
    ],

    callbacks: {
        async jwt({ token }){
            return token;
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

