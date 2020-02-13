import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private afStorage: AngularFireStorage,
    private db: AngularFireDatabase
  ) {
  }

  getFiles() {

  }

  uploadToStorage(userID, category, file) {

    const storageRef = this.afStorage.ref('/' + userID + '/' + category + '/' + file.name );
    const uploadTask = this.afStorage.upload(file.name).

  }

  storeInfoToDatabase(metainfo) {

  }

  deleteFile(file) {

  }
}
