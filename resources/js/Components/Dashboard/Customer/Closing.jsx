import { useForm, usePage } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'

export default function Edit({ close, model }) {

    const { data, setData, post, reset, errors } = useForm({
        is_closing: true,
        ktp_image: model.ktp_image,
        ktp_nama: model.ktp_nama,
        ktp_nik: model.ktp_nik,
        ktp_address: model.ktp_address,
        package_id: model.package_id,
        promo_id: model.promo_id,
        rumah_foto: model.rumah_foto,
        rumah_address: model.rumah_address,
        rumah_lat: model.rumah_lat,
        rumah_long: model.rumah_long,
    });
    const { packages } = usePage().props;
    const { promos } = usePage().props;
    const { auth } = usePage().props;
    const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('customer.update_closing', model.uuid), {
            data,
            onSuccess: () => {
                reset(),
                    close()
            },
        });
    }

    useEffect(() => {
        setData({
            ...data,
            is_closing: true,
            ktp_image: model.ktp_image,
            ktp_nama: model.ktp_nama,
            ktp_nik: model.ktp_nik,
            ktp_address: model.ktp_address,
            package_id: model.package_id,
            promo_id: model.promo_id,
            rumah_foto: model.rumah_foto,
            rumah_address: model.rumah_address,
            rumah_lat: model.rumah_lat,
            rumah_long: model.rumah_long,
        });
    }, [model]);

    /**rules */
    const isSuperSales = ['super-admin', 'sales'].includes(auth?.user?.roles);

    // console.log(data)
    return (
        <>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="name" className="col-form-label">Gambar KTP:</label>
                        <input type="file" className="form-control" name='ktp_image' onChange={e => setData({ ...data, ktp_image: e.target.files[0] })} id="ktp_image" />
                        {errors && <div className='text-danger mt-1'>{errors.ktp_image}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="col-form-label">KTP Nama:</label>
                        <input type="text" className="form-control" name='ktp_nama' value={data.ktp_nama} onChange={onChange} id="ktp_nama" />
                        {errors && <div className='text-danger mt-1'>{errors.ktp_nama}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="col-form-label">KTP NIK:</label>
                        <input type="text" className="form-control" name='ktp_nik' value={data.ktp_nik} onChange={onChange} id="ktp_nik" />
                        {errors && <div className='text-danger mt-1'>{errors.ktp_nik}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="col-form-label">KTP Address:</label>
                        <input type="text" className="form-control" name='ktp_address' value={data.ktp_address} onChange={onChange} id="ktp_address" />
                        {errors && <div className='text-danger mt-1'>{errors.ktp_address}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="package_id" className="col-form-label">Package:</label>
                        <select name="package_id" onChange={onChange} value={data.package_id} id="package_id" className="form-control" style={{ width: '100% !important' }}>
                            <option> -Pilih salah satu- </option>
                            {packages.map((dataPackage, index) => (
                                <option key={dataPackage.uuid} value={dataPackage.uuid}>{dataPackage.name}</option>
                            ))}
                        </select>
                        {errors && <div className='text-danger mt-1'>{errors.package_id}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="promo_id" className="col-form-label">Promo:</label>
                        <select name="promo_id" onChange={onChange} value={data.promo_id} id="promo_id" className="form-control" style={{ width: '100% !important' }}>
                            <option> -Pilih salah satu- </option>
                            {promos.map((promo, index) => (
                                <option key={index} value={promo.uuid}>{promo.title}</option>
                            ))}
                        </select>
                        {errors && <div className='text-danger mt-1'>{errors.promo_id}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="rumah_foto" className="col-form-label">Gambar Rumah:</label>
                        <input type="file" className="form-control" name='rumah_foto' onChange={e => setData({ ...data, rumah_foto: e.target.files[0] })} id="rumah_foto" />
                        {errors && <div className='text-danger mt-1'>{errors.rumah_foto}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="rumah_address" className="col-form-label">Rumah Address:</label>
                        <input type="text" className="form-control" name='rumah_address' value={data.rumah_address} onChange={onChange} id="rumah_address" />
                        {errors && <div className='text-danger mt-1'>{errors.rumah_address}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="rumah_lat" className="col-form-label">Gambar Latitude:</label>
                        <input type="text" className="form-control" name='rumah_lat' value={data.rumah_lat} onChange={onChange} id="rumah_lat" />
                        {errors && <div className='text-danger mt-1'>{errors.rumah_lat}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="rumah_long" className="col-form-label">Gambar Longtitude:</label>
                        <input type="text" className="form-control" name='rumah_long' value={data.rumah_long} onChange={onChange} id="rumah_long" />
                        {errors && <div className='text-danger mt-1'>{errors.rumah_long}</div>}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    {isSuperSales? (
                        <button type="submit" className="btn bg-gradient-primary">Update Closing</button>
                        ) : ''
                    }
                </div>
            </form>
        </>

    )
}
