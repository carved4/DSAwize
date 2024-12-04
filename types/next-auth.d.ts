import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string
      email?: string
      image?: string
      points?: number
    }
  }

  interface User {
    id: string
    points?: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    points?: number
  }
}
