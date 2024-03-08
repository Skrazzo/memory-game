<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

        return Inertia::render('Dashboard', [
            'chart' => $avg_history
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

                if ($response_arr['game_count'] % 2 == 0) {
                    $user->average()->create(['score' => round($user->history()->avg('points'), 2)]);
                }

                if ($new_record->level == 1) {
                    $new_record->delete();
                }
            }
        }

        return $response;
    }
}
