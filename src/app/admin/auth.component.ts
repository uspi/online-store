import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../model/auth.service";

@Component({
  templateUrl: "auth.component.html"
})
export class AuthComponent{
  public username: string | undefined;
  public password: string | undefined;
  public errorMessage: string | undefined;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  authenticate(form: NgForm) {
    console.log("fdffdf")
    if (!form.valid) {
      this.errorMessage = "Form Data Invalid";
      return;
    }
    if (!this.username) {
      this.errorMessage = "Username Is Undefined";
      return;
    }
    if (!this.password) {
      this.errorMessage = "Password Is Undefined";
      return;
    }

    this.auth.authenticate(this.username, this.password)
      .subscribe(response => {
        if (response) {
          this.router.navigateByUrl("/admin/main");
        }
        this.errorMessage = "Authentication Failed";
      })
  }
}
