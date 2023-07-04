import { useForm, usePage } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'
import SelectCreate from 'react-select/creatable';
import Select from 'react-select';

export default function Edit({ close, model }) {

    const { data, setData, put, reset, errors } = useForm({
        name: model.name,
        description: model.description,
        price: model.price,
        bandwith: model.bandwith,
        kuota: model.kuota,
        upload_download: model.upload_download,
        dynamic: model.dynamic,
        modem: model.modem,
        tv_chanel: model.tv_chanel,
        jumlah_perangkat: model.jumlah_perangkat,
        status: model.status,
    });

    const { dataDynamic } = usePage().props;
    const { dataModem } = usePage().props;
    const { dataTv_chanel } = usePage().props;
    const { dataJumlah_perangkat } = usePage().props;
    const { dataStatus } = usePage().props;
    const { module } = usePage().props;
    const { auth } = usePage().props;
    const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route(`${module}.update`, model.uuid), {
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
            name: model.name,
            description: model.description,
            price: model.price,
            bandwith: model.bandwith,
            kuota: model.kuota,
            satuan_kuota: model.satuan_kuota,
            upload_download: model.upload_download,
            satuan_upload_download: model.satuan_upload_download,
            dynamic: model.dynamic,
            modem: model.modem,
            tv_chanel: model.tv_chanel,
            jumlah_perangkat: model.jumlah_perangkat,
            status: model.status
        });
    }, [model]);

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

    // console.log(model)
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
                        <label htmlFor="description" className="col-form-label">Description:</label>
                        <input type="text" className="form-control" name='description' value={data.description} onChange={onChange} id="description" />
                        {errors && <div className='text-danger mt-1'>{errors.description}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="price" className="col-form-label">Price:</label>
                        <input type="number" className="form-control" name='price' value={data.price} onChange={onChange} id="price" />
                        {errors && <div className='text-danger mt-1'>{errors.price}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="bandwith" className="col-form-label">Bandwith:</label>
                        <input type="text" className="form-control" name='bandwith' value={data.bandwith} onChange={onChange} id="bandwith" />
                        {errors && <div className='text-danger mt-1'>{errors.bandwith}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="kuota" className="col-form-label">Kuota:</label>
                        <input type="text" className="form-control" name='kuota' value={data.kuota} onChange={onChange} id="kuota" />
                        {errors && <div className='text-danger mt-1'>{errors.kuota}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="upload_download" className="col-form-label">Upload / Download:</label>
                        <input type="text" className="form-control" name='upload_download' value={data.upload_download} onChange={onChange} id="upload_download" />
                        {errors && <div className='text-danger mt-1'>{errors.upload_download}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="dynamic" className="col-form-label">Dynamic:</label>
                        <SelectCreate
                            defaultValue={[{ value:model.dynamic, label:model.dynamic }]}
                            isClearable
                            options={dataDynamic}
                            onChange={handleSelectChangeDynamic}
                        />
                        {errors && <div className='text-danger mt-1'>{errors.dynamic}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="modem" className="col-form-label">Modem:</label>
                        <SelectCreate
                            defaultValue={[{ value:model.modem, label:model.modem }]}
                            isClearable
                            options={dataModem}
                            onChange={handleSelectChangeModem}
                        />
                        {errors && <div className='text-danger mt-1'>{errors.modem}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="col-form-label">Tv Chanel:</label>
                        <SelectCreate
                            defaultValue={[{ value:model.tv_chanel, label:model.tv_chanel }]}
                            isClearable
                            options={dataTv_chanel}
                            onChange={handleSelectChangeTv_chanel}
                        />
                        {errors && <div className='text-danger mt-1'>{errors.tv_chanel}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="col-form-label">Jumlah Perangkat:</label>
                        <SelectCreate
                            defaultValue={[{ value:model.jumlah_perangkat, label:model.jumlah_perangkat }]}
                            isClearable
                            options={dataJumlah_perangkat}
                            onChange={handleSelectChangeJumlah_perangkat}
                        />
                        {errors && <div className='text-danger mt-1'>{errors.jumlah_perangkat}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="status" className="col-form-label">Status:</label>
                        <select class="form-control" name="status" id="status" onChange={onChange}>
                            <option> Pilih Salah satu </option>
                            {dataStatus.map((item) => (
                                <option key={item.value} value={item.value} selected={item.value === model.status}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                        {errors && <div className='text-danger mt-1'>{errors.status}</div>}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn bg-gradient-primary">Update</button>
                </div>
            </form>
        </>

    )
}
