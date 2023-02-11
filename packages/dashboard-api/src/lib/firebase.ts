import firebaseAdmin from "firebase-admin";
import { Auth } from "firebase-admin/lib/auth/auth";
import { UpdateRequest } from "firebase-admin/lib/auth/auth-config";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { UserMetadata, UserRecord } from "firebase-admin/lib/auth/user-record";
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

// add companyId to metadata of user record
export async function createUser({
  email,
  emailVerified = false,
}: CreateUser): Promise<UserRecord> {
  try {
    return await getAuthService().createUser({
      email,
      emailVerified,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Firebase new user creation: ${error.message}`);
      throw new Error(error.message);
    }
    throw new Error("Firebase new user creation was not successful");
  }
}

export async function getUser(email: string): Promise<UserRecord | null> {
  try {
    return await getAuthService().getUserByEmail(email);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(
        `Firebase getting user with email ${email} error: ${error.message}`
      );
      return null;
    }
    throw new Error("Firebase user getting was not successful");
  }
}

export async function updateUser(
  email: string,
  props: UpdateRequest
): Promise<UserRecord> {
  try {
    const { uid } = await getAuthService().getUserByEmail(email);
    return await getAuthService().updateUser(uid, props);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Firebase user update: ${error.message}`);
      throw new Error(error.message);
    }
    throw new Error("Firebase user update was not successful");
  }
}

export async function deleteUser(email: string): Promise<void> {
  try {
    const { uid } = await getAuthService().getUserByEmail(email);
    return await getAuthService().deleteUser(uid);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Firebase user delete: ${error.message}`);
      throw new Error(error.message);
    }
    throw new Error("Firebase user detele was not successful");
  }
}

export type CreateUser = {
  email: string;
  emailVerified?: boolean;
};

export type FirebaseUserType = UserRecord;
export type FirebaseUserMetadataType = UserMetadata;
