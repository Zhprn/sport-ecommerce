<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_order';

    protected $fillable = ['id_user', 'id_product', 'id_pembayaran', 'total_harga', 'alamat', 'catatan'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product');
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class, 'id_pembayaran');
    }
}
