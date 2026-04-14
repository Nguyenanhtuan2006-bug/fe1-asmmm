import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  selector: 'app-search',
  imports: [RouterLink, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  products: IProduct[] = [];
  router = inject(ActivatedRoute);
  http = inject(HttpClient);
  keywords = '';
  changdt = inject(ChangeDetectorRef);

  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.keywords = params['keywords'];

      if (this.keywords) {
        this.http.get<IProduct[]>(`http://localhost:3000/products`).subscribe({
          next: (data) => {
            // console.log(data);
            this.products = data.filter((item) =>
              item.name.toLowerCase().includes(this.keywords.toLowerCase()),
            );
            this.changdt.markForCheck();
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.products = [];
        this.changdt.markForCheck();
      }
    });
  }
}
