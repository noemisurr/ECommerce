<?php

namespace App\Http\Controllers;

use App\Models\User;
use DateInterval;
use DateTime;
use DateTimeZone;
use Exception;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function registration( Request $request )
    {
        $data = $request->all();
        //controllo che l'utente esista
        $user = User::where('email', '=', $data['email'])->first();
        if( $user != null ) return response(['message' => 'user already exist'], 401);

        try{
            User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => md5($data['password']),
                'jwt' => ''
            ]);
        } catch ( Exception $exc ) {
            return response(['message' => 'user not created'], 500);
        }
        return $this->login($request);
    }

    public function login( Request $request )
    {
        $data = $request->all();
        // prendiamo l'utente dal database
        $user = User::where('email', '=', $data['email'])->first();
        // controllo che l'utente esista e che la password sia corretta
        if ( !isset($user) || md5($data['password']) !== $user->password ) return response(['message' => 'wrong credentials'], 401);
        // generiamo un token
        $jwt = JWT::encode($this->_generateTokenPayload($user->id), $_ENV['JWT_SECRET'], 'HS256');
        $user->jwt = $jwt;
        $user->save();
        return response(['token' => $jwt], 200);
    }

    /**
     * Generate the JWT Payload
     * @return array - JWT Payload
     */
    private function _generateTokenPayload($user_id)
    {
        $date_now = new DateTime('NOW', new DateTimeZone('Europe/Rome'));
        return array(
            "iss" => "http://example.org",
            "aud" => "http://example.org",
            "iat" => $date_now->getTimestamp(),
            "nbf" => $date_now->getTimestamp(),
            "exp" => $date_now->add(new DateInterval('PT60M'))->getTimestamp(),
            "user_id" => $user_id
        );
    }
}