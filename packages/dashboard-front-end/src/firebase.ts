import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "@firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { config } from "./config";

const firebaseApp = initializeApp(config.firebase);
const firebaseAuth = getAuth(firebaseApp);
const firebaseMessaging = getMessaging(firebaseApp);
const getMessagingToken = () =>
  getToken(firebaseMessaging, {
    vapidKey: config.firebase.vapidKey,
  });

if (config.nodeEnv === "development" && config.enableAuthEmulator === "true") {
  connectAuthEmulator(firebaseAuth, "http://localhost:9099");
}

export { firebaseApp, firebaseAuth, firebaseMessaging, getMessagingToken };
