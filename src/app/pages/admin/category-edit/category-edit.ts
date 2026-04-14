import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-edit.html',
  styleUrl: './category-edit.css',
})
export class CategoryEdit {
  categoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  http = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute);
  categoryId: string = '';

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];

    this.http.get(`http://localhost:3000/categories/${this.categoryId}`).subscribe({
      next: (data: any) => {
        this.categoryForm.patchValue({
          name: data.name,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleSumit() {
    if (this.categoryForm.valid) {
      const dataForm = this.categoryForm.value;

      this.http.put(`http://localhost:3000/categories/${this.categoryId}`, dataForm).subscribe({
        next: () => {
          alert('Cập nhật danh mục thành công!');
          this.router.navigate(['/admin/category-list']);
        },
        error: (err) => {
          console.log(err);
          alert('Có lỗi xảy ra');
        },
      });
    }
  }
}
