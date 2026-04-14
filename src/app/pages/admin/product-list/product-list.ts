import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
export interface IProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  description: string;
  categoryId: string;
}
@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  http = inject(HttpClient);
  changdt = inject(ChangeDetectorRef);

  products: IProduct[] = [];

  ngOnInit() {
    this.http.get<IProduct[]>('http://localhost:3000/products').subscribe({
      next: (data) => {
        this.products = data;
        this.changdt.markForCheck();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  handleDelete(id: string) {
    if (confirm('Bạn muốn xóa sản phẩm này không?')) {
      this.http.delete(`http://localhost:3000/products/${id}`).subscribe({
        next: () => {
          alert('Xóa thành công');
          this.products = this.products.filter((item) => item.id !== id);
          this.changdt.markForCheck();
        },
        error: (err) => {
          console.log(err);
          alert('Xóa thất bại');
        },
      });
    }
  }
}
