<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id('id_order');
            $table->foreignId('id_user')
                  ->constrained('users', 'id_user')
                  ->cascadeOnUpdate()
                  ->cascadeOnDelete();
            $table->foreignId('id_product')
                  ->constrained('products', 'id_product')
                  ->cascadeOnUpdate()
                  ->cascadeOnDelete();
            $table->foreignId('id_pembayaran')
                  ->unique()
                  ->constrained('payments', 'id_pembayaran')
                  ->cascadeOnUpdate()
                  ->cascadeOnDelete();
            $table->integer('total_harga');
            $table->string('alamat');
            $table->string('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
