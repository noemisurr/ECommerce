<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Variation;
use App\Models\VariationTag;
use App\Models\Tag;
use App\Models\Img;
use App\Models\Review;
use Exception;
use Illuminate\Http\Request;
use DateTime;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use Illuminate\Database\Eloquent\Model;

class ProductController extends Controller
{
    public function getAll(Request $request)
    {
        $skip = $request->query('skip');
        $take = $request->query('take');
        $obj = $request->query('obj');
        $sortBy = $request->query('sortBy');
        $product = Product::with('variations')->where('deleted', '=', false);
        if(!isset($skip) || !isset($take))  return response($product->get(), 200);

        $someProduct = $product
                        ->skip($skip)
                        ->take($take)
                        ->orderBy($obj ? $obj : 'name', $sortBy ? $sortBy : 'asc') // TODO: NON FUNZIONA CON PRICE PERCHè è UNA STRINGA
                        ->get();
        return response($someProduct, 200);
    }

    public function getAllSpecial() {
        $all = Product::with('variations')->where('deleted', '=', false)->get();

        $onSale = array();
        $newArrivals = array();
        $bestSellers = array(); 
        foreach($all as $i=>$product){
            foreach($product->variations as $i=>$var) {
                if($var->id_discount){
                    array_push($onSale, $product);
                    break;
                }
            }

            if($this->getDifference($product->created_at)) {
                array_push($newArrivals, $product);
            }

            if($product->star > 4) {
                
                array_push($bestSellers, $product);
            }
        }
        // return response($onSale, 200);

        return response(["sale" => $onSale, "new" => $newArrivals, "best" => $bestSellers], 200);


    }

    public function create(Request $request)
    {
        $product = $request->all();
        $variation = $product['variations'];
        try {
            $createdProduct = Product::create([
                'name' => $product['name'],
                'short_description' => $product['short_description'],
                'long_description' => $product['long_description'],
                'price' => $product['price'],
                'deleted' => false,
                'id_category' => $product['id_category'],
            ]);
            
            foreach($variation as $var) {

                $createdVariation = Variation::create([
                    'id_color' => $var['id_color'],
                    'id_product' => $createdProduct['id']
                ]);

                foreach($var['media'] as $img){
                    $createdImg = Img::create([
                        'url' => $img,
                        'id_variation' => $createdVariation['id']
                    ]);
                };

                foreach($var['tag'] as $tag){
                    $createdTag = Tag::create([
                        'name' => $tag
                    ]);
                    $createdVariationTag = VariationTag::create([
                        'id_tag' => $createdTag['id'],
                        'id_variation' => $createdVariation['id']
                    ]);
                };
            };
            return response(["product" => Product::with('variations')->where('id', $createdProduct['id'])->first()->toArray()], 201);
        } catch (Exception $exc) {
            return response(['message' => 'product not created'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $newProduct = $request->all();
        $product = Product::find($id);

        if (!isset($product)) return response(['message' => 'product not found'], 404);
        if (isset($newProduct['name'])) $product->name = $newProduct['name'];
        if (isset($newProduct['short_description'])) $product->short_description = $newProduct['short_description'];
        if (isset($newProduct['long_description'])) $product->long_description = $newProduct['long_description'];
        if (isset($newProduct['price'])) $product->price = $newProduct['price'];
        if (isset($newProduct['deleted'])) $product->deleted = $newProduct['deleted'];
        if (isset($newProduct['created_at'])) $product->created_at = $newProduct['created_at'];
        if (isset($newProduct['id_category'])) $product->id_category = $newProduct['id_category'];

        $product->variations()->delete();

        //Varianti
        $variation = $newProduct['variations'];

        foreach($variation as $var) {

            $createdVariation = Variation::create([
                'id_color' => $var['id_color'],
                'id_product' => $product['id']
            ]);

            foreach($var['media'] as $img){
                $createdImg = Img::create([
                    'url' => $img,
                    'id_variation' => $createdVariation['id']
                ]);
            };

            foreach($var['tag'] as $tag){
                $createdTag = Tag::create([
                    'name' => $tag
                ]);
                $createdVariationTag = VariationTag::create([
                    'id_tag' => $createdTag['id'],
                    'id_variation' => $createdVariation['id']
                ]);
            };
        };

        try {
            $product->save();
            return response(Product::with('variations')->where('id', $product['id'])->first()->toArray(), 200);
        } catch (Exception $exc) {
            return response(['message' => 'product not updated'], 500);
        }
    }

    public function getById(Request $request, $id)
    {
        $product = Product::find($id);
        if (!isset($product) || empty($product)) return response(['message' => 'product not found'], 404);
        return response(Product::with('variations')->where('id', $product['id'])->first()->toArray(), 200);
    }

    public function delete(Request $request, $id) {
        $product = Product::find($id);
        if (!isset($product)) return response(['message' => 'product not found'], 404);
        $product->deleted = true;
        return response($product, 200);
    }

    private function getDifference($created_at) {
        $hours = $created_at->diffInHours();

        if($hours > 168) return false;
        return true;
    }
}
