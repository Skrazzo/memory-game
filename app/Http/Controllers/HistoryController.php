<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

/**
 * Class HistoryController
 *
 * This class is responsible for handling the history and statistics of a user's game.
 */
class HistoryController extends Controller
{
    /**
     * Retrieves the average history of a user and renders it on the dashboard.
     *
     * @param Request $request The request object.
     * @return \Inertia\Response The Inertia response.
     */
    public function dashboard_index(Request $request)
    {
        $user = $request->user();

        $avg_history = [
            'labels' => $user->average()->pluck('created_at')->map(function ($x) {
                return $x->format('Y-m-d H:i');
            }),
            'data' => $user->average()->pluck('score')
        ];

        // creates leaderboard array for all users
        $leaderboard = User::all()->map(function ($user) {
            return [
                'name' => $user->name,
                'highest'  => $user->history()->max('points'),
            ];
        });

        $leaderboard = array_values(Arr::sortDesc($leaderboard, function($value) {
            return $value['highest'];
        }));


        
        // calculate users place in the leaderboard from his highest points
        $user_best  = $user->history()->max('points');
        $user_place = array_search($user->name, array_column($leaderboard, 'name')) + 1;
        if(!$user_place) $user_place = 0; // check, in case array_search returned false
        
        return Inertia::render('Dashboard', [
            'chart' => $avg_history,
            'stats' => [
                'games_played' => $user->history()->count(),
                'average_points' => round($user->history()->avg('points'), 1),
                'user_best' => $user_best,
                'leaderboard_place' => $user_place,
            ],
            'history' => $user->history()->select('points', 'level', 'created_at')->orderBy('created_at', 'desc')->simplePaginate(16)
        ]);
    }

    public function game_over(Request $request)
    {
        $response = [
            'response' => '',
            'success' => false
        ];

        $validator = Validator::make($request->all(), [
            'level' => 'required|min:1|integer',
            'points' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $response['response'] = $validator->messages();
        } else {
            $data = $validator->validated();
            $user = $request->user();
            $new_record = $user->history()->create($data);

            if ($new_record) {
                $response['success'] = true;

                $user_best = $user->history()->orderBy('points', 'DESC')->first();
                $response_arr = [
                    'new_best' => false,
                    'best' => $user_best,
                    'game_count' => $user->history()->count(),
                    'current_game' => $data
                ];

                if ($data['points'] == $user_best['points']) {
                    $response_arr['new_best'] = true;
                }

                $response['response'] = $response_arr;

                
                $user->average()->create(['score' => round($user->history()->avg('points'), 2)]);

                if ($new_record->level == 1) {
                    $new_record->delete();
                }
            }
        }

        return $response;
    }
}
