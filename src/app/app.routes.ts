import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Category } from './pages/category/category';
import { Detail } from './pages/detail/detail';
import { Cart } from './pages/cart/cart';
import { Filter } from './pages/filter/filter';

// Các đường dẫn file
import { ProductList } from './pages/admin/product-list/product-list';
import { ProductAdd } from './pages/admin/product-add/product-add';
import { ProductEdit } from './pages/admin/product-edit/product-edit';
import { CategoryList } from './pages/admin/category-list/category-list';
import { CategoryAdd } from './pages/admin/category-add/category-add';
import { CategoryEdit } from './pages/admin/category-edit/category-edit';
import { Search } from './pages/search/search';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { adminGuard } from './pages/guard/guard';

export const routes: Routes = [
  // Trang chủ
  { path: '', component: Home },
  // Danh mục
  { path: 'category', component: Category },
  // Chi tiết
  { path: 'product/:id', component: Detail },
  // Giỏ hàng
  { path: 'cart', component: Cart },
  // Bộ lọc
  { path: 'filters', component: Filter },
  //   Tìm kiếm
  { path: 'search', component: Search },
  //   Đăng ký
  { path: 'register', component: Register },
  //   Đăng nhập
  { path: 'login', component: Login },
  //  Admin
  //   Quyền chỉ admin đăngg nhập vào
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: 'category-list', component: CategoryList },
      { path: 'category-add', component: CategoryAdd },
      { path: 'category-edit/:id', component: CategoryEdit },

      // Sản phẩm
      { path: 'product-list', component: ProductList },
      { path: 'product-add', component: ProductAdd },
      { path: 'product-edit/:id', component: ProductEdit },
    ],
  },
  // Danh mục
];
