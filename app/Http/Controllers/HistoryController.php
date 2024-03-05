<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HistoryController extends Controller
{
    public function game_over(Request $req){
        $res = array('response' => '', 'success' => false);
        
        $val = Validator::make($req->all(), [
            'level' => 'required|min:1|integer',
            'points' => 'required|integer'
        ]);

        if ($val->fails()) {
            $res['response'] = $val->messages();
        } else {
            $data = $val->valid();
            $user = $req->user();

            if($user->history()->create($data)){
                $res['success'] = true;
                
                $user_best = $user->history()->orderBy('points', 'DESC')->first(); // get users best result
                
                $res_arr = [
                    'new_best' => false,
                    'best' => $user_best, // either its users best, or old best record, depends on new_best
                    'average_points' => round($user->history()->avg('points'), 2),
                    'game_count' => $user->history()->count(),
                    'current_game' => $data
                ];
                
                if($data['points'] == $user_best['points']){ // new personal best
                    $res_arr['new_best'] = true;
                }
                
                $res['response'] = $res_arr;
            }
        }
        
        return $res;
    }
}
