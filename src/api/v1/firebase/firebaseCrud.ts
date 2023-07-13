import {
  collection,
  addDoc,
  WithFieldValue,
  DocumentData,
  query,
  where,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../db/firebase";


export class firebaseCrud<T> {
  collectionName: string;
  collection;
  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.collection = collection(db, this.collectionName);
  }

  async add(data: T) {
    try {
      const docRef: WithFieldValue<DocumentData> =
        data as WithFieldValue<DocumentData>;
      await addDoc(collection(db, this.collectionName), docRef);
    } catch (e) {
      console.log(e);
    }
  }
  async addOrUpdate(id: string, data: T) {
    try {
      const res = setDoc(
        doc(this.collection, id),
        data as WithFieldValue<DocumentData>
      );
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(id: string) {
    try {
      const q = query(this.collection, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0];
    } catch (error) {
      console.log(error);
    }
  }

  async removeRepository(id: string | number) {
    const q = query(collection(db, this.collectionName), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const deletePromises: Promise<void>[] = [];
    querySnapshot.forEach((doc) => {
      const deletePromise = deleteDoc(doc.ref);
      deletePromises.push(deletePromise);
    });
    await Promise.all(deletePromises);
  }
  getAll() {
    const q = query(collection(db, this.collectionName));
    return getDocs(q);
  }
}
