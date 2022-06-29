<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Discount;
use App\Models\Variation;

class DiscountController extends Controller
{
    public function getAll() {
        $discount = Discount::all();

        return response($discount, 200);
    }

    public function new(Request $request) {
        $data = $request->all();

        $newDiscount = Discount::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'value' => $data['value'],
            'active' => $data['active']
        ]);

        return response($newDiscount, 200);
    }

    public function update(Request $request, $id) {
        $newData = $request->all();

        $discount = Discount::find($id);

        if (isset($newData['name'])) $discount->name = $newData['name'];
        if (isset($newData['description'])) $discount->description = $newData['description'];
        if (isset($newData['value'])) $discount->value = $newData['value'];
        if (isset($newData['active'])) $discount->active = $newData['active'];

        $discount->save();

        return response($discount, 200);
    }

    public function delete(Request $request, $id) {
        $discount = Discount::find($id);

        if(isset($discount)){
            
            $var = Variation::where('id_discount', $id)->update(['id_discount' => null]);
            $discount->delete();
            return response($discount, 200);
        }
        return response(['message' => 'discount not found'], 400);

    }


}
