// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
// import { ActivatedRoute, Router, RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-detail',
//   imports: [CommonModule, RouterLink],
//   standalone: true,
//   templateUrl: './detail.html',
//   styleUrl: './detail.css',
// })
// export class Detail implements OnInit {
//   http = inject(HttpClient);
//   route = inject(ActivatedRoute);
//   router = inject(Router);
//   changdt = inject(ChangeDetectorRef);

//   product: any = null;
//   mainImage: string = '';
//   quantity: number = 1;
//   // Hàm tăng giảm
//   increment() {
//     this.quantity++;
//     this.changdt.markForCheck();
//   }
//   decrement() {
//     if (this.quantity > 1) {
//       this.quantity--;
//       this.changdt.markForCheck();
//     }
//   }
//   // Lấy dữ liệu
//   ngOnInit() {
//     const productId = this.route.snapshot.params['id'];

//     this.http.get<any>(`http://localhost:3000/products/${productId}`).subscribe({
//       next: (data) => {
//         this.product = data;
//         this.mainImage = data.image;
//         this.changdt.markForCheck();
//       },
//       error: (err) => {
//         console.log('Lỗi', err);
//       },
//     });
//   }
//   //   Thêm sản phẩm vào giỏ hàng
//   addToCart() {
//     let cart = JSON.parse(localStorage.getItem('cart') || '[]');

//     let index = cart.findIndex((item: any) => item.id === this.product.id);

//     if (index !== -1) {
//       cart[index].quantity += this.quantity;
//     } else {
//       cart.push({ ...this.product, quantity: this.quantity });
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     this.router.navigate(['/cart']);
//   }
//   //   Thay đổi ảnh bé -> to
//   changeMainImage(imgUrl: string) {
//     this.mainImage = imgUrl;
//     this.changdt.markForCheck();
//   }
// }
