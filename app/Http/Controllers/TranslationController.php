<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TranslationController extends Controller
{
    //


    public function translation()
    {
        return $this->hasOne(Word::class, 'id', 'translation_id');
    }
}
