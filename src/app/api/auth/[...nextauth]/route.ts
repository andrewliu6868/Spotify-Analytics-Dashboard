'use server'
import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth/next";
import { type NextAuthOptions } from "next-auth";
import SpotifyProvider from 'next-auth/providers/spotify';



const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    NEXTAUTH_SECRET,
  } = process.env;
  
  // Defensive checks: fail early if missing (helps catch typos/misloading)
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !NEXTAUTH_SECRET) {
    throw new Error(
      "Missing required env vars: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, NEXTAUTH_SECRET"
    );
  }

const options: NextAuthOptions = {
    debug: true,
    providers : [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID || "",
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({ token, account }){
            if(account){
                token.access_token = account.access_token;
            }

            return token;
        },

        async session({ session, token }){
            return {
                ...session,
                token
            }
        }
    },
    secret: process.env.REACT_APP_NEXTAUTH_SECRET,
}

const handler = NextAuth(options);

export { handler as POST, handler as GET};