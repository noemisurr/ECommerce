<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\Card;
use Exception;

class CardController extends Controller
{

    public function new(Request $request) {
        $data = $request->all();
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

        try {
            $card = Card::create([
                'owner' => $data['owner'],
                'number' => $data['number'],
                'expiry' => $data['expiry'],
                'cvc' => $data['cvc'],
                'default' => $data['default'],
                'id_user' => $payload->user_id
            ]);
        } catch (Exception $exc) {
            return response(['message' => 'card not created'], 500);
        }

        return response($card, 201);
    }
}
