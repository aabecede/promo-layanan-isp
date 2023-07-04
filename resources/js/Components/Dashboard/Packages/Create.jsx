import { useForm, usePage } from '@inertiajs/inertia-react'
import React, { useState } from 'react'
import SelectCreate from 'react-select/creatable';
import Select from 'react-select';

export default function Create({ close }) {

    const { data, setData, post, reset, errors } = useForm({
        name: '',
        description: '',
        price: '',
        bandwith: '',
        kuota: '',
        upload_download: '',
        dynamic: '',
        modem: '',
        tv_chanel: '',
        jumlah_perangkat: '',
        status: '',
    });
    const { dataDynamic } = usePage().props;
    const { dataModem } = usePage().props;
    const { dataTv_chanel } = usePage().props;
    const { dataJumlah_perangkat } = usePage().props;
    const { module } = usePage().props;
    const { dataStatus } = usePage().props;
    const { auth } = usePage().props;
    const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    /**start */
    const handleSelectChangeModem = (newValue) => {
        setData({
            ...data,
            modem: newValue.value
        })
    };
    const handleSelectChangeDynamic = (newValue) => {
        setData({
            ...data,
            dynamic: newValue.value
        })
    };
    const handleSelectChangeTv_chanel = (newValue) => {
        setData({
            ...data,
            tv_chanel: newValue.value
        })
    };
    const handleSelectChangeJumlah_perangkat = (newValue) => {
        setData({
            ...data,
            jumlah_perangkat: newValue.value
        })
    };
    /**end */

    const onSubmit = (e) => {
        e.preventDefault();
        post(route(`${module}.store`), {
            data,
            onSuccess: () => {
                reset(),
                    close()
            },
        });
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="name" className="col-form-label">Name:</label>
                        <input type="text" className="form-control" name='name' value={data.name} onChange={onChange} id="name" />
                        {errors && <div className='text-danger mt-1'>{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="col-form-label">Description:</label>
                        <input type="text" className="form-control" name='description' value={data.description} onChange={onChange} id="description" />
                        {errors && <div className='text-danger mt-1'>{errors.description}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="col-form-label">Price:</label>
                        <input type="text" className="form-control" name='price' value={data.price} onChange={onChange} id="price" />
                        {errors && <div className='text-danger mt-1'>{errors.price}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="col-form-label">Bandwith:</label>
                        <input type="number" className="form-control" name='bandwith' value={data.bandwith} onChange={onChange} id="bandwith" />
                        {errors && <div className='text-danger mt-1'>{errors.bandwith}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="col-form-label">Kuota:</label>
                        <input type="text" className="form-control" name='kuota' value={data.kuota} onChange={onChange} id="kuota" />
                        {errors && <div className='text-danger mt-1'>{errors.kuota}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="col-form-label">Upload / Download:</label>
                        <input type="number" className="form-control" name='upload_download' value={data.upload_download} onChange={onChange} id="upload_download" />
                        {errors && <div className='text-danger mt-1'>{errors.upload_download}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="col-form-label">Dynamic:</label>
                        <SelectCreate
                            isClearable
                            options={dataDynamic}
                            onChange={handleSelectChangeDynamic}
                        />
                        {errors && <div className='text-danger mt-1'>{errors.dynamic}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="col-form-label">Modem:</label>
                        <SelectCreate
                            isClearable
                            options={dataModem}
                            onChange={handleSelectChangeModem}
                        />
                        {errors && <div className='text-danger mt-1'>{errors.modem}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="col-form-label">TV Chanel:</label>
                        <SelectCreate
                            isClearable
                            options={dataTv_chanel}
                            onChange={handleSelectChangeTv_chanel}
                        />
                        {errors && <div className='text-danger mt-1'>{errors.tv_chanel}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="col-form-label">Jumlah Perangkat:</label>
                        <SelectCreate
                            isClearable
                            options={dataJumlah_perangkat}
                            onChange={handleSelectChangeJumlah_perangkat}
                        />
                        {errors && <div className='text-danger mt-1'>{errors.jumlah_perangkat}</div>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="phone" className="col-form-label">Status:</label>
                        <select class="form-control" name="status" id="status" onChange={onChange}>
                            <option> Pilih Salah satu </option>
                            {dataStatus.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                        {errors && <div className='text-danger mt-1'>{errors.status}</div>}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn bg-gradient-primary">Save</button>
                </div>
            </form>
        </>

    )
}
