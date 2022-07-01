<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use App\Models\Product;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class WishlistController extends Controller
{
    public function getById(Request $request) {
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

        $wishItems = Wishlist::with('variation')->where('id_user', '=', $payload->user_id)->get();

        return response($wishItems, 201);
    }

    public function newWish(Request $request) {
        $wish = $request->all();
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
        try {
            $createdWish = Wishlist::create([
                'id_user' => $payload->user_id,
                'id_variation' => $wish['id_variation']
            ]);
        } catch( Exception $exc ) {
            return response(['message' => 'wish not created'], 500);
        }
        return response(Wishlist::with('variation')->where('id_user', '=', $payload->user_id)->get(), 201);
    }

    public function delete(Request $request, $id) {
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
        try {
            $toRemove = Wishlist::where('id_user', '=', $payload->user_id)->where('id_variation', '=', $id)->first();
            $toRemove->delete();
            return response($toRemove, 201);
        } catch( Exception $exc ) {
            return response(['message' => 'wish not deleted'], 500);
        }
    }

}
