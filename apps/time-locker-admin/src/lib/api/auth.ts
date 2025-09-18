import { signInWithEmailAndPassword } from "firebase/auth";
import type { UserCredential } from "firebase/auth";
import { auth } from "@/lib/auth/firebaseConfig";

export async function login(
  email: string,
  password: string
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}
