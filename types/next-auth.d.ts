import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      // Add other custom fields here
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    // Add other custom fields here
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    points?: number
  }
}
