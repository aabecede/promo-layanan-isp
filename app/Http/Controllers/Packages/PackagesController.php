<?php

namespace App\Http\Controllers\Packages;

use App\Http\Controllers\Controller;
use App\Http\Requests\Packages\PackagesStoreRequest;
use App\Http\Resources\PackagesResource;
use App\Models\Packages;
use Illuminate\Support\Facades\DB;

class PackagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = PackagesResource::collection(Packages::latest()->paginate(10));
        $dataDynamic = Packages::select('dynamic')->groupBy('dynamic')
            ->get()
            ->map(function($q){
                return [
                    'value' => $q->dynamic,
                    'label' => $q->dynamic,
                ];
            })
            ->toArray();
        $dataModem = Packages::select('modem')->groupBy('modem')
            ->get()
            ->map(function($q){
                return [
                    'value' => $q->modem,
                    'label' => $q->modem,
                ];
            })
            ->toArray();
        $dataTv_chanel = Packages::select('tv_chanel')->groupBy('tv_chanel')
            ->get()
            ->map(function($q){
                return [
                    'value' => $q->tv_chanel,
                    'label' => $q->tv_chanel,
                ];
            })
            ->toArray();
        $dataJumlah_perangkat = Packages::select('jumlah_perangkat')->groupBy('jumlah_perangkat')
            ->get()
            ->map(function($q){
                return [
                    'value' => $q->jumlah_perangkat,
                    'label' => $q->jumlah_perangkat,
                ];
            })
            ->toArray();
        return inertia('Packages/Index', [
            'data' => $data,
            'module' => 'packages',
            'dataDynamic' => $dataDynamic,
            'dataModem' => $dataModem,
            'dataTv_chanel' => $dataTv_chanel,
            'dataJumlah_perangkat' => $dataJumlah_perangkat
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
    public function store(PackagesStoreRequest $request)
    {
        try {
            // dd($request->all());
            DB::beginTransaction();
            $customer = Packages::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'bandwith' => $request->bandwith,
                'kuota' => $request->kuota,
                'satuan_kuota' => $request->satuan_kuota,
                'upload_download' => $request->upload_download,
                'satuan_upload_download' => $request->satuan_upload_download,
                'dynamic' => $request->dynamic,
                'modem' => $request->modem,
                'tv_chanel' => $request->tv_chanel,
                'jumlah_perangkat' => $request->jumlah_perangkat,
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
    public function update(PackagesStoreRequest $request, $packages)
    {
        try {
            DB::beginTransaction();
            $packages = Packages::find($packages);
            $packages->name = $request->name;
            $packages->description = $request->description;
            $packages->price = $request->price;
            $packages->bandwith = $request->bandwith;
            $packages->kuota = $request->kuota;
            $packages->satuan_kuota = $request->satuan_kuota;
            $packages->upload_download = $request->upload_download;
            $packages->satuan_upload_download = $request->satuan_upload_download;
            $packages->dynamic = $request->dynamic;
            $packages->modem = $request->modem;
            $packages->tv_chanel = $request->tv_chanel;
            $packages->jumlah_perangkat = $request->jumlah_perangkat;
            $packages->save();
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
    public function destroy($packages)
    {
        try {
            DB::beginTransaction();
            $packages = Packages::find($packages);
            $packages->delete();
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
}
