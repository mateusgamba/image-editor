<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;

Route::get('/images', [ImageController::class, 'index']);
Route::post('/images', [ImageController::class, 'create']);