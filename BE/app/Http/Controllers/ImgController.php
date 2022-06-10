<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Img;

class ImgController extends Controller
{
    public function create(Request $request) {
        $data = $request->all();
        try{
            $createdImg = Img::create([
                'url' => $data['url'],
                'description' => $data['description'],
                'id_variation' => $data['id_variation'],
            ]);
            return response($createdImg, 201);
        } catch (Exception $exc) {
            return response(['message' => 'img not created'], 500);
        }
    }
}
