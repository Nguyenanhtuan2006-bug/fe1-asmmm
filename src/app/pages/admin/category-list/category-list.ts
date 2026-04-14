import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface ICategory {
  id: number;
  name: string;
}
@Component({
  selector: 'app-category-list',
  imports: [CommonModule, RouterLink , ReactiveFormsModule],
  standalone: true,
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit {
  http = inject(HttpClient);
  changdt = inject(ChangeDetectorRef);

  categories: ICategory[] = [];

  ngOnInit(): void {
    this.http.get<ICategory[]>(`http://localhost:3000/categories`).subscribe({
      next: (data) => {
        this.categories = data;
        this.changdt.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // Hàm xóa
  handleDelete(id: number) {
    if (confirm('Xóa danh mục này đi?')) {
      this.http.delete(`http://localhost:3000/categories/${id}`).subscribe({
        next: () => {
          alert('Xóa xong rồi!');
          this.categories = this.categories.filter((item) => item.id !== id);
          this.changdt.markForCheck();
        },
        error: (err) => {
          console.log(err);
          alert('Thất bại');
        },
      });
    }
  }
}
