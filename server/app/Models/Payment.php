<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_pembayaran';

    protected $fillable = ['method', 'status'];

    public function order()
    {
        return $this->hasOne(Order::class, 'id_pembayaran');
    }
}
