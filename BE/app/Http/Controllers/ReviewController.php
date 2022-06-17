<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ReviewController extends Controller
{
    public function getById(Request $request, $id) {
        $reviews = Review::with('user')->where('id_product', '=', $id)->get();
        return response($reviews, 200);
    }

    public function create(Request $request, $id) {
        $data = $request->all();
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

        try{
            $new = Review::create([
                'title' => $data['title'],
                'text' => $data['text'],
                'star' => $data['star'],
                'id_user' => $payload->user_id,
                'id_product' => $data['id_product']
            ]);
        } catch ( Exception $exc ) {
            return response(['message' => 'review not created', 'eccezione'=> $exc], 500);
        }

        return response( $new, 201);
    }
}
