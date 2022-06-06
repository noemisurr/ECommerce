<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SettingsController;
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
    //TODO: aggiungere nell'header l'authorization
}));

Route::prefix('/categories')->group((function() {
    Route::get('', [CategoryController::class, 'getAll']);
    Route::post('', [CategoryController::class, 'create']);
    Route::put('/{category_id}', [CategoryController::class, 'update'])->whereNumber('category_id');
}));

Route::prefix('/products')->group((function() {
    Route::get('', [ProductController::class, 'getAll']);
    Route::post('', [ProductController::class, 'create']);
    Route::put('/{product_id}', [ProductController::class, 'update'])->whereNumber('product_id');
    Route::get('/{product_id}', [ProductController::class, 'getById'])->whereNumber('product_id');
    
}));

