<?php

namespace App\Http\Controllers;

use App\Models\word;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    private function verifyAdmin () {
//        $role = (isset( Auth::user()->role ) ) ?Auth::user()->role : false ;
//        if ( $role != "admin" ) {
//            abort(404);
//        }
    }

    public function admin () {
        $this->verifyAdmin();

    }

    public function store (Request $request) {
        $this->verifyAdmin();

        $word = new Word();



        $word->save();
//        return redirect('/admin/attributes');
    }


//    public function create () {
//        $this->verifyAdmin();
//
////        $groups = AttributeGroup::get();
////        return view('admin.attribute_create', ['groups' => $groups]);
//    }


    public function edit (Word $word) {
        $this->verifyAdmin();
//        $groups = AttributeGroup::get();

//        return view('admin.attribute_edit', ['block' => $attribute, 'groups' => $groups]);
    }



    public function destroy (Word $word) {
        $this->verifyAdmin();

        $word->delete();
//        return redirect('/admin/attribute/');
    }

}
