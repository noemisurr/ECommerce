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
        Schema::create('settings_home', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('url');
            $table->string('alt')->nullable();
            $table->string('size')->nullable();
            $table->string('id_position')->references('id')->on('home_position');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
