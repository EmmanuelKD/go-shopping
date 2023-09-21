"use client";

 import { AuthContextProp, AuthContextState } from "./types";
 import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./context";
import { AuthClass } from "@/firebase/auth";
import { UsersClass } from "@/firebase/collections/users";

function AuthContextProvider(props: AuthContextProp) {
  const navigate = useRouter();
  let auth = new AuthClass();
  let usr = new UsersClass();
  const [state, setState] = useState<AuthContextState>({});

  useEffect(() => {
    if (!state.user) {
      auth.onAuthStateChange(loadUserToState, navigate);

      let localUser = auth.getUserFromLocalStorage();

      if (localUser) loadUserToState(localUser);
      let userStorData = auth.getUserFromLocalStorage();
      // console.log(userStorData);
      
      if (userStorData) setState((prev) => ({ ...prev, userStorData }));

      usr.addListener((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // Document added
            const documentData = change.doc.data();
            if (documentData["objectId"] === userStorData?.objectId) {
              setUserStoreData(documentData as AppUser);
            }
          }
          if (change.type === "modified") {
            const documentData = change.doc.data();
            if (documentData["objectId"] === userStorData?.objectId) {
              setUserStoreData(documentData as AppUser);
            }
          }
          if (change.type === "removed") {
            // Document removed
            const documentData = change.doc.data();
            console.log("Document removed:", documentData);
          }
        });
      });
    }
    // eslint-disable-next-line
    // react-hooks/exhaustive-deps
  }, [state]);

  function setUserStoreData(userStorData: AppUser) {
    console.log(userStorData)
    auth.saveUserToLocalStorage(userStorData);
    setState((prev) => ({ ...prev, userStorData }));
  }

  function loadUserToState(user?: AppUser) {
    setState((prev) => ({ ...prev, user }));
  }

  function isUserLoggedIn() {
    return state.user !== undefined;
  }

  return (
    <AuthContext.Provider
      value={useMemo(
        () => {
          return({
          loadUserToState,
          user: state.user,
          isUserLoggedIn,
        })},
        [state, isUserLoggedIn]
      )}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
const AuthContextConsumer = AuthContext.Consumer;

export { AuthContextProvider, AuthContextConsumer };
