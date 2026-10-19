<?php

namespace App;

enum TaskStatusEnum: string
{
    case PENDING = 'Pending';
    case PROGRESS = 'In Progress';
    case COMPLETED = 'Completed';
}
