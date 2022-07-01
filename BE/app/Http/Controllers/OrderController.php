<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\Order;
use App\Models\CartItem;
use App\Models\OrderItem;
use App\Models\Payment;
use Exception;
use Carbon\Carbon;

class OrderController extends Controller
{
    public function new( Request $request ) {
        $data = $request->all();
        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

        $shipping_date = Carbon::now()->addWeek();
        
            $newOrder = Order::create([
                'total' => $data['total'],
                'delivery_date' => $shipping_date,
                'shipping_date' => null,
                'shipping_code' => null,
                'id_user' => $payload->user_id,
                'id_address' => $data['id_address']
            ]);

            $cartItems = CartItem::where('id_user', '=', $payload->user_id)->get();

            foreach($cartItems as $item ) {
                OrderItem::create([
                    'quantity' => $item['quantity'],
                    'id_variation' => $item['id_variation'],
                    'id_order_detail' => $newOrder['id'],
                    'id_discount' => $item['variation']['discount']
                ]);
            }

            Payment::create([
                'total' => $data['total'],
                'id_user' => $payload->user_id,
                'id_card' => $data['id_card'],
                'id_order' => $newOrder['id']
            ]);
        
            // return response(['message' => 'order not created', 'eccezione', $exc], 500);
        

        return response($newOrder, 200);

    }

    public function getById( Request $request, $id ) {
        $order = Order::with('user')->where('id', $id)->get()->pop();
        return response($order, 200);
    }

    public function getAll() {
        $orders = Order::with('user')->get();
        return response($orders, 200);
    }

    public function getByUser(Request $request) {

        $token = $request->bearerToken();
        $payload = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

        $order = Order::where('id_user', '=', $payload->user_id)->get();
        return response($order, 200);
    }

    public function update( Request $request, $id ) {

        $newData = $request->all();
        $order = Order::find($id);

        if (!isset($order)) return response(['message' => 'user not found'], 404);

        if (isset($newData['total'])) $order->total = $newData['total'];
        if (isset($newData['delivery_date'])) $order->delivery_date = $newData['delivery_date'];
        if (isset($newData['shipping_date'])) $order->shipping_date = $newData['shipping_date'];
        if (isset($newData['shipping_code'])) $order->shipping_code = $newData['shipping_code'];

        try {
            $order->save();
            return response(Order::with('user')->where('id', $id)->get()->pop(), 200);
        } catch (Exception $exc) {
            return response(['message' => 'order not updated'], 500);
        }
        
    }
}
