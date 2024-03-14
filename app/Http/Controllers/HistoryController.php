<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

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

                // store user average from last 4 games                
                $avg = round($user->history()->orderBy('created_at', 'desc')->limit(4)->avg('points'), 2);
                $user->average()->create(['score' => $avg]);


                if ($new_record->level == 1) {
                    $new_record->delete();
                }
            }
        }

        return $response;
    }


    function leaderboard_index(Request $req){
        $user = $req->user();



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
        
        $user_place = array_search($user->name, array_column($leaderboard, 'name')) + 1;
        if(!$user_place) $user_place = 0; // check, in case array_search returned false

        return Inertia::render('Leaderboard', [
            'leaderboard' => [
                'data' => $this->simplePaginate($leaderboard, (request()->has('page')) ? request()->page : 1),
                'place' => $user_place
            ]
        ]);
    }

    function simplePaginate(array $arr, int $page = 1, int $length = 10, string $baseUrl = './?page='): array
    {
        $page = max(1, $page); // Ensure page number is at least 1
        $length = max(1, $length); // Ensure length is at least 1

        $next = $baseUrl . ($page + 1);
        if (($page * $length) > count($arr)) {
            $next = null;
        }

        $prev = $baseUrl . ($page - 1);
        if ($page == 1) {
            $prev = null;
        }

        $subset = array_slice($arr, ($page - 1) * $length, $length);

        return [
            'current_page' => $page,
            'next_page_url' => $next,
            'prev_page_url' => $prev,
            'data' => $subset,
        ];
    }
}
