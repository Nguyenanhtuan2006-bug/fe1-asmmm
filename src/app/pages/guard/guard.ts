import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Lấy router chuẩn của Angular

  // Lấy thông tin user đã lưu lúc đăng nhập
  const userString = sessionStorage.getItem('user');

  if (userString) {
    const user = JSON.parse(userString);

    // Kiểm tra xem có đúng là admin không
    if (user.role === 'admin') {
      return true; // Cửa mở, cho phép vào trang Admin!
    }
  }

  // Nếu không đăng nhập hoặc không phải admin -> Báo lỗi & Đuổi về trang chủ
  alert('Bạn không có quyền truy cập trang quản trị!');
  router.navigate(['/']);
  return false; 
};