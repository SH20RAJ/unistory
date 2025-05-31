import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "openid email profile",
                    hd: "*.edu" // This restricts to .edu domains only
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Validate that the user has a .edu email address
            if (account?.provider === "google") {
                const email = user.email || profile?.email
                // if (!email?.endsWith('.edu')) {
                //     console.log(`Sign-in rejected: ${email} is not a .edu email`)
                //     return false
                // }
            }
            return true
        },
        async jwt({ token, user, account, profile }) {
            // Persist the OAuth access_token and/or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.provider = account.provider
            }
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.image = user.image
            }
            return token
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken
            session.user.id = token.id
            session.user.email = token.email
            session.user.name = token.name
            session.user.image = token.image
            session.provider = token.provider
            return session
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    pages: {
        signIn: '/auth/signin',
        signUp: '/auth/signup',
        error: '/auth/error',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
})


