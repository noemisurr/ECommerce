import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    name: ["", Validators.required],
    surname: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required],
    birth: [""],
    telephone: [""],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegister() {
    this.authService
      .register(
        this.registerForm.get("name").value,
        this.registerForm.get("surname").value,
        this.registerForm.get("email").value,
        this.registerForm.get("password").value,
        this.registerForm.get("birth").value,
        this.registerForm.get("telephone").value
      )
      .subscribe(
        (res) => {
          const modal = this.modal.success({
            nzTitle: "User Created",
          });
          setTimeout(() => modal.destroy(), 2000);
          this.router.navigateByUrl("/pages/login");
        },
        (res) => {
          const modal = this.modal.error({
            nzTitle: res.error.message,
          });

          setTimeout(() => modal.destroy(), 2000);
        }
      );
  }
}
