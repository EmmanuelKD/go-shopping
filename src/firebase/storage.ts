"use client"
import {
  UploadResult,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { storage } from "./config";

export class FileStorage {
  constructor() {
    // super(app, 'printJobs');
  }

  async addUsersProfileToStorage(file: File, usersId: string) {
    const destinationFolder = "files/users/" + usersId;
    // console.log(file.type)
    let _tsk = await this.uploadFile(file, `${destinationFolder}/profile.${file.type.replace('image/','')}`);
    return getDownloadURL(_tsk.ref);
  }

  async addProductImagesToStorage(files: File[], productId: string) {
    const destinationFolder = "files/products/" + productId;

    return this.uploadFilesAsBatch(files, destinationFolder).then((task) => {
      let downloadRef = task.map(async (_tsk) => {
        return await getDownloadURL(_tsk.ref);
      });
      return Promise.all(downloadRef);
    });
  }

  private async uploadFilesAsBatch(
    files: File[],
    destinationFolder: string
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map((file) => {
      const filePath = `${destinationFolder}/${file.name}`;
      const fileRef = ref(storage, filePath);
      return uploadBytes(fileRef, file);
    });
    return await Promise.all(uploadPromises);
  }

  private async uploadFile(
    file: File,
    destinationFolder: string
  ): Promise<UploadResult> {
    const fileRef = ref(storage, destinationFolder);
    return uploadBytes(fileRef, file);
  }

  // async deleteFileFromStorage(downloadUrl: string, updatedPrintFile: string[], printId: string): Promise<void> {
  //     try {
  //         await this.updateDocument({ documentId: printId, data: { printFileURL: updatedPrintFile } });
  //         let fileRef = ref(storage, downloadUrl);
  //         await deleteObject(fileRef);
  //     } catch (error) {
  //         console.error('Error deleting file from Firebase Cloud Storage:', error);
  //     }
  // }

  // async deleteFileFolder(printFile: string[], fileId: string): Promise<void> {
  //     try {
  //         await this.deleteDocument({ documentId: fileId });
  //         const fileRef = ref(storage, printFile[0]);
  //         await deleteObject(fileRef.parent as StorageReference);
  //     } catch (error) {
  //         console.error('Error deleting file from Firebase Cloud Storage:', error);
  //     }
  // }
}
