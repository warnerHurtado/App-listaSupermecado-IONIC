import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,) { }


  async ngOnInit() {
    this.generateForm();
    //await this.storage.create();
    //this.loggedInChecker();


  }


  generateForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls)
        .forEach(iterator => {

          if (iterator instanceof FormGroup) {

            Object.values(iterator.controls).forEach(campo => {
              campo.markAllAsTouched();
            })

          } else {
            iterator.markAllAsTouched();
          }
        });
      return;
    }
    console.log('Holaaa');

    //this.firebaseLogin();
  }

}
