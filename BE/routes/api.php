<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\VariationController;
use App\Http\Controllers\ImgController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\GeneralController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/auth')->group((function () {
    Route::post('/registration', [AuthController::class, 'registration']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/me', [AuthController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);
}));

Route::prefix('/backoffice')->group((function () {
    Route::get('/settings', [SettingsController::class, 'getContact']);
    Route::put('/settings/{setting_id}', [SettingsController::class, 'updateContact'])->whereNumber('setting_id');
    Route::get('/settings_home', [SettingsController::class, 'getMedia']);
    Route::post('/settings_home', [SettingsController::class, 'createMedia']);
    Route::put('/settings_home/{setting_id}', [SettingsController::class, 'updateMedia'])->whereNumber('setting_id');
    Route::delete('/settings_home/{setting_id}', [SettingsController::class, 'deleteMedia'])->whereNumber('setting_id');
    Route::get('/users', [SettingsController::class, 'getAllUsers']);
    Route::get('/discount', [DiscountController::class, 'getAll']);
    Route::post('/discount', [DiscountController::class, 'new']);
    Route::put('/discount/{id_discount}', [DiscountController::class, 'update'])->whereNumber('id_discount');
    Route::delete('/discount/{id_discount}', [DiscountController::class, 'delete'])->whereNumber('id_discount');
    Route::get('/general',[ GeneralController::class, 'index']);
    Route::get('/general/cart',[ GeneralController::class, 'getAllCart']);
}));

Route::prefix('/categories')->group((function() {
    Route::get('', [CategoryController::class, 'getAll']);
    Route::post('', [CategoryController::class, 'create']);
    Route::put('/{category_id}', [CategoryController::class, 'update'])->whereNumber('category_id');
}));

Route::prefix('/products')->group((function() {
    Route::get('', [ProductController::class, 'getAll']);
    Route::get('/special', [ProductController::class, 'getAllSpecial']);
    Route::post('', [ProductController::class, 'create']);
    Route::put('/{product_id}', [ProductController::class, 'update'])->whereNumber('product_id');
    Route::get('/{product_id}', [ProductController::class, 'getById'])->whereNumber('product_id');
    Route::delete('/{product_id}', [ProductController::class, 'delete'])->whereNumber('product_id');

    //Variation
    Route::post('/{product_id}', [VariationController::class, 'create'])->whereNumber('product_id');
    Route::get('/{product_id}/variations', [VariationController::class, 'getAll'])->whereNumber('product_id');
    Route::put('/variations/{variation_id}', [VariationController::class, 'update'])->whereNumber('variation_id');
    Route::delete('/variations/{variation_id}', [VariationController::class, 'delete'])->whereNumber('variation_id');

    //Review
    Route::get('/{product_id}/reviews', [ReviewController::class, 'getById'])->whereNumber('product_id');
    Route::post('/{product_id}/reviews', [ReviewController::class, 'create'])->whereNumber('product_id');

}));

Route::prefix('/colors')->group((function() {
    Route::get('', [ColorController::class, 'getAll']);
    Route::post('', [ColorController::class, 'create']);
    Route::put('/{color_id}', [ColorController::class, 'update'])->whereNumber('color_id');
}));

Route::prefix('/img')->group((function() {
    Route::post('', [ImgController::class, 'create']);
}));

Route::prefix('wishlist')->group((function() {
    Route::get('', [WishlistController::class, 'getById']);
    Route::post('', [WishlistController::class, 'newWish']);
    Route::delete('/{variation_id}', [WishlistController::class, 'delete'])->whereNumber('variation_id');
}));

Route::prefix('cart')->group((function() {  
    Route::get('', [CartController::class, 'getAll']);
    Route::post('', [CartController::class, 'addItem']);
    Route::delete('', [CartController::class, 'empty']); 

    Route::put('/{cart_item_id}', [CartController::class, 'update'])->whereNumber('cart_item_id');
    Route::delete('/{cart_item_id}', [CartController::class, 'delete'])->whereNumber('cart_item_id');
}));

Route::prefix('address')->group((function () {
    Route::post('', [AddressController::class, 'new']);
    Route::put('', [AddressController::class, 'update']);
}));

Route::prefix('cards')->group((function () {
    Route::post('', [CardController::class, 'new']);
}));

Route::prefix('order')->group((function() {
    Route::post('', [OrderController::class, 'new']);
    Route::get('', [OrderController::class, 'getAll']);
    Route::get('/me', [OrderController::class, 'getByUser']);
    Route::get('/{order_id}', [OrderController::class, 'getById'])->whereNumber('order_id');
    Route::put('/{order_id}', [OrderController::class, 'update'])->whereNumber('order_id');
}));

