<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Variation;

class VariationController extends Controller
{
    public function getAll(Request $request, $id)
    {
        $variation = Variation::where('id_product', '=', $id)->get();
        return response($variation, 200);
    }

    public function create(Request $request, $id) {
        $data = $request->all();
        try {
            $createdVariation = Variation::create([
                'id_color' => $data['id_color'],
                'id_product' => $id,
                'id_discount' => $data['id_discount'],
            ]);
            return response($createdVariation, 201);
        } catch (Exception $exc) {
            return response(['message' => 'variation not created'], 500);
        }
    }

    public function update(Request $request, $id) {
        $data = $request->all();
        $variation = Variation::find($id);
        if (!isset($variation)) return response(['message' => 'variation not found'], 404);
        if (isset($data['id_color'])) $variation->id_color = $data['id_color'];
        if (isset($data['id_product'])) $variation->id_product = $data['id_product'];
        if (isset($data['id_discount'])) $variation->id_discount = $data['id_discount'];

        try {
            $variation->save();
            return response($variation, 200);
        } catch (Exception $exc) {
            return response(['message' => 'variation not updated'], 500);
        }
    }

    public function delete(Request $request, $id) {
        $variation = Variation::find($id);
        if(!isset($variation) || empty($variation)) return response(['message' => 'variation not found'], 404);

        try {
            $variation->delete();
            return response($variation, 200);
        } catch ( Exception $exc ) {
            return response(['message' => 'variation not deleted'], 500);
        }
    }
}
