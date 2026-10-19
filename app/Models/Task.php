<?php

namespace App\Models;

use App\TaskStatusEnum;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'due_date',
        'status',
        'user_id',
    ];

    protected $casts = [
        'status' => TaskStatusEnum::class
    ];

}
