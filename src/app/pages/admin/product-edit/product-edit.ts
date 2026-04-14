import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
export interface Icategory {
  id: string;
  name: string;
}
@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  standalone: true,
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css',
})
export class ProductEdit implements OnInit {
  http = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute);

  categories: Icategory[] = [];
  productId: string = '';

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    description: new FormControl(''),
    categoryId: new FormControl('', Validators.required),
  });
  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];

    this.http.get<Icategory[]>('http://localhost:3000/categories').subscribe({
      next: (data) => (this.categories = data),

      error: (err) => console.log(err),
    });

    this.http.get<Icategory[]>(`http://localhost:3000/products/${this.productId}`).subscribe({
      next: (data: any) => {
        this.productForm.patchValue({
          name: data.name,
          image: data.image,
          price: data.price,
          description: data.description,
          categoryId: data.categoryId,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleSubmit() {
    if (this.productForm.valid) {
      const dataForm = this.productForm.value;
      this.http.put(`http://localhost:3000/products/${this.productId}`, dataForm).subscribe({
        next: () => {
          alert('Cập nhật sản phẩm thành công!');
          this.router.navigate(['/admin/product-list']);
        },
        error: (err) => {
          console.log(err);
          alert('Có lỗi xảy ra');
        },
      });
    }
  }
}
