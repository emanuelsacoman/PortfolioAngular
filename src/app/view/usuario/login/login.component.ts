import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/model/services/auth.service';
import { User } from 'src/app/model/services/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userForm!: FormGroup;
  loginError: string | null = null;

  title = 'Faça login';
  
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private titleService: Title,
    private toast: NgToastService){
      this.setDocTitle(this.title);
  }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      senha: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
    });
  }

  submit() {
    const user: User = this.userForm.value;

    if (!user) {
        return;
    }

    this.authService.login(user).then(() => {
        this.router.navigate(['']);
        this.toast.success({
            detail: "Sucesso!",
            summary: "Login Efetuado com Sucesso.",
            duration: 5000
        });
    }).catch((e: any) => {
        this.loginError = 'Email ou senha incorretos.';
        this.toast.error({
            detail: "Tente Novamente",
            summary: "Email ou senha incorretos!",
            duration: 5000
        });
        this.userForm.reset();
    });
  }

  isInvalidControl(controlName: string) {
    const control = this.userForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  setDocTitle(title: string) {
    console.log('current title:::::' + this.titleService.getTitle());
    this.titleService.setTitle(title);
 }
}
