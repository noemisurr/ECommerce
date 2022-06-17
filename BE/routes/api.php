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

//TODO: contatore per il numero di utenti (al mese)
//TODO: contatore per il numero di prodotti (nuovi al mese)
//TODO: contatore per il numero di recensioni (al mese)
//TODO: contatore per il numero di ordini (al mese)

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/auth')->group((function () {
    Route::post('/registration', [AuthController::class, 'registration']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/me', [AuthController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);
}));

//TODO: gestire la sessione in modo che ognuna di queste chiamate abbia bisogno dell'authorization

Route::prefix('/backoffice')->group((function () {
    Route::get('/settings', [SettingsController::class, 'getContact']);
    Route::put('/settings/{setting_id}', [SettingsController::class, 'updateContact'])->whereNumber('setting_id');
    Route::get('/settings_home', [SettingsController::class, 'getMedia']);
    Route::post('/settings_home', [SettingsController::class, 'createMedia']);
    Route::put('/settings_home/{setting_id}', [SettingsController::class, 'updateMedia'])->whereNumber('setting_id');
    Route::delete('/settings_home/{setting_id}', [SettingsController::class, 'deleteMedia'])->whereNumber('setting_id');
    Route::get('/users', [SettingsController::class, 'getAllUsers']);
}));

Route::prefix('/categories')->group((function() {
    Route::get('', [CategoryController::class, 'getAll']);
    Route::post('', [CategoryController::class, 'create']);
    Route::put('/{category_id}', [CategoryController::class, 'update'])->whereNumber('category_id');
    //TODO: delete?
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

Route::prefix('cart_item')->group((function() {
    Route::get('', [CartController::class, 'getAll']);
    Route::post('', [CartController::class, 'add']);
}));
