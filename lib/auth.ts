import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Check against environment variables
                if (
                    credentials?.username === process.env.ADMIN_USERNAME &&
                    credentials?.password === process.env.ADMIN_PASSWORD
                ) {
                    return { id: "1", name: "Admin", email: "tanvir.cse05@gmail.com" };
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 Days
    },
    pages: {
        signIn: "/login", // Custom login page route
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = "admin";
            return token;
        },
        async session({ session, token }) {
            if (session?.user) (session.user as any).role = token.role;
            return session;
        }
    }
};