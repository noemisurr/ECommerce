import { Injectable, HostListener } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CategoryService } from "src/app/pages/account/services/category.service";

// Menu
export interface Menu {
  path?: string;
  queryParams?: string;
  title?: string;
  type?: string;
  megaMenu?: boolean;
  image?: string;
  active?: boolean;
  badge?: boolean;
  badgeText?: string;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService {
  constructor(private categoryService: CategoryService) {}

  public screenWidth: any;
  public leftMenuToggle: boolean = false;
  public mainMenuToggle: boolean = false;

  // Windows width
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    {
      path: "home",
      title: "Home",
      type: "link",
    },
    {
      path: "/shop/list",
      title: "Shop",
      megaMenu: true,
      type: "link",
      children: this.categoryService.categories.map((res) => {
        return {
          queryParams: res.name,
          title: res.name,
          type: "link",
          active: true,
          children: res.subcategories.map((sub) => {
            return {
              path: "/shop/list",
              queryParams: sub.name,
              title: sub.name,
              type: "link",
            };
          }),
        };
      }),
    },
    {
      path: "/pages/contact",
      title: "Contact",
      type: "link",
    },
    // {
    // 	title: 'home', type: 'sub', active: false, children: [
    // 		{
    // 			title: 'clothing', type: 'sub', active: false, children: [
    // 				{ path: '/home/fashion', title: 'fashion-01', type: 'link' },
    // 				{ path: '/home/fashion-2', title: 'fashion-02', type: 'link' },
    // 				{ path: '/home/fashion-3', title: 'fashion-03', type: 'link' }
    // 			]
    // 		},
    // 		{ path: '/home/vegetable', title: 'vegetable', type: 'link' },
    // 		{ path: '/home/watch', title: 'watch', type: 'link' },
    // 		{ path: '/home/furniture', title: 'furniture', type: 'link' },
    // 		{ path: '/home/flower', title: 'flower', type: 'link' },
    // 		{ path: '/home/beauty', title: 'beauty', type: 'link' },
    // 		{ path: '/home/electronics', title: 'electronics', type: 'link' },
    // 		{ path: '/home/pets', title: 'pets', type: 'link' },
    // 		{ path: '/home/gym', title: 'gym', type: 'link' },
    // 		{ path: '/home/tools', title: 'tools', type: 'link' },
    // 		{ path: '/home/shoes', title: 'shoes', type: 'link' },
    // 		{ path: '/home/bags', title: 'bags', type: 'link' },
    // 		{ path: '/home/marijuana', title: 'marijuana', type: 'link' }
    // 	]
    // },
    // {
    // 	title: 'Products', type: 'sub', active: false, children: [
    // 		{
    // 			title: 'sidebar', type: 'sub', active: false, children: [
    // 				{ path: '/shop/product/left/sidebar/trim-dress', title: 'left-sidebar', type: 'link' },
    // 				{ path: '/shop/product/right/sidebar/trim-dress', title: 'right-sidebar', type: 'link' },
    // 				{ path: '/shop/product/no/sidebar/trim-dress', title: 'no-sidebar', type: 'link' }
    // 			]
    // 		},
    // 		{ path: '/shop/product/three/column/trim-dress', title: 'three-column', type: 'link' },
    // 		{ path: '/shop/product/four/image/belted-dress', title: 'four-image', type: 'link' },
    // 		{ path: '/shop/product/bundle/trim-dress', title: 'bundle-product', type: 'link' },
    // 		{ path: '/shop/product/image/outside/trim-dress', title: 'image-outside', type: 'link' }
    // 	]
    // },
    // {
    // 	title: 'Features', type: 'sub', megaMenu: true, badge: true, badgeText: 'new', active: false, children: [
    // 		{
    // 			title: 'portfolio', type: 'sub', active: false, children: [
    // 				{ path: '/pages/portfolio/grid/two', title: 'portfolio-grid-2', type: 'link' },
    // 				{ path: '/pages/portfolio/grid/three', title: 'portfolio-grid-3', type: 'link' },
    // 				{ path: '/pages/portfolio/grid/four', title: 'portfolio-grid-4', type: 'link' },
    // 				{ path: '/pages/portfolio/masonry/grid/two', title: 'mesonary-grid-2', type: 'link' },
    // 				{ path: '/pages/portfolio/masonry/grid/three', title: 'mesonary-grid-3', type: 'link' },
    // 				{ path: '/pages/portfolio/masonry/grid/four', title: 'mesonary-grid-4', type: 'link' },
    // 				{ path: '/pages/portfolio/masonry/full-width', title: 'mesonary-Full-Width', type: 'link' }
    // 			]
    // 		},
    // 		{
    // 			title: 'add-to-cart', type: 'sub', active: false, children: [
    // 				{ path: '/home/vegetable', title: 'cart-right', type: 'link' },
    // 				{ path: '/home/watch', title: 'cart-left', type: 'link' },
    // 				{ path: '/home/furniture', title: 'cart-top', type: 'link' },
    // 				{ path: '/home/flower', title: 'cart-bottom', type: 'link' },
    // 				{ path: '/home/fashion', title: 'cart-model-popup', type: 'link' }
    // 			]
    // 		},
    // 		{
    // 			title: 'theme-elements', type: 'sub', active: false, children: [
    // 				{ path: '/elements/theme/title', title: 'title', type: 'link' },
    // 				{ path: '/elements/theme/collection-banner', title: 'collection-banner', type: 'link' },
    // 				{ path: '/elements/theme/home-slider', title: 'home-slider', type: 'link' },
    // 				{ path: '/elements/theme/category', title: 'category', type: 'link' },
    // 				{ path: '/elements/theme/services', title: 'services', type: 'link' }
    // 			]
    // 		},
    // 		{
    // 			title: 'product-elements', type: 'sub', active: false, children: [
    // 				{ path: '/elements/product/slider', title: 'product-slider', type: 'link' },
    // 				{ path: '/elements/product/banners', title: 'banners', type: 'link' },
    // 				{ path: '/elements/product/tabs', title: 'product-tabs', type: 'link' },
    // 				{ path: '/elements/product/multi-slider', title: 'multi-slider', type: 'link' }
    // 			]
    // 		},
    // 		{
    // 			title: 'email-template', type: 'sub', active: false, children: [
    // 				{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success.html', title: 'order-success', type: 'extTabLink' },
    // 				{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success-two.html', title: 'order-success-2', type: 'extTabLink' },
    // 				{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template.html', title: 'email-template', type: 'extTabLink' },
    // 				{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template-two.html', title: 'email-template-2', type: 'extTabLink' }
    // 			]
    // 		}
    // 	]
    // },

    // {
    // 	title: 'pages', type: 'sub', active: false, children: [
    // 		{
    // 			title: 'account', type: 'sub', active: false, children: [
    // 				{ path: '/pages/wishlist', title: 'wishlist', type: 'link' },
    // 				{ path: '/pages/cart', title: 'cart', type: 'link' },
    // 				{ path: '/pages/dashboard', title: 'dashboard', type: 'link' },
    // 				{ path: '/pages/login', title: 'login', type: 'link' },
    // 				{ path: '/pages/register', title: 'register', type: 'link' },
    // 				{ path: '/pages/contact', title: 'contact', type: 'link' },
    // 				{ path: '/pages/forget/password', title: 'forget-password', type: 'link' },
    // 				{ path: '/pages/profile', title: 'profile', type: 'link' },
    // 				{ path: '/pages/checkout', title: 'checkout', type: 'link' },
    // 			]
    // 		}
    // 		// { path: '/pages/aboutus', title: 'about-us', type: 'link' },
    // 		// { path: '/pages/search', title: 'search', type: 'link' },
    // 		// { path: '/pages/typography', title: 'typography', type: 'link', badge: true, badgeText: 'new' },
    // 		// { path: '/pages/review', title: 'review', type: 'link', badge: true, badgeText: 'new' },
    // 		// { path: '/pages/order/success', title: 'order-success', type: 'link' },
    // 		// 	{
    // 		// 		title: 'compare', type: 'sub', active: false, children: [
    // 		// 			{ path: '/pages/compare/one', title: 'compare-1', type: 'link' },
    // 		// 			{ path: '/pages/compare/two', title: 'compare-2', type: 'link', badge: true, badgeText: 'new' }
    // 		// 		]
    // 		// 	},
    // 		// { path: '/pages/collection', title: 'collection', type: 'link' },
    // 		// { path: '/pages/lookbook', title: 'lookbook', type: 'link' },
    // 		// { path: '/pages/404', title: '404', type: 'link' },
    // 		// { path: '/pages/comingsoon', title: 'coming-soon', type: 'link', badge: true, badgeText: 'new' },
    // 		// { path: '/pages/faq', title: 'faq', type: 'link' }
    // 	]
    // },
    // {
    // 	title: 'blogs', type: 'sub', active: false, children: [
    // 		{ path: '/pages/blog/left/sidebar', title: 'left-sidebar', type: 'link' },
    // 		{ path: '/pages/blog/right/sidebar', title: 'right-sidebar', type: 'link' },
    // 		{ path: '/pages/blog/no/sidebar', title: 'no-sidebar', type: 'link' },
    // 		{ path: '/pages/blog/details', title: 'blog-details', type: 'link' }
    // 	]
    // }
  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
