<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CustomerStoreRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Models\Packages;
use App\Models\Promo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    protected $publicPath = 'upload/customer-closing';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $customer = Customer::with(['sales:id,name'])
            ->getAllData()
            ->where('status_ketertarikan', '!=', 'CLOSING')
            ->paginate(10);
        $data = CustomerResource::collection($customer);
        $metodeKetemu = Customer::$metodeKetemu;
        $statusKetertarikan = Customer::$statusKetertarikan;
        $userSales = User::getSalesUser()->get();
        $packages = Packages::select('*', 'id as uuid')->get();
        $promos = Promo::select('*', 'id as uuid')->get();

        return inertia('Customer/Index', [
            'data' => $data,
            'userSales' => $userSales,
            'metodeKetemu' => $metodeKetemu,
            'statusKetertarikan' => $statusKetertarikan,
            'packages' => $packages,
            'promos' => $promos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CustomerStoreRequest $request)
    {
        try {
            DB::beginTransaction();
            $customer = Customer::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'address' => $request->address,
                'sales_id' => $request->sales_id,
                'metode_ketemu' => $request->metode_ketemu,
                'status_ketertarikan' => $request->status_ketertarikan,
            ]);
            DB::commit();
            return back()->with([
                'type' => 'success',
                'message' => 'Data has been created',
            ]);
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CustomerStoreRequest $request, Customer $customer)
    {
        try {
            DB::beginTransaction();
            $customer->name = $request->name;
            $customer->phone = $request->phone;
            $customer->address = $request->address;
            $customer->sales_id = $request->sales_id;
            $customer->metode_ketemu = $request->metode_ketemu;
            $customer->status_ketertarikan = $request->status_ketertarikan;
            $customer->save();
            DB::commit();
            return back()->with([
                'type' => 'success',
                'message' => 'Data has been save',
            ]);
        } catch (\Throwable $th) {
            DB::rollback();
            throw new Exception("Error Processing Request", 1);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        try {
            DB::beginTransaction();
            $customer->delete();
            DB::commit();
            return back()->with([
                'type' => 'success',
                'message' => 'Data has been deleted',
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function updateClosing(CustomerStoreRequest $request, Customer $customer){
        try {
            $public_path = $this->publicPath.'/'.date('Y-m-d').'/'.str()->slug($customer->name);
            $rumah_foto = $request->file('rumah_foto')->store($public_path, 'public');
            $ktp_image = $request->file('ktp_image')->store($public_path, 'public');
            DB::beginTransaction();

            $customer->ktp_image = $ktp_image;
            $customer->ktp_nama = $request->ktp_nama;
            $customer->ktp_nik = $request->ktp_nik;
            $customer->ktp_address = $request->ktp_address;
            $customer->package_id = $request->package_id;
            $customer->promo_id = $request->promo_id;
            $customer->rumah_foto = $rumah_foto;
            $customer->rumah_address = $request->rumah_address;
            $customer->rumah_lat = $request->rumah_lat;
            $customer->rumah_long = $request->rumah_long;
            $customer->status_ketertarikan = 'CLOSING';
            $customer->closing_at = now();
            $customer->save();

            DB::commit();
            return back()->with([
                'type' => 'success',
                'message' => 'Data has been saved',
            ]);
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
        }
    }
}
