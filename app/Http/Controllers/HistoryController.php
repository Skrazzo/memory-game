<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HistoryController extends Controller
{
    public function game_over(Request $req){
        $res = array('response' => '', 'success' => false);
        
        $validator = Validator::make($req->all(), [
            'level' => 'required|min:1|integer',
            'points' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $res['response'] = $validator->messages();
        } else {
            if($req->user()->history()->create($validator->valid())){
                $res['success'] = true;
                $res['response'] = 'Successfully created game record!';
            }


        }
        
        return $res;
    }
}
