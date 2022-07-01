<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Address;
use DateInterval;
use DateTime;
use DateTimeZone;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
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
            $new = User::create([
                'name' => $data['name'],
                'surname' => $data['surname'],
                'email' => $data['email'],
                'password' => md5($data['password']),
                'telephone' => $data['telephone'],
                'birth' => $data['birth'],
                'id_user_type' => $data['id_user_type'],                
                'jwt' => ''
            ]);
        } catch ( Exception $exc ) {
            return response(['message' => 'user not created', 'eccezione'=> $exc], 500);
        }
        return response(['user' => $new], 201);
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
        
        return response($user, 200);
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
            "exp" => $date_now->add(new DateInterval('P1Y'))->getTimestamp(),
            "user_id" => $user_id
        );
    }

    public function me( Request $request ) {
        try {
            $token = $request->bearerToken();
            $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
            $user = User::find($payload->user_id);
        }catch( Exception $exc ) {
           return response(['message' => 'user not found'], 401);
        }
        return response(User::where('id', $user['id'])->first()->toArray(), 200);
    }

    public function logout( Request $request ) {
        $loggedUser = resolve(User::class);

        $loggedUser->jwt = '/';
        
        return response(['message' => 'user logging out'], 200);
    }

    public function update( Request $request ) {
        $newData = $request->all();
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
        $user = User::find($payload->user_id);

        if (!isset($user)) return response(['message' => 'user not found'], 404);

        if (isset($newData['name'])) $user->name = $newData['name'];
        if (isset($newData['surname'])) $user->surname = $newData['surname'];
        if (isset($newData['email'])) $user->email = $newData['email'];
        if (isset($newData['telephone'])) $user->telephone = $newData['telephone'];
        if (isset($newData['birth'])) $user->birth = $newData['birth'];

        Address::where('id_user', '=', $user['id'])->delete();

        $addresses = $newData['address'];

        foreach($addresses as $address) {
            Address::create([
                'flat' => $address['flat'],
                'address' => $address['address'],
                'city' => $address['city'],
                'cap' => $address['cap'],
                'region' => $address['region'],
                'other' => $address['other'],
                'default' => $address['default'],
                'id_user' => $user['id']
            ]);
        };

        try {
            $user->save();
            return response(User::where('id', $user['id'])->first()->toArray(), 200);
        } catch (Exception $exc) {
            return response(['message' => 'user not updated'], 500);
        }
    }
}