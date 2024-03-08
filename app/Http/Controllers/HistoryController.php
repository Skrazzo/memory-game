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
            $new_record = $user->history()->create($data);
            if($new_record){
                $res['success'] = true;
                
                $user_best = $user->history()->orderBy('points', 'DESC')->first(); // get users best result
                
                $res_arr = [
                    'new_best' => false,
                    'best' => $user_best, // either its users best, or old best record, depends on new_best
                    'game_count' => $user->history()->count(),
                    'current_game' => $data
                ];
                
                if($data['points'] == $user_best['points']){ // new personal best
                    $res_arr['new_best'] = true;
                }
                
                $res['response'] = $res_arr;

                // if this is 10th game we need to make average score record
                if($res_arr['game_count'] % 10 == 0){
                    $user->average()->create(['score' => round($user->history()->avg('points'), 2)]);
                }

                // if record is on level one the delete it
                if($new_record->level == 1) $new_record->delete();
            }
        }
        
        return $res;
    }
}
