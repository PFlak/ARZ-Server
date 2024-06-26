import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import firebase from "firebase-admin";
import { InvalidTokenError } from "../errors/errors.error";
import { DecodedToken } from "../../models/user.model";

export class FirebaseHelper {
    public static converterAssignTypes<T extends {}>() {
        return {
            toFirestore(doc: T): FirebaseFirestore.DocumentData {
                return doc;
            },
            fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): T {
                return snapshot.data()! as T;
            }
        };
    };

    public static async getServerTimeStamp() {
        return await firebase.firestore.FieldValue.serverTimestamp();
    }

    public static async verifyToken(token: string): Promise<DecodedIdToken | DecodedToken> {
        try {
            const decodedValue = await firebase.app().auth().verifyIdToken(token);

            return decodedValue;
        } catch (error) {
            console.log(error)
            throw new InvalidTokenError();
        }
    }
}
