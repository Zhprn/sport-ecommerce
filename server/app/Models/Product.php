<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_product';

    protected $fillable = ['nama_product', 'harga_produk', 'rating_produk', 'id_category'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'id_product');
    }
}
