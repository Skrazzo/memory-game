<?php

namespace App\Models;

use Carbon\Carbon;
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

    // to every get, we added new time_diff column, and it calls getTimeDiffAttribute() function by default
    protected $appends = [
        'time_diff'
    ];

    // we can access data of the same row with $this, and do calculation for that specific row
    function getTimeDiffAttribute(){
        return $this->created_at->diffForHumans(now());
    }

    use HasFactory;
}
