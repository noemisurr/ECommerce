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
        Schema::create('review', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('text');
            $table->string('star');
            $table->timestamp('created_at');
            $table->string('id_user')->references('id')->on('user');
            $table->string('id_product')->references('id')->on('product');
            $table->string('id_discount')->references('id')->on('discount');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('review');
    }
};
