import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/realAuth/service/auth.service';
import { Role } from "../../links/register/model/rol";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userRoles: string[] = [];
  message: string = '';
  messageType: string = 'success'; // New property for message type
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.login();
    }
    
  }

  get user(): AbstractControl {
    return this.loginForm.get('user') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password') as AbstractControl;
  }

  login(): void {
    const { user, password } = this.loginForm.value;
    this.authService.login(user, password).subscribe({
      next: () => {
        const roles: Role[] = this.authService.getRoles() || [];
        const role = roles.length > 0 ? roles[0].name : null;

        switch (role) {
          case 'ROLE_DELIVERY':
            this.router.navigateByUrl('/delivery');
            break;
          case 'ROLE_SELLER':
            this.router.navigateByUrl('/artesano/registerpro');
            break;
          case 'ROLE_BUYER':
            this.router.navigateByUrl('/web2/inicio');
            break;
          case 'ROLE_ADMIN':
            this.router.navigateByUrl('/panel/userss');
            break;
          default:
            this.router.navigateByUrl('/web2/inicio');
            break;
        }

        this.message = 'Inicio de sesión exitoso!';
        this.messageType = 'success'; // Set message type
      },
      error: (err) => {
        console.error('Login failed', err);
        this.message = 'Contraseña y/o usuario incorrecto. Intenta de nuevo.';
        this.messageType = 'error'; // Set message type
      }
    });
  }
}