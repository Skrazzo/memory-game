<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    protected $fillable = [
        'points',
        'level'
    ];
    
    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i',
    ];

    use HasFactory;
}
