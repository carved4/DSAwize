"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSignIn = async (provider: 'google' | 'github') => {
    setIsLoading(true)
    try {
      const result = await signIn(provider, { 
        redirectTo: '/' 
      })

      if (result?.error) {
        toast({
          title: "Authentication Error",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Sign In Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to AlgoMaster
          </h2>
        </div>
        <div className="space-y-4">
          <Button 
            onClick={() => handleSignIn('google')}
            className="w-full"
            variant="outline"
            disabled={isLoading}
          >
            <LogIn className="mr-2 h-5 w-5" /> 
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
          </Button>
          <Button 
            onClick={() => handleSignIn('github')}
            className="w-full"
            variant="outline"
            disabled={isLoading}
          >
            <LogIn className="mr-2 h-5 w-5" /> 
            {isLoading ? 'Signing in...' : 'Sign in with GitHub'}
          </Button>
        </div>
      </div>
    </div>
  )
}
