<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AddressController extends Controller
{

    public function new( Request $request ) {
        $newData = $request->all();

        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
        $user = User::find($payload->user_id);
    }

    public function update( Request $request ) {
        $newData = $request->all();
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
        $user = User::find($payload->user_id);
    }
}
