import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
// import { firebaseAdapter } from "../../../authAdapters/firebaseAdapter";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import {
  db,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  runTransaction
} from '../../../firebase.config';


export default NextAuth({

  adapter: FirebaseAdapter({
    db,
    collection,
    query,
    getDocs,
    where,
    limit,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    runTransaction
  }),
  providers: [
    // Sign in With Email
    EmailProvider({
      server: {
        host: process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST,
        port: process.env.NEXT_PUBLIC_EMAIL_SERVER_PORT,
        auth: {
          user: process.env.NEXT_PUBLIC_EMAIL_SERVER_USER,
          pass: process.env.NEXT_PUBLIC_EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.NEXT_PUBLIC_EMAIL_FROM
    })
  ],
  secret: []

});