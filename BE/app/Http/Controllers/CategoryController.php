<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Exception;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getAll() {
        return response(Category::all(), 200);
    }

    public function create(Request $request) {
        $data = $request->all();
        try {
            $createdCategory = Category::create([
                'name' => $data['name'],
            ]);
            return response($createdCategory, 201);
        }catch(Exception $exc) {
            return response(['message' => 'category not created'], 500);
        }
    }

    public function update(Request $request, $id) {
        $data = $request->all();
        $category = Category::find($id);
        if (!isset($category)) return response(['message' => 'category not found'], 404);
        if (isset($data['name'])) $category->name = $data['name'];

        try {
            $category->save();
            return response($category, 200);
        } catch (Exception $exc) {
            return response(['message' => 'category not updated'], 500);
        }
    }
}
