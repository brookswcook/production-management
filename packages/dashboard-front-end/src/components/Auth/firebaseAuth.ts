import { getAuth, connectAuthEmulator } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { config } from "../../config";

const app = initializeApp(config.firebase);
const auth = getAuth(app);

if (config.nodeEnv === "development" && config.enableAuthEmulator === "true") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { auth };
