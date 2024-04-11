<?php

namespace App\Http\Controllers;

use App\Models\status;
use App\Models\translation;
use App\Models\word;
use Illuminate\Http\Request;

class WordController extends Controller
{
    //


    public function updateSentence($id) {
        $word = Word::find($id);
    
        if ($word) {
            $word->sentence = request('sentence'); // Assuming you're sending the new sentence as a request parameter
    
            $word->save();
    
            return "Sentence for word with ID $id updated successfully. The sentence is: " . request('sentence');
        } else {
            return "Word with ID $id not found.";
        }
    }

    public function importer (Request $request) {

        $import = request('import');


        $parsed = json_decode( $import );

//        echo var_dump($parsed);
//
//        die();

//        $parsed = json_decode(request('import'));

        $hehe = $parsed->arr;


        foreach ( $hehe as $he ) {

            $word = new Word();
            $word->word = $he->word;
            $word->lang = "de";
            $word->frequency = ( $he->frequency == 0 ) ? NULL : $he->frequency;
            $word->save();

            $translation = new Word();
            $translation->word = $he->translation;
            $translation->lang = "3n";
            $translation->save();

            $word_link = new Translation();
            $word_link->word_id = $word->id;
            $word_link->translation_id = $translation->id;
            $word_link->save();

            if ( strlen($he->status) > 0 ) {
                $status = new Status();
                $status->user_id = 1;
                $status->word_id = $word->id;
                $status->level = $he->status;
                $status->save();
            }
        }


//       words
//        word | frequency | audio | lang


//        translations
//         word_id | translation_id




//        request('word');
//        $word->save();


    }


    public function translation()
    {
        return $this->hasOne(Word::class, 'id', 'translation_id');
    }
}
