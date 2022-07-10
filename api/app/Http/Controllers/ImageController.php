<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
  public function index()
  {
    $files = Storage::disk('s3')->files('editor');
    $filesSerialized = array_map(function ($file) {
      return [
        'file' => $file,
        'url' =>  Storage::disk('s3')->url($file)
      ];
    }, $files);
    return response()->json($filesSerialized);
  }

  public function create(Request $request)
  {
    $file = $request->file('file');

    $file->storePublicly(
      'editor/', 's3'
    );
    $name = $file->hashName();

    return response()->json([
      'file' => $name,
      'url' =>  Storage::url('editor/'.$name)
    ]);
  }
}