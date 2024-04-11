<?php

namespace App\Http\Controllers;

use App\Models\status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class StatusController extends Controller
{
    //

    public function update ( Request $request ) {
        $uid = Auth::id();


        if ($uid!==null) {
            $level =   request('level');
            $level = ( $level == "a" || $level == "b" || $level == "c" || $level == "d" ) ? $level : false;
            if ( !$level ) { return; }
            $word_id = (int)request('word_id');
            $status_id = (int)request('status_id');


            if ( $status_id != 0 ) {
                $status = Status::where([['user_id', $uid], ['id', $status_id]])->get()[0];
                if ( $level == "a" || $level == "b" || $level == "c" || $level == "d" ) {
                    $status->level = $level;
                    $status->save();
                    return true;
                } else {
                    return false;
                }
            } else {
                $status = new Status();
                $status->user_id = $uid;
                $status->level = $level;
                $status->word_id = $word_id;
                $status->save();
                return true;
            }
        }
    }
}
