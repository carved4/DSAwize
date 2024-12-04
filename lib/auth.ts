import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prismadb } from "./prismadb"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import NextAuth, { AuthOptions } from "next-auth"

const prisma = prismadb

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      session.user.points = user.points || 0
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error'
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
