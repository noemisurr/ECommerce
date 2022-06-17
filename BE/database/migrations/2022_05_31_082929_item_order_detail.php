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
        Schema::create('item_order_detail', function (Blueprint $table) {
            $table->id();
            $table->integer('quantity');
            $table->integer('id_variation')->references('id')->on('variation');
            $table->integer('id_order_detail')->references('id')->on('order_detail');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_order_detail');
    }
};
