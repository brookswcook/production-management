import firebaseAdmin from "firebase-admin";
import { Auth } from "firebase-admin/lib/auth/auth";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import config from "../config";
import logger from "./logger";

let firebaseAdminApp: firebaseAdmin.app.App;
function getFirebaseApp() {
  if (firebaseAdminApp == null) {
    const adminAppCredential = firebaseAdmin.credential.cert(
      config.auth.firebase.serviceAccount
    );
    firebaseAdminApp = firebaseAdmin.initializeApp({
      credential: adminAppCredential,
    });
  }
  return firebaseAdminApp;
}

let firebaseAuthService: Auth;
function getAuthService() {
  if (firebaseAuthService == null) {
    firebaseAuthService = firebaseAdmin.auth(getFirebaseApp());
  }
  return firebaseAuthService;
}

export async function verifyToken(token: string): Promise<DecodedIdToken> {
  try {
    const result = await getAuthService().verifyIdToken(token);
    if (result.aud !== config.auth.firebase.serviceAccount.projectId)
      throw new Error("Auth aud doesn't match project id");
    return result;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Firebase token verification: ${error.message}`);
      throw new Error(error.message);
    }
    throw new Error("Firebase token verification was not successful");
  }
}

export async function createUser({
  email,
  emailVerified = false,
}: CreateUser): Promise<UserRecord> {
  try {
    const result = await getAuthService().createUser({ email, emailVerified });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Firebase new user creation: ${error.message}`);
      throw new Error(error.message);
    }
    throw new Error("Firebase new user creation was not successful");
  }
}

export type CreateUser = {
  email: string;
  emailVerified?: boolean;
};
