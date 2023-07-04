<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PackagesResource extends JsonResource
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
            'description' => $this->description,
            'price' => $this->price,
            'bandwith' => $this->bandwith,
            'kuota' => $this->kuota,
            'satuan_kuota' => $this->satuan_kuota,
            'upload_download' => $this->upload_download,
            'satuan_upload_download' => $this->satuan_upload_download,
            'dynamic' => $this->dynamic,
            'modem' => $this->modem,
            'tv_chanel' => $this->tv_chanel,
            'jumlah_perangkat' => $this->jumlah_perangkat,
            'status' => $this->status,
        ];
    }
}
