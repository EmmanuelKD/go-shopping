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
import { AppProduct } from "@/types";

export class Products extends F_DB {
  constructor() {
    super(app, "products");
  }

  async addListener(onDone: (snapshot: QuerySnapshot<DocumentData>) => void) {
    let docRef = this.getCollectionRef();
    if (docRef) {
      onSnapshot(docRef, onDone);
    }
  }

  async saveProductData(data: AppProduct) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.addToDocumentCollection({ docId: data.objectId, data:_data });
  }

  async getUsersById(userId?: string) {
    return this.getDocumentDataByCondition({
      conditions: userId ? [where("objectId", "==", userId)] : [],
    }).then((snap) => {
      if (!snap?.empty) {
        return snap?.docs.map((doc) => {
          return doc.data() as AppProduct;
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
