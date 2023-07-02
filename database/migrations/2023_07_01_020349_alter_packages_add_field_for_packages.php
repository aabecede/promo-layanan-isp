<?php

use Illuminate\Database\Eloquent\Scope;
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
        Schema::table('packages', function (Blueprint $table) {
            $table->float('bandwith', 20, 4);
            $table->string('kuota', 20);
            $table->float('satuan_kuota', 20, 4);
            $table->float('upload_download', 20, 4);
            $table->float('satuan_upload_download', 20, 4);
            $table->string('dynamic',20);
            $table->string('modem',20);
            $table->string('tv_chanel',20);
            $table->string('jumlah_perangkat',20);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->dropColumn([
                'bandwith',
                'kuota',
                'satuan_kuota',
                'upload_download',
                'satuan_upload_download',
                'dynamic',
                'modem',
                'tv_chanel',
                'jumlah_perangkat',
            ]);
        });
    }
};
