import NextAuth from "next-auth";
// import EmailProvider from "next-auth/providers/email";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GitHubProvider from "next-auth/providers/github";
// import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Auth0Provider from "next-auth/providers/auth0";
import LinkedInProvider from "next-auth/providers/linkedin";
// import clientPromise from "../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../lib/connectDB";
import bcrypt from 'bcrypt';
import Users from '../../models/userModel';


connectDB();

export default NextAuth({

  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    // Sign in With Email
    // EmailProvider({
    //   server: {
    //     host: process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST,
    //     port: process.env.NEXT_PUBLIC_EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.NEXT_PUBLIC_EMAIL_SERVER_USER,
    //       pass: process.env.NEXT_PUBLIC_EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.NEXT_PUBLIC_EMAIL_FROM
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await Users.findOne({ email });
        if (!user) throw new Error("User not registered");
        if (user) return signInUser({ password, user });
      }
    }),

    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET
    }),
    // TwitterProvider({
    //   clientId: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID,
    //   clientSecret: process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET
    }),
    LinkedInProvider({
      clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET
    }),
    Auth0Provider({
      clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
      issuer: process.env.NEXT_PUBLIC_AUTH0_ISSUER
    })
  ],
  pages: {
    signIn: '/login/Login-custom'
  },
  secret: "secret",
  database: process.env.NEXT_PUBLIC_MONGODB_URI

});

const signInUser = async ({ password, user }) => {
  if (!user.password) throw new Error("Pls enter the password.");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Password or Username is incorrect.");
  return user;
};