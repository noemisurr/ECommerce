<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('short_description');
            $table->longText('long_description');
            $table->integer('price');
            $table->string('brand')->nullable();
            $table->string('material')->nullable();
            $table->string('size')->nullable();
            $table->string('other')->nullable();
            $table->boolean('deleted');
            $table->timestamp('created_at')->nullable();
            $table->integer('id_category')->references('id')->on('product_category');
            $table->integer('id_subcategory')->references('id')->on('subcategory')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product');
    }
};
