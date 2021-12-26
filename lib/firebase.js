import firebase from 'firebase/compat/app'
import { getApps } from 'firebase/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
   apiKey: "AIzaSyAHEoyHJcyL6XGS_dQ3rqFMRKVKJsvGoLA",
   authDomain: "nextfire-b87b1.firebaseapp.com",
   projectId: "nextfire-b87b1",
   storageBucket: "nextfire-b87b1.appspot.com",
   messagingSenderId: "824359635940",
   appId: "1:824359635940:web:f002e64ae750d756fd95f1",
   measurementId: "G-BNQ8J8NCZ3"
};

// Initialize Firebase
if (getApps().length < 1) {
   const app = firebase.initializeApp(firebaseConfig);
   // getAnalytics(app)
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const increment = firebase.firestore.FieldValue.increment

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */

export async function getUserWithUsername(username) {
   const usersRef = firestore.collection('users')
   const query = usersRef.where('username', '==', username).limit(1)
   const userDoc = (await query.get()).docs[0]
   return userDoc
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */

export function postToJSON(doc) {
   const postData = doc.data()
   return {
      ...postData,
      createdAt: postData?.createdAt.toMillis() || 0,
      updatedAt: postData?.updatedAt.toMillis() || 0,
   }
}