<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\Product;
use App\Models\CartItem;

class CartController extends Controller
{
    public function getAll(Request $request) {
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

        $cart = Cart::where('id_user', '=', $payload->user_id)->get();

        return response($cart, 201);
    }

    public function add(Request $request) {
        $data = $request->all();
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

        $cart = Cart::find($payload->user_id);
        $variation = $data['variations'];
        if(!isset($cart)) {
            $cart = Cart::create([
                'total' => 0,
                'id_user' => $payload->user_id
            ]);
        }
        $cartItem = CartItem::create([
            'quantity' => $data['quantity'],
            'id_cart' => $cart->id,
            'id_variation' => $variation[0]['id']
        ]);

        $cart->total += Product::find($variation[0]['id_product'])->pluck('price')->avg();

        return response($cart, 201);
    }
}
