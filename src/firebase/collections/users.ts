"use client";
import {
  DocumentData,
  QuerySnapshot,
  onSnapshot,
  where,
} from "firebase/firestore";
import { F_DB } from "../database";
import { app } from "../config";
import _ from "lodash";

export class UsersClass extends F_DB {
  constructor() {
    super(app, "users");
  }

  async addListener(onDone: (snapshot: QuerySnapshot<DocumentData>) => void) {
    let docRef = this.getCollectionRef();
    if (docRef) {
      onSnapshot(docRef, onDone);
    }
  }

  async saveUsersData(data: AppUser) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.addToDocumentCollection({ docId: data.objectId, data:_data });
  }

  async updateUsersData(data: AppUser) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.updateDocument({ documentId: data.objectId as string, data:_data });
  }

  async getUsersById(userId?: string) {
    return this.getDocumentDataByCondition({
      conditions: userId ? [where("objectId", "==", userId)] : [],
    }).then((snap) => {
      if (!snap?.empty) {
        return snap?.docs.map((doc) => {
          return doc.data() as AppUser;
        })[0];
      } else {
        return null;
      }
    });
  }

  async getAllUsers(departmentId?: string) {
    return this.getDocumentDataByCondition({
      conditions: departmentId
        ? [where("departmentID", "==", departmentId)]
        : [],
    }).then((snap) => {
      if (!snap?.empty) {
        return snap?.docs.map((doc) => {
          return doc.data() as AuthUserType;
        });
      } else {
        return null;
      }
    });
  }
}
