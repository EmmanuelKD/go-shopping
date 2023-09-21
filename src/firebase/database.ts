"use client"
import { Analytics, getAnalytics, logEvent } from 'firebase/analytics';
import { FirebaseApp } from 'firebase/app';
import {
    CollectionReference,
    DocumentData,
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    QueryFieldFilterConstraint,
    QuerySnapshot,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    onSnapshot,
    query,
    setDoc
} from 'firebase/firestore';
// import uidV4 from ""

export class F_DB {
    protected db?: Firestore;
    protected analytics?: Analytics;
    protected collectionId: string;
    static _isEmulatorEnabled = false;

    constructor(app: FirebaseApp, collectiond?: string) {
        this.db = getFirestore(app);
        this.analytics = getAnalytics(app);
        this.collectionId = collectiond as string;

        // if (IS_APP_LOCAL && !PrintDB._isEmulatorEnabled) {
        //     connectFirestoreEmulator(this.db, 'localhost', 8080);
        //     PrintDB._isEmulatorEnabled = true;
        // }
    }

    /**
     *
     * @param onComplete
     * @param collectionRef
     * @param docRef
     * @returns
     */
    protected onDocVlaueChange(
        onComplete: (data: DocumentSnapshot<DocumentData>) => void,
        docRef: string
    ) {
        if (this?.db) {
            const unsub = onSnapshot(doc(this.db, this.collectionId, docRef), (doc) => {
                onComplete(doc);
            });
            return unsub();
        } else {
            throw 'auth not initialized';
        }
    }

    protected getCollectionRef( ): CollectionReference<DocumentData> | null {
        try {
            if (this.db) return collection(this.db,this.collectionId);
            return null;
        } catch (e) {
            console.log('unknown error = ' + JSON.stringify(e));
            return null;
        }
    }

 
    protected async getDocument({
        documentId
    }: {
        documentId: string;
    }): Promise<DocumentReference<DocumentData> | null> {
        try {
            if (this.db) {
                return doc(collection(this.db, this.collectionId), documentId);
            }
            return null;
        } catch (e) {
            console.log('unknown error = ' + JSON.stringify(e));
            return null;
        }
    }

    protected async getDocumentDataByCondition({
        conditions
    }: {
         conditions: QueryFieldFilterConstraint[];
    }): Promise<QuerySnapshot<DocumentData> | null> {
        try {
             if (this.db) {
                 var db = this.db;
                var q = query(collection(db, this.collectionId), ...conditions);
                return await getDocs(q);
            }
              return null;
        } catch (e) {
            console.log('unknown error = ' + JSON.stringify(e));
            return null;
        }
    }

    protected async getDocumentDataById({
        docId
    }: {
        docId: string;
    }): Promise<DocumentSnapshot<DocumentData> | null> {
        try {
            if (this.db) {
                var docRef = (await this.getDocument({
                    documentId: docId
                })) as DocumentReference<DocumentData>;
                return await getDoc(docRef);
            }
            return null;
        } catch (e) {
            console.log('unknown error = ' + JSON.stringify(e));
            return null;
        }
    }

    /**
     *
     * @param param0
     * @return Promise<string> id or null of the document added
     */

    protected async addToDocumentCollection({ docId, data }: { data: DocumentData; docId?: string }): Promise<string | null> {
              if (this.db) {
            if (docId) {
                await setDoc(doc(collection(this?.db, this.collectionId), docId), data);
                return docId;
            } else {
                return (await addDoc(collection(this?.db, this.collectionId), data)).id;
            }
        }
        return null;
    }

    /**
     *
     * @param param0
     * @return Promise<boolean> if the update was successful or not
     */
    protected async updateDocument({ documentId, data }: { documentId: string; data: DocumentData }): Promise<boolean> {
        try {
            var doc = (await this.getDocument({
                documentId
            })) as DocumentReference<DocumentData>;

            return await setDoc(doc, data, {
                merge: true
            })
                .then((res) => {
                    return true;
                })
                .catch(() => {
                    return false;
                });
        } catch (e) {
            logEvent(this.analytics as Analytics, 'Failing to update document, get error message: ' + JSON.stringify(e));
        }
        return false;
    }

    /**
     *
     * @param param0
     * @return Promise<boolean> if the delete was successful or not
     */
    protected async deleteDocument({ documentId }: { documentId: string }): Promise<boolean> {
        try {
            var doc = (await this.getDocument({
                documentId
            })) as DocumentReference<DocumentData>;

            return await deleteDoc(doc)
                .then((res) => {
                    return true;
                })
                .catch(() => {
                    logEvent(this.analytics as Analytics, 'Failing to delete document');
                    return false;
                });
        } catch (e) {
            console.log('unknown error = ' + JSON.stringify(e));
            return false;
        }
    }
}
