import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
export interface Icategory {
  id: string;
  name: string;
}
@Component({
  selector: 'app-product-add',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './product-add.html',
  styleUrl: './product-add.css',
})
export class ProductAdd {
  http = inject(HttpClient);
  router = inject(Router);

  categories: Icategory[] = [];
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    description: new FormControl(''),
    categoryId: new FormControl('', Validators.required),
  });
  ngOnInit() {
    this.http.get<Icategory[]>('http://localhost:3000/products').subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  handleSubmit() {
    if (this.productForm.valid) {
      const dataForm = this.productForm.value;
      this.http.post('http://localhost:3000/products', dataForm).subscribe({
        next: () => {
          alert('Thêm sản phẩm thành công!');
          this.router.navigate(['/admin/product-list']);
        },
        error: (err) => {
          console.log(err);
          alert('Có lỗi xảy ra');
        },
      });
    } else {
      alert('Vui lòng điền đủ thông tin bắt buộc!');
    }
  }
}
