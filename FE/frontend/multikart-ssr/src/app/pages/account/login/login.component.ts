import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common'

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ["", [Validators.required]],
    password: ["", Validators.required],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onLogin() {
    this.authService
      .login(
        this.loginForm.get("email").value,
        this.loginForm.get("password").value
      )
      .subscribe(
        (res) => {
          localStorage.setItem("jwt", res.jwt);
          const callback = decodeURIComponent(this.route.snapshot.queryParams.callback)
          const modal = this.modal.success({
            nzTitle: "Welcome Back " + res.name,
          });
          setTimeout(() => {
            modal.destroy();
            callback ? this.router.navigateByUrl(`${callback}`) : this.router.navigateByUrl("/home");
          }, 2000);
        },
        (err) => {
          const modal = this.modal.error({
            nzTitle: "Ops, Something goes wrong, try again"
          });
          setTimeout(() => {
            modal.destroy();
          }, 1000);
        }
      );
  }
}
