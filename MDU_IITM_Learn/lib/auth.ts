import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import type { Adapter } from "next-auth/adapters";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";

export const authOptions: NextAuthOptions = {
    // Explicitly specify the database name to ensure auth data goes to the correct DB
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: "MDU_ITM_LEARN",
    }) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            id: "admin-login",
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                await dbConnect();

                const admin = await Admin.findOne({ email: credentials.email.toLowerCase() });

                if (!admin) {
                    throw new Error("Invalid email or password");
                }

                const isPasswordValid = await admin.comparePassword(credentials.password);

                if (!isPasswordValid) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: admin._id.toString(),
                    email: admin.email,
                    name: admin.name,
                    role: admin.role,
                    isAdmin: true,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            // Persist the OAuth access_token and user id to the token right after signin
            if (account && user) {
                token.accessToken = account.access_token;
                token.id = user.id;
                // Check if this is an admin login
                if (account.provider === "admin-login") {
                    token.isAdmin = true;
                    token.role = (user as any).role;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.id) {
                session.user.id = token.id as string;
                // Add admin info to session
                if (token.isAdmin) {
                    (session.user as any).isAdmin = true;
                    (session.user as any).role = token.role;
                }
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    debug: process.env.NODE_ENV === "development",
};
