import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { log } from 'console';
export interface IProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  description: string;
  categoryId: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
})
export class Home {
  http = inject(HttpClient);
  changdt = inject(ChangeDetectorRef);

  newArrivals: any[] = [];
  topSelling: any[] = [];

  ngOnInit() {
    this.http.get<any[]>(`http://localhost:3000/products`).subscribe({
      next: (data) => {
        this.newArrivals = data.slice(0, 4);

        this.topSelling = data.slice(4, 8);

        this.changdt.markForCheck();
        console.log("Dữ liệu newArrivals" ,this.newArrivals );
        
      },
      error: (err) => {
        console.log('Lỗi', err);
      },
    });
  }
}
