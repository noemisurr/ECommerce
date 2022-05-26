import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  confirmValidator = (control: FormControl): { [ k: string]: boolean }  => {
    if(!control.value) {
      return { error: true, required: true}
    }else if ( control.value !== this.registerForm.controls.password.value ) {
      return { error: true, confirm: true }
    } return {}
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [this.confirmValidator]]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  get name() {
    return this.registerForm.get('name')
  }
  get email() {
    return this.registerForm.get('email')
  }
  get password() {
    return this.registerForm.get('password')
  }


  onLogin() {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe((res) => {
      console.log(res)
      this.router.navigateByUrl('/home')
    })
  }

  onRegister() {
    this.authService.register(this.name?.value, this.email?.value, this.password?.value).subscribe((res) => {
      console.log(res);
      //messaggio errore o creazione
      //svuotare il form
    })
  }

}
