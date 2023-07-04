<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $month = date('Y-m');
        $totalCustomer = Customer::getAllData()->count();
        $totalCustomerClosing = Customer::getAllData()->where('status_ketertarikan', 'closing')->count();
        $totalCustomerBulanIni = Customer::getAllData()->where('created_at', 'like', "%$month%")->count();
        $totalCustomerClosingBulanIni = Customer::getAllData()->where('status_ketertarikan', 'closing')->where('closing_at', 'like', "%$month%")->count();
        $dataGraph = [];
        $maxData = 0;
        for($i = 1; $i <= date('m'); $i++){
            $dataGraph['label'][] = Carbon::parse("2023-$i")->format('F');
            $currentMonth = Carbon::parse("2023-$i")->format('Y-m');
            $dataGraph['totalMonthCustomer'][] = Customer::getAllData()->where('created_at', 'like', "%$currentMonth%")->count();
            $dataGraph['totalMonthCustomerClosing'][] = Customer::getAllData()->where('created_at', 'like', "%$currentMonth%")->where('status_ketertarikan', 'CLOSING')->count();
        }
        $maxCustomer = max($dataGraph['totalMonthCustomer']);
        $maxCustomerClosing = max($dataGraph['totalMonthCustomerClosing']);
        $maxData = $maxCustomer > $maxCustomerClosing ? $maxCustomer : $maxCustomer;

        // dd($dataGraph);
        return inertia('Dashboard', [
            'totalCustomer' => $totalCustomer,
            'totalCustomerClosing' => $totalCustomerClosing,
            'totalCustomerBulanIni' => $totalCustomerBulanIni,
            'totalCustomerClosingBulanIni' => $totalCustomerClosingBulanIni,
            'dataGraph' => $dataGraph,
            'maxData' => $maxData,
        ]);
    }
}
