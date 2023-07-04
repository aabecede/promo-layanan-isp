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
        Schema::table('customer', function (Blueprint $table) {
            $table->longText('ktp_image')->nullable()->comment('Terisi ketika closing');
            $table->longText('ktp_nama')->nullable()->comment('Terisi ketika closing');
            $table->longText('ktp_nik')->nullable()->comment('Terisi ketika closing');
            $table->longText('ktp_address')->nullable()->comment('Terisi ketika closing');
            $table->integer('package_id')->nullable()->comment('Terisi ketika closing');
            $table->integer('promo_id')->nullable()->comment('Terisi ketika closing');
            $table->longText('rumah_foto')->nullable()->comment('Terisi ketika closing');
            $table->longText('rumah_address')->nullable()->comment('Terisi ketika closing');
            $table->longText('rumah_lat')->nullable()->comment('Terisi ketika closing');
            $table->longText('rumah_long')->nullable()->comment('Terisi ketika closing');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('customer', function (Blueprint $table) {
            $table->dropColumn([
                'ktp_image',
                'ktp_nama',
                'ktp_nik',
                'ktp_address',
                'package_id',
                'promo_id',
                'rumah_foto',
                'rumah_address',
                'rumah_lat',
                'rumah_long',
            ]);
        });
    }
};
