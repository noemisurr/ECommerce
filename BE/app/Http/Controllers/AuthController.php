<?php

namespace App\Http\Controllers;

use App\Models\User;
use DateInterval;
use DateTime;
use DateTimeZone;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function registation( Request $request ) {
        $data = $request->all();
        // prendiamo l'utente dal database
        $user = User::where('email', '=', $data['email']->first());
        // controllo che l'utente esista e che la password sia corretta
        // TODO: forse bisognerà dare decode della password
        if( !isset($user) || $data['password'] !== $user->password ) return response(['message' => 'wrong credentials'], 401);
        //generiamo un token  
        //$jwt = JWT::encode($this->_generateTokenPayload($user->id), $_ENV['JWT_SECRET'], 'HS256',);   
    }

    /**
     * Generate the JWT Payload
     * @return string - JWT Payload
     */
    private function _generateTokenPayload($user_id)
    {
        $date_now = new DateTime('NOW', new DateTimeZone('Europe/Rome'));
        return array(
            "iss" => "",
            "aud" => "",
            "iat" => $date_now->getTimestamp(),
            "nbf" => $date_now->getTimestamp(),
            "exp" => $date_now->add(new DateInterval('PT60M'))->getTimestamp(),
            "user_id" => $user_id
        );
    }
}