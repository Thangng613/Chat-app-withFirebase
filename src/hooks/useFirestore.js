import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../components/firebase/firebase";

const useFirestore = (collec, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = query(collection(db, collec), orderBy("createAt"));

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      const q = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
      collectionRef = q;
    }
    const unsubscribe = onSnapshot(collectionRef, (snapShot) => {
      const documents = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });
    return unsubscribe;
  }, [collec, condition]);

  return documents;
};

export default useFirestore;
