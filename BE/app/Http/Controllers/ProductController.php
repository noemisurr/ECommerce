<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getAll()
    {
        return response(Product::all(), 200);
    }

    public function create(Request $request)
    {
        $data = $request->all();
        try {
            $createdProduct = Product::create([
                'name' => $data['name'],
                'short_description' => $data['short_description'],
                'long_description' => $data['long_description'],
                'price' => $data['price'],
                'id_category' => $data['id_category'],
            ]);
            return response($createdProduct, 201);
        } catch (Exception $exc) {
            return response(['message' => 'product not created'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $product = Product::find($id);
        if (!isset($product)) return response(['message' => 'product not found'], 404);
        if (isset($data['name'])) $product->name = $data['name'];
        if (isset($data['short_description'])) $product->short_description = $data['short_description'];
        if (isset($data['long_description'])) $product->long_description = $data['long_description'];
        if (isset($data['price'])) $product->price = $data['price'];
        if (isset($data['created_at'])) $product->created_at = $data['created_at'];
        if (isset($data['id_category'])) $product->id_category = $data['id_category'];

        try {
            $product->save();
            return response($product, 200);
        } catch (Exception $exc) {
            return response(['message' => 'product not updated'], 500);
        }
    }

    public function getById(Request $request, $id)
    {
        $product = Product::find($id);
        if (!isset($product) || empty($product)) return response(['message' => 'product not found'], 404);
        return response($product, 200);
    }
}
