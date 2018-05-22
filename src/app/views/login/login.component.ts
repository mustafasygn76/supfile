import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  users = {
    email: '',
    password: ''
 };

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private authService: AuthService ) { 
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        }
        // tslint:disable-next-line:one-line
        else{
          this.userDetails = null;
        }
      }
    )
  }

  ngOnInit() {

  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
    .then((res) => {
        this.router.navigate(['dashboard'])
      })
    .catch((err) => console.log(err));
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => {
        this.router.navigate(['dashboard'])
      })
    .catch((err) => console.log(err));
  }

  signInWithEmail() {
    this.authService.signInRegular(this.users.email, this.users.password)
       .then((res) => {
          console.log(res);

          this.router.navigate(['dashboard']);
       })
       .catch((err) => console.log('error: ' + err));
 }

}
