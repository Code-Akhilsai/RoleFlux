import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync(new URL("../serviceAccountKey.json", import.meta.url)),
);

const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
});

const adminAuth = getAuth(firebaseApp);

export default adminAuth;
