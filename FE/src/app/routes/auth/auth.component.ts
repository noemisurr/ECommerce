import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe((res) => {
      console.log(res)
    })
  }

}
