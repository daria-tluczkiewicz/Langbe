<?php

use App\Models\status;
use App\Models\translation;
use App\Models\word;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use GuzzleHttp\Client;
use App\Http\Controllers\WordController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('import', function () {
    return view('import');
});



//Route::post('/collection', [App\Http\Controllers\ExerciseCollectionController::class, 'store']);
//Route::get('/collection', [App\Http\Controllers\ExerciseCollectionController::class, 'get']);
//Route::post('/collection/update/{collection}', [App\Http\Controllers\ExerciseCollectionController::class, 'update']);
//

Route::put('/word/sentence/{id}', [WordController::class, 'updateSentence']);



Route::put('/status/{word_id}/{level}', function ($word_id, $level, Request $request) {

    // Assuming you're using Laravel's authentication system
    $user_id = auth()->id(); // This will get the user_id of the currently logged-in user


    $status = Status::where('word_id', $word_id)
    ->where('user_id', $user_id)
    ->first();

    if (!$status) {
        // Case 1: Record doesn't exist, create a new one
        $status = new Status;
        $status->user_id = $user_id;
        $status->word_id = $word_id;
    }

    $status->level = $level;
    $status->save();

    return response()->json(['message' => 'Status updated successfully']);
});



Route::get('/word/{max}', function ($max = 10000, Request $request) {

    // 0-35 % chances for a word from red list
    // 35-65 % chances for a word from yellow list
    // 65-80% chances for a new word
    // 80-95 % chances for a word from  green list
    // 95-100 % chances for a word from the blue list

    $the_max = (int) $max;

    $random = rand(0, 100);
//    echo $random;
    $pick = "";

    if ( $random <= 35 ) { $pick = "d"; }
    else if ( $random <= 65) { $pick = "c"; }
    else if ( $random <= 80 ) { $pick = false; }
    else if ( $random <= 95 ) { $pick = "b"; }
    else { $pick = "a"; }

//    echo "Preferred::: " . $pick;

    $word = Word::select('id', 'word', 'frequency', 'audio', 'warning','sentence')->where('lang', 'de')->where('frequency', '<', $the_max)->inRandomOrder()->limit(1000)->get();
    $pw = 0;

    $uid = Auth::id();

    $status = "";

    foreach ( $word as $index => $wo ) {

        if ($uid!==null) {
            $status = Status::select('id as status_id', 'level')->where([['user_id', $uid], ['word_id', $wo->id]])->get();
            if ( !$pick && !isset($status[0]) ) {
                $pw = $index;
                break;
            } else if ( isset($status[0]) && $pick == $status[0]->level ) {
                $pw = $index;
                break;
            }
        } else {
            break;
        }



    }

    
        if (strlen($word[$pw]->audio) == 0) {
            $response = makeApiRequest($word[$pw]->word);
            $filename = $response['data']['fileStatus'][0]['fileId'];
        
            sleep(1);
            $audio = testDownload($filename);
            $word[$pw]->audio = $audio;
            $word[$pw]->save();
        }
        




    $translation = Word::select('word as translation')->where('id', Translation::where('word_id', $word[$pw]->id)->get()[0]['translation_id'])->get();

        $freq = 'e';
        if ($word[$pw]->frequency > 0) {
            $freq = $word[$pw]->frequency;
        }

    $return = (object) array(
        'word_id' => $word[$pw]->id,
        'word' => $word[$pw]->word,
        'audio' => $word[$pw]->audio,
        'warning' => $word[$pw]->warning,
        'sentence' => $word[$pw]->sentence,
        'frequency' => $freq,
        'translation' => $translation[0]->translation,
        'user_id' => ( $uid !== null ) ? $uid : false,
        'status_id' => ( isset($status[0]) ) ? $status[0]->status_id : false,
        'level' => ( isset($status[0]) ) ? $status[0]->level : 'e',
    );

    return $return;
});

Route::get('/status/{word_id}',  function ($word_id, Request $request) {
    $status = Status::where('word_id', $word_id)
    ->first();


    return $status;
});

// Route::post('/status', [App\Http\Controllers\StatusController::class, 'update']);

Route::get('stats', function () {
    $user_id = auth()->id();

    $stat = [
        'a' => Status::where('user_id', $user_id)
        ->where('level', 'a')
        ->count(),
        'b' => Status::where('user_id', $user_id)
        ->where('level', 'b')
        ->count(),
        'c' => Status::where('user_id', $user_id)
        ->where('level', 'c')
        ->count(),
        'd' => Status::where('user_id', $user_id)
        ->where('level', 'd')
        ->count()
    ];

    return $stat;
});

Route::post('importer', [App\Http\Controllers\WordController::class, 'importer']);


Route::get('/check-auth', function () {
    if (auth()->check()) {
        // User is logged in
        return response()->json(['loggedIn' => true]);
    } else {
        // User is not logged in
        return response()->json(['loggedIn' => false]);
    }
});

Route::get('/test', function () {


    $words = Word::select('id', 'word', 'frequency', 'audio', 'warning')->where('lang', 'de')->where('frequency', '>', 2000)->where('frequency', '<', 5000)->inRandomOrder()->limit(2000)->get();

    $added = [];


    foreach ( $words as $word ) {
        if (strlen($word->audio) == 0) {
            $response = makeApiRequest($word->word);
            $filename = $response['data']['fileStatus'][0]['fileId'];
        
            sleep(1);
            $audio = testDownload($filename);
            $word->audio = $audio;
            $word->save();

            array_push($added, $word);
        }
    }

    return $added;
        

});

Route::get('/word/warning/{id}', function($id, Request $request) {
    $word = Word::find($id);

    if ($word) {
        // Update the warning property to true
        $word->warning = !$word->warning;

        // Save the changes
        $word->save();

        return "Word with id $id updated successfully.";
    } else {
        return "Word with id $id not found.";
    }
});


function testDownload ($filename) {
    $remoteUrl = 'https://largefilestoreprod.blob.core.windows.net/common/uploads/' . $filename;

    // $remoteUrl = 'https://largefilestoreprod.blob.core.windows.net/common/uploads/5033ee87.wav';

    $client = new Client();
    $response = $client->request('GET', $remoteUrl);

    if ($response->getStatusCode() == 200) {
        $body = $response->getBody()->getContents();

        // Specify the path where you want to save the file
        $filePath = public_path('/audio/' . $filename);

        file_put_contents($filePath, $body);

        return $filename;
    } else {
        return null;
    }
}



function makeApiRequest($text)
{
    $client = new Client();


    $gender = ['male', 'female'];
    $oneortwo = rand(0, 1);
    $onetosix = rand(0, 5);
    $code = '';
    $dickornodick = '';
    
    $malecodes = [
        '625ed261',
        '2f2b2d74',
        'c5a7edc6',
        '83d1df2a',
        '6a4707c0',
        'ac10db61'
    ];

    $femalecodes = [
        '69095f48',
        '36bae932',
        '75a29b6d',
        'be02d6e7',
        '446d38c1',
        '246b87cd'
    ];

    if ($gender[$oneortwo] === 'male') {
        $code = $malecodes[$onetosix];
    } else {
        $code = $femalecodes[$onetosix];
    }


    $response = $client->request('POST', 'https://platform.neuralspace.ai/api/tts/v1/single/synthesize', [
        'headers' => [
            'Authorization' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTUzODI3MDIwLCJkYXRhIjp7ImVtYWlsIjoicGFsZWczNzEzNUBhbHZpc2FuaS5jb20iLCJyb2xlIjoicHJvdmlkZXIiLCJhcGlrZXkiOiI5ZDhhOGRkYy00NDY4LTQ4YTUtODRjZC0zN2JmNzJjMjg4ZDMiLCJyZWZlcmVuY2VLZXkiOiI5ZDhhOGRkYy00NDY4LTQ4YTUtODRjZC0zN2JmNzJjMjg4ZDMiLCJwbGFuVHlwZSI6ImRlZmF1bHQiLCJjb3VudHJ5IjoiUG9sYW5kIn0sImlhdCI6MTY5NTM4MjM0Mn0.EZG5SD50YNBuS4TVUP0hKG8V3FkTZttW1ii8V7nSje4',
            'Content-Type' => 'application/json',
        ],
        'json' => [
            "data" => [
                "text" => $text,
                "gender" => $gender[$oneortwo],
                "language" => "de-DE",
                "speakerId" => $code
            ]
        ]
    ]);

    $body = $response->getBody()->getContents();
    $data = json_decode($body, true);

    return $data;
}