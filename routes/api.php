<?php

use App\Models\translation;
use App\Models\word;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/word', function (Request $request) {

    // 20% chances for a new word
    // 35 % chances for a word from red list
    // 30 % chances for a word from yellow list
    // 10 % chances for a word from  green list
    // 5 % chances for a word from the blue list

    $word = Word::select('id', 'word', 'frequency')->where('lang', 'de')->inRandomOrder()->limit(1)->get();
    $translation = Word::select('word as translation')->where('id', Translation::where('word_id', $word[0]->id)->get()[0]['translation_id'])->get();
    $uid =  $id = Auth::user()->id;
    $status = "";

    echo "test";
//    if ( $uid !== null ) {
        $status = Status::where([['user', '=', $uid], 'word_id', '=', $word[0]->id]);
//    }

    echo $word;
    echo $translation;
    echo $status;


    // check if user has over 100 words picked
    // app must learn proportions of user's vocabulary matching the frequency

});