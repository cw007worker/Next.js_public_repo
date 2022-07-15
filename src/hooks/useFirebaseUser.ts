import { auth } from 'libs/firebase/index';
import firebase from 'firebase';
import React, { useState } from 'react';

export const useFirebaseUser = () => {
  const [firebaseUser, setFirebaseUser] = useState<
    firebase.User | undefined | null
  >(undefined);
  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
    return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting.
  }, []);
  return firebaseUser;
};
