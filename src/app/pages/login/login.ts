import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  http = inject(HttpClient);
  router = inject(Router);
  submitForm() {
    if (this.userForm.valid) {
      const email = this.userForm.value.email;
      const password = this.userForm.value.password;

      this.http
        .get<any>(`http://localhost:3000/users?email=${email}&password=${password}`)
        .subscribe({
          next: (data: any) => {
            if (data.length > 0) {
              const Login = data[0];
              sessionStorage.setItem('user', JSON.stringify(Login));
              alert('Đăng nhập thành công');

              if (Login.role === 'admin') {
                this.router.navigate(['/admin/product-list']);
              } else {
                this.router.navigate(['/']);
              }
            } else {
              alert('Đăng nhập thất bại!');
            }
          },
          error: (err) => {
            alert('Lỗi kết nối server!');
            console.log(err);
          },
        });
    }
  }
}
