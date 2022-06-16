// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//重定向，弹窗登录
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuSpaU6LextQo8PPd0WZbVK4ABCK6W_dY",
  authDomain: "crwn-clothing-db-e20ab.firebaseapp.com",
  projectId: "crwn-clothing-db-e20ab",
  storageBucket: "crwn-clothing-db-e20ab.appspot.com",
  messagingSenderId: "361832512694",
  appId: "1:361832512694:web:98756ec20552ff19a7ba17",
};

// Initialize Firebase这是一个实例，增删改查，认证都用该实例里面的方法
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  });
  await batch.commit();
};
export const GetCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};
export const createUserDocumentFromAuth = async (userAuth, addtionalInfo) => {
  const userDocRef = doc(db, "users", userAuth.uid); //为什么这里不用await呢，不知道。这不是一个异步的东西，只是用db函数，来构建一个用户文档的引用
  const userSnapshot = await getDoc(userDocRef); //记录文档的快照，从数据库住获取是否有该文档

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...addtionalInfo,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};
// export const createUserDocumentFromAuth = (userAuth) => {
//   return new Promise((resolve) => {
//     resolve(doc(db, "users", userAuth.uid));
//   }).then((res) => {
//     console.log(res);
//   });
// };
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
