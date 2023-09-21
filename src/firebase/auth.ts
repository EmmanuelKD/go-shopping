// https://firebase.google.com/docs/auth/web/facebook-login
"use client";

import { routes } from "@/config";
import { AuthContextType } from "@/context/auth/types";
import { NotificationContextType } from "@/context/notification/types";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  User,
  UserCredential,
} from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { UsersClass } from "./collections/users";
import { auth } from "./config";

const LOCAL_USER_ID = "LocalUser";

export class AuthClass {
  userStore: UsersClass;

  constructor() {
    this.userStore = new UsersClass();
  }

  /**
   *
   * @param { email, password, authContext}
   */

  async loginWithEmailAndPassword({
    email,
    password,
    authContext,
    navigate,
    notificationContext,
  }: AuthUserType & {
    authContext?: AuthContextType;
    navigate?: AppRouterInstance;
    notificationContext?: NotificationContextType;
  }) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        let _user = await this.userStore.getUsersById(user.uid);
        if (_user) {
          this.saveUserToLocalStorage(_user);
          authContext?.loadUserToState(_user);
          navigate?.push(`${routes.home.index}`);
        }
      })
      .catch((error) => {
        notificationContext?.addNotification({
          message: this.errorFirebase(error, email),
          variant: "error",
        });
      });
  }

  async createUserWithEmailAndPassword({
    email,
    password,
    authContext,
    navigate,
    notificationContext,
    fname,
    lname,
  }: {
    email: string;
    fname: string;
    lname: string;
    password: string;
    authContext?: AuthContextType;
    navigate?: AppRouterInstance;
    notificationContext?: NotificationContextType;
  }) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        const user = result.user;

        let auth = new UsersClass();
        let _user: AppUser = {
          objectId: user.uid,
          email: user.email as string,
          fname,
          lname,
          phoneNumber: user.phoneNumber as string,
          isVerified: user.emailVerified,
          created_at: new Date(),
        };

        await auth.saveUsersData(_user);

        this.saveUserToLocalStorage(_user);
        authContext?.loadUserToState(_user);
        navigate?.push(`${routes.home.index}`);
      })
      .catch((error) => {
        notificationContext?.addNotification({
          message: `${this.errorFirebase(error, email)} `,
          variant: "warning",
        });
      });
  }

  /**
   * This is used to send verification email for  email and password signup only
   */
  async sendVerificationEmail() {
    await sendEmailVerification(auth.currentUser as User).then(() => {
      alert("Verification  mail sent");
    });
  }

  /**
   * This method is used to send reset password for email and password login only
   */
  resetEmailPassword({
    authContext,
    notificationContext,
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
    authContext?: AuthContextType;
    notificationContext?: NotificationContextType;
  }) {
    var user = auth.currentUser;

    if (user) {
      var credential = EmailAuthProvider.credential(
        user?.email as string,
        oldPassword
      );
      reauthenticateWithCredential(user, credential)
        .then(function () {
          if (user)
            updatePassword(user, newPassword)
              .then(function () {
                notificationContext?.addNotification({
                  message: "password changed successfully",
                  variant: "success",
                });
              })
              .catch(function (error) {
                notificationContext?.addNotification({
                  message: "password changed successfully",
                  variant: "success",
                });
              });
        })
        .catch(function (error) {
          notificationContext?.addNotification({
            message: "password changed fail",
            variant: "error",
          });
        });
    } else {
      notificationContext?.addNotification({
        message: "password changed fail",
        variant: "error",
      });
    }
  }

  /**
   * This method is used to send reset password for email and password login only
   */
  sendResetUsersPasswordMail({
    email,
    authContext,
    notificationContext,
  }: {
    email: string;
    authContext?: AuthContextType;
    notificationContext?: NotificationContextType;
  }) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        notificationContext?.addNotification({
          message: `Password Resent mail mail sent successfully to this email ${email}`,
          variant: "success",
        });
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = 
        // let message = errorMessage;
        
        notificationContext?.addNotification({
          message:error.message,
          variant: "success",
        });
      });
  }

  signOutCurrentUser(authContext?: AuthContextType) {
    signOut(auth)
      .then(() => {
        this.removeUserToLocalStorage();
        authContext?.loadUserToState(undefined);
      })
      .catch((error) => {
        alert("fail to sign out");
      });
  }

  onAuthStateChange(
    loadUserToState?: (user?: AppUser) => void,
    navigate?: AppRouterInstance
  ) {
    onAuthStateChanged(auth, async (user) => {
      const currentUrl = window.location.href;
      if (user == null && currentUrl.includes("/screens/home/profile")) {
        this.removeUserToLocalStorage();
        loadUserToState?.(undefined);
        navigate?.push(routes.home.index);
      }
    });
  }

  removeUserToLocalStorage() {
    localStorage.removeItem(LOCAL_USER_ID);
  }

  saveUserToLocalStorage(user?: AppUser) {
    if (user) {
      localStorage.setItem(LOCAL_USER_ID, JSON.stringify(user));
    }
  }

  getUserFromLocalStorage(): AppUser | undefined {
    let userString = localStorage.getItem(LOCAL_USER_ID) as string;
    if (userString?.length > 0) {
      let userJson = JSON.parse(userString);
      return userJson as AppUser;
    }
    return undefined;
  }

  errorFirebase(error: FirebaseError, email?: string) {
    // console.error(error)
    return error.code.replaceAll("auth/", "").replaceAll("-", " ");
  }
}
