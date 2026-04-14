import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  changdt = inject(ChangeDetectorRef);
  platformId = inject(PLATFORM_ID); // Khai báo môi trường
  router = inject(Router);

  cartItems: any[] = [];
  currentUser: any = null;

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem('user');
      if (userString) {
        this.currentUser = JSON.parse(userString);
        const allCarts = JSON.parse(localStorage.getItem('cart') || '[]');

        this.cartItems = allCarts.filter((item: any) => item.userId === this.currentUser.id);
        this.changdt.markForCheck();
      } else {
        alert('Vui lòng đăng nhập để xem giỏ hàng!');
        this.router.navigate(['/login']);
      }
    }
  }
  saveCartToLocal() {
    const allCarts = JSON.parse(localStorage.getItem('cart') || '[]');

    const otherUserCarts = allCarts.filter((item: any) => item.userId !== this.currentUser.id);

    const updateAllCarts = [...otherUserCarts, ...this.cartItems];

    localStorage.setItem('cart', JSON.stringify(updateAllCarts));
    this.changdt.markForCheck();
  }
  // Hàm tăng giảm
  increaseQty(index: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.cartItems[index].quantity++;
      this.saveCartToLocal();
    }
  }
  decreaseQty(index: number) {
    if (isPlatformBrowser(this.platformId)) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
        this.saveCartToLocal();
      }
    }
  }

  //   Tính tổng
  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  deleteItem(index: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.cartItems = this.cartItems.filter((_, i) => i !== index);
      this.saveCartToLocal();
    }
  }
}
