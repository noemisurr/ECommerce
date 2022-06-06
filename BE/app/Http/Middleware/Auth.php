<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use DateTime;
use Illuminate\Http\Request;

class Auth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        if( !isset($token) || empty($token) ) return response(["message" => "Unauthorized"], 401);
        $payload = json_decode(base64_decode(explode('.', $token)[1]), true);
        $user = User::find($payload['user_id']);
        //controlliamo se il token dentro user = token passato nell'header
        if($user->jwt != $token) return response(["message" => "Unauthorized"], 401);
        //controlliamo se è scaduto
        if( $payload['exp'] <= (new DateTime())->getTimestamp() ) return response(["message" => "Unauthorized"], 401);
        // registrazione istanza utente loggato
        app()->instance(User::class, $user);
        return $next($request);
    }
}
