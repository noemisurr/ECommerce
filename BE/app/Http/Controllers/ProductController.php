<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Variation;
use App\Models\VariationTag;
use App\Models\Tag;
use App\Models\Img;
use App\Models\Review;
use App\Models\Category;
use App\Models\CartItem;
use App\Models\Wishlist;
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
        $search = $request->query('search');

        if (isset($search)) {
            $search_terms = preg_split("/[^\p{L}]+/u", urldecode($search), null, PREG_SPLIT_NO_EMPTY);
        }

        $product = Product::with(['variations' => function ($q) use($search) {
            if (isset($search_terms)) {
                $q->whereHas('tags', function($q) use($search_terms) {
                    $q->whereHas('tag', function($q) use($search_terms) {
                        $q->whereIn('name', $search_terms);
                    });
                });   
            }
        }])->where('deleted', '=', false);

        if(!isset($skip) || !isset($take))  return response($product->get(), 200);

        if (isset($search_terms)) {
            $product->whereHas('variations', function($q) use($search_terms) {
                $q->whereHas('tags', function($q) use($search_terms) {
                    $q->whereHas('tag', function($q) use($search_terms) {
                        $q->whereIn('name', $search_terms);
                    });
                });
            });
        }

        $count = $product->count();
        
        $someProduct = $product
        ->skip($skip)
        ->take($take)->get();
        
        if(isset($sortBy) && $sortBy == 'asc'){
            $someProduct = $someProduct->sortBy(function($prod) use($obj) {
                return $prod['variations'][0][$obj];
            });
        }else if(isset($sortBy) && $sortBy == 'desc'){
            $someProduct = $someProduct->sortByDesc(function($prod) use($obj) {
                return $prod['variations'][0][$obj];
            });
        }
        return response(["products" => $someProduct->values(), "numberItems" => $count], 200);
    }

    public function getAllSpecial() {
        $all = Product::with('variations')->where('deleted', '=', false)->get();

        $onSale = array();
        $newArrivals = array();
        $bestSellers = array(); 
        foreach($all as $i=>$product){
            $isProduct = true;
            foreach($product->variations as $i=>$var) {
                if($isProduct && $var->id_discount){
                    
                    $isProduct = false;
                    array_push($onSale, $product);
                }
            }

            if($this->getDifference($product->created_at)) {
                array_push($newArrivals, $product);
            }

            if($product->star > 4) {
                
                array_push($bestSellers, $product);
            }
        }

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
                'brand' => $product['brand'],
                'material' => $product['material'],
                'size' => $product['size'],
                'other' => $product['other'],
                'deleted' => false,
                'id_category' => $product['id_category'],
            ]);
            
            foreach($variation as $var) {

                $createdVariation = Variation::create([
                    'name' => $var['name'],
                    'id_color' => $var['id_color'],
                    'id_product' => $createdProduct['id']
                ]);

                foreach($var['media'] as $img){
                    $createdImg = Img::create([
                        'url' => $img ? $img : 'https://angular.pixelstrap.com/multikart/assets/images/product/furniture/2.jpg',
                        'id_variation' => $createdVariation['id']
                    ]);
                };

                if(count($var['tag_names']) != 0){
                    foreach($var['tag_names'] as $tag){
                        $isTag = Tag::where('name', '=', $tag)->first();
                        if(!isset($isTag)) {
                            $isTag = Tag::create([
                                'name' => $tag ? $tag : 'Default'
                            ]);
                        }
                        $createdVariationTag = VariationTag::create([
                            'id_tag' => $isTag['id'],
                            'id_variation' => $createdVariation['id']
                        ]);
                    };
                }else{
                    $category = Category::find($product['id_category']);
                    $tagName = Tag::create([
                        'name' => $tag
                    ]);
                    $tagCategory = Tag::create([
                        'name' => $category['name']
                    ]);
                    VariationTag::create([
                        'id_tag' => $tagName['id'],
                        'id_variation' => $createdVariation['id']
                    ]);
                    VariationTag::create([
                        'id_tag' => $tagCategory['id'],
                        'id_variation' => $createdVariation['id']
                    ]);
                }
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

        $cartItem = CartItem::all();
        $wishList = Wishlist::all();

        if (!isset($product)) return response(['message' => 'product not found'], 404);
        if (isset($newProduct['name'])) $product->name = $newProduct['name'];
        if (isset($newProduct['short_description'])) $product->short_description = $newProduct['short_description'];
        if (isset($newProduct['long_description'])) $product->long_description = $newProduct['long_description'];
        if (isset($newProduct['price'])) $product->price = $newProduct['price'];
        if (isset($newProduct['deleted'])) $product->deleted = $newProduct['deleted'];
        if (isset($newProduct['created_at'])) $product->created_at = $newProduct['created_at'];
        if (isset($newProduct['id_category'])) $product->id_category = $newProduct['id_category'];

        $product->variations()->delete();
        $cartItem->each->delete();
        $wishList->each->delete();


        //Varianti
        $variation = $newProduct['variations'];

        foreach($variation as $var) {

            $createdVariation = Variation::create([
                'name' => $var['name'],
                'id_color' => $var['id_color'],
                'id_product' => $product['id']
            ]);

            foreach($var['media'] as $img){
                $createdImg = Img::create([
                    'url' => $img ? $img : 'https://angular.pixelstrap.com/multikart/assets/images/product/furniture/2.jpg',
                    'id_variation' => $createdVariation['id']
                ]);
            };


            foreach($var['tag_names'] as $tag){
                $isTag = Tag::where('name', '=', $tag)->first();
                if(!isset($isTag)) {
                    $isTag = Tag::create([
                        'name' => $tag ? $tag : 'Deafult'
                    ]);
                }
                $createdVariationTag = VariationTag::create([
                    'id_tag' => $isTag['id'],
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
