import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase'
import { Router } from '@angular/router'
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router,
    private toast: ToastService
  ) { }


  localSignIn({ email, password }) {
    try {
      return this.fireAuth.signInWithEmailAndPassword(email, password).then(response => {
        return response['user']
      }).catch(err => err)
    } catch (error) {
      console.log(error)
    }
  }

  googleSignIn() {
    try {
      return this.fireAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider)
        .then(response => {
          return response['user'];
        }).catch(err => err)
    } catch (error) {
      console.log(error)
    }
  }

  createUser({ email, userName, password }) {

    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.user.updateProfile({
          displayName: userName
        });
        this.toast.informationToast('Successfully registered', 'success', '');
        this.router.navigate(['/login']);

      }).catch(error => {
        this.toast.informationToast(error.message, 'danger', 'Error creating the account');

      });
  }

}
