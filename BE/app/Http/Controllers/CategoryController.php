<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\DB;
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

    public function getAllSub() {
        return response(SubCategory::all(), 200);
    }

    public function createSub(Request $request) {
        $data = $request->all();
        try {
            $createdCategory = SubCategory::create([
                'name' => $data['name'],
                'title' => $data['title'],
                'description' => $data['description'],
                'id_category' => $data['id_category'],
            ]);
            return response($createdCategory, 201);
        }catch(Exception $exc) {
            return response(['message' => 'category not created'], 500);
        }
    }

    public function updateSub(Request $request, $id) {
        $data = $request->all();
        $category = SubCategory::find($id);
        if (!isset($category)) return response(['message' => 'category not found'], 404);
        if (isset($data['name'])) $category->name = $data['name'];

        try {
            $category->save();
            return response($category, 200);
        } catch (Exception $exc) {
            return response(['message' => 'category not updated'], 500);
        }
    }

    public function deleteSub(Request $request, $id) {
        $subcategory = SubCategory::find($id);
        DB::table('products')->where('id_subcategory', '=', $subcategory->id)->update(['id_subcategory' => null]);
    
        try {
            $subcategory->delete();
            return response($subcategory, 200);
        } catch ( Exception $exc ) {
            return response(['message' => 'variation not deleted'], 500);
        }
    }


}
