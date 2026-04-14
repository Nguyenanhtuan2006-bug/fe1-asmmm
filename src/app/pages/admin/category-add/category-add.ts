import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './category-add.html',
  styleUrl: './category-add.css',
})
export class CategoryAdd {
  categoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  http = inject(HttpClient);
  router = inject(Router);

  handleSumit() {
    if (this.categoryForm.valid) {
      const dataForm = this.categoryForm.value;

      this.http.post(`http://localhost:3000/categories`, dataForm).subscribe({
        next: () => {
          alert('Thêm danh mục thành công!');
          this.router.navigate(['/admin/category-list']);
        },
        error: (err) => {
          console.log(err);
          alert('Có lỗi xảy ra');
        },
      });
    } else {
      alert('Vui lòng nhập tên danh mục');
    }
  }
}
