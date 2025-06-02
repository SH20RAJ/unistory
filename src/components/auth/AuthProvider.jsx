"use client"

import { SessionProvider } from "next-auth/react"
import { SWRProvider } from "@/contexts/SWRProvider"
import { AuthProvider as CustomAuthProvider } from "@/contexts/AuthContext"

export function AuthProvider({ children }) {
    return (
        <SessionProvider>
            <SWRProvider>
                <CustomAuthProvider>
                    {children}
                </CustomAuthProvider>
            </SWRProvider>
        </SessionProvider>
    )
}
