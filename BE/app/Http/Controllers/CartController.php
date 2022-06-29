<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\Product;
use App\Models\CartItem;

class CartController extends Controller
{
    public function getAll(Request $request) {
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

        try{

            $cart = CartItem::where('id_user', '=', $payload->user_id)->get();
            if(count($cart) == 0){
                return response(['message' => 'cart does not exist'], 400);
            }
        }catch (Exception $exc){
            return response(['message' => 'something goes wrong', 'exc' => $exc], 500);
        }
            
        return response($cart, 201);
    }


    public function addItem(Request $request) {
        $cartItems = $request->all();
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));


        foreach($cartItems as $data) {

            $variation = $data['variation'];
            $cart = CartItem::where('id_user', '=', $payload->user_id)->where('id_variation', $variation['id'])->first();

            if(isset($cart)){
                $cart['quantity'] += 1;
                $cart->save();
                
                return response(CartItem::where('id_user', '=', $payload->user_id)->get(), 201);
            }

            $cartItem = CartItem::create([
                'quantity' => $data['quantity'],
                'id_variation' => $variation['id'],
                'id_user' => $payload->user_id
            ]);
        }

        return response(CartItem::where('id_user', '=', $payload->user_id)->get(), 201);
    }

    public function update(Request $request, $id) {
        $data = $request->all();
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

        $item = CartItem::find($id);
        if (!isset($item)) return response(['message' => 'item not found'], 404);
        if (isset($data['quantity'])) $item->quantity = $data['quantity'];

        try {
            $item->save();
            
            return response(CartItem::where('id_user', '=', $payload->user_id)->get(), 200);
        } catch (Exception $exc) {
            return response(['message' => 'item not updated'], 500);
        }
    }

    public function delete(Request $request, $id) {
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
        $item = CartItem::find($id);
        if(!isset($item) || empty($item)) return response(['message' => 'item not found'], 404);

        try {
            $item->delete();
            return response(CartItem::where('id_user', '=', $payload->user_id)->get(), 200);
        } catch ( Exception $exc ) {
            return response(['message' => 'item not deleted'], 500);
        }
    }

    public function empty(Request $request) {
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

        $cartItems = CartItem::where('id_user', '=', $payload->user_id)->get();
        try{
            $cartItems->each->delete();

        } catch ( Exception $exc ) {
            return response(['message' => 'cart not empty'], 500);
        }

        return response(200);
    }
}
