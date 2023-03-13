import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "@firebase/auth";
import {
  deleteToken,
  getMessaging,
  getToken,
  isSupported,
} from "firebase/messaging";
import { config } from "./config";

const firebaseApp = initializeApp(config.firebase);
const firebaseAuth = getAuth(firebaseApp);
const firebaseMessaging = () => getMessaging(firebaseApp);
const getMessagingToken = async () => {
  const serviceWorkerRegistration = await navigator.serviceWorker.ready;
  return getToken(firebaseMessaging(), {
    serviceWorkerRegistration,
    vapidKey: config.firebase.vapidKey,
  });
};
const deleteMessagingToken = () => {
  void deleteToken(firebaseMessaging());
};
const isMessagingSupported = isSupported;

if (config.nodeEnv === "development" && config.enableAuthEmulator === "true") {
  connectAuthEmulator(firebaseAuth, "http://localhost:9099");
}

export {
  firebaseApp,
  firebaseAuth,
  firebaseMessaging,
  getMessagingToken,
  deleteMessagingToken,
  isMessagingSupported,
};
