<?php

namespace App\Http\Controllers\Promo;

use App\Http\Controllers\Controller;
use App\Http\Requests\Promo\PromoStoreRequest;
use App\Http\Resources\PromoResource;
use App\Models\Promo;
use Illuminate\Support\Facades\DB;

class PromoController extends Controller
{
    protected $publicPath = 'upload/promo';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = PromoResource::collection(Promo::latest()->paginate(10));
        return inertia('Promo/Index', [
            'data' => $data,
            'module' => 'promos',
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
    public function store(PromoStoreRequest $request)
    {
        try {
            DB::beginTransaction();

            $image = $request->file('image');
            $path = $image->store($this->publicPath, 'public');
            $data = Promo::create([
                'title' => $request->title,
                'description' => $request->description,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'image' => $path,
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
    public function update(PromoStoreRequest $request, Promo $Promo)
    {
        try {
            DB::beginTransaction();

            $path = $Promo->image;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $path = $image->store($this->publicPath, 'public');
            }
            $Promo->title = $request->title;
            $Promo->description = $request->description;
            $Promo->start_date = $request->start_date;
            $Promo->end_date = $request->end_date;
            $Promo->image = $path;
            $Promo->save();
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
    public function destroy(Promo $Promo)
    {
        try {
            DB::beginTransaction();
            // $Promo = Promo::find($Promo);
            $Promo->delete();
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
