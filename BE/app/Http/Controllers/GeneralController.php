<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Product;
use App\Models\Review;
use App\Models\Order;
use App\Models\CartItem;

class GeneralController extends Controller
{
    public function index() {

        $users = User::all();
        $products = Product::all();
        $reviews = Review::all();
        $orders = Order::all();

        return response(["users" => count($users), "products" =>count($products), "reviews" => count($reviews), "orders" => count($orders)], 200);
    }

    public function getAllCart() {
        $cart = CartItem::all();
        return response($cart, 200);
    }
}
