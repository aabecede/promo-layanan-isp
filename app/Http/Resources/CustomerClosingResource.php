<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerClosingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'uuid' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'address' => $this->address,
            'sales_id' => $this->sales_id,
            'metode_ketemu' => $this->metode_ketemu,
            'status_ketertarikan' => $this->status_ketertarikan,
            'created_at' => $this->created_at,
            'sales_name' => $this->sales->name,
            'ktp_image' => $this->ktp_image,
            'ktp_nama' => $this->ktp_nama,
            'ktp_nik' => $this->ktp_nik,
            'ktp_address' => $this->ktp_address,
            'package_id' => $this->package_id,
            'promo_id' => $this->promo_id,
            'rumah_foto' => $this->rumah_foto,
            'rumah_address' => $this->rumah_address,
            'rumah_lat' => $this->rumah_lat,
            'rumah_long' => $this->rumah_long,
        ];
    }
}
