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
        Schema::create('order_detail', function (Blueprint $table) {
            $table->id();
            $table->string('total'); //price
            $table->date('delivery_date'); // data consegna prevista
            $table->date('shipping_date')->nullable(); // data effettiva di spedizione
            $table->string('shipping_code')->nullable(); // codice di spedizione
            $table->string('id_user')->references('id')->on('user');
            $table->string('id_payment')->references('id')->on('payment');
            $table->string('id_address')->references('id')->on('address');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_detail');
    }
};
