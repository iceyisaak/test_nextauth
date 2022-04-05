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
} from '../firebase.config';

export const firebaseAdapter = () => {
  return (
    FirebaseAdapter({
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
    })
  );
};
