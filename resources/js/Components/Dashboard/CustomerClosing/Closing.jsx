import { useForm, usePage } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'

export default function Edit({ close, model }) {

    const { data, setData, put, reset, errors } = useForm({
        name: model.name, address: model.address,
        phone: model.phone, metode_ketemu: model.metode_ketemu,
        status_ketertarikan: model.status_ketertarikan,
        sales_id: model.sales_id,
    });
    const { metodeKetemu } = usePage().props;
    const { statusKetertarikan } = usePage().props;
    const { userSales } = usePage().props;
    const { auth } = usePage().props;
    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('customers.update', model.uuid), {
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
            name: model.name, address: model.address,
            phone: model.phone, metode_ketemu: model.metode_ketemu,
            status_ketertarikan: model.status_ketertarikan,
            sales_id: model.sales_id,
        });
    }, [model]);

    /**rules */
    const isSuperSales = ['super-admin', 'sales'].includes(auth?.user?.roles);

    // console.log(data)
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
                        <label htmlFor="phone" className="col-form-label">Phone:</label>
                        <input type="text" className="form-control" name='phone' value={data.phone} onChange={onChange} id="phone" />
                        {errors && <div className='text-danger mt-1'>{errors.phone}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="col-form-label">Address:</label>
                        <textarea name="address" onChange={onChange} id="address" cols="30" rows="10" className="form-control">{data.address}</textarea>
                        {errors && <div className='text-danger mt-1'>{errors.address}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="metode_ketemu" className="col-form-label">Cara Ketemu:</label>
                        <select name="metode_ketemu" onChange={onChange} value={data.metode_ketemu} id="metode_ketemu" className="form-control" style={{ width: '100% !important' }}>
                            <option> -Pilih salah satu- </option>
                            {metodeKetemu.map((metode, index) => (
                                <option key={index} value={metode}>{metode}</option>
                            ))}
                        </select>
                        {errors && <div className='text-danger mt-1'>{errors.metode_ketemu}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="status_ketertarikan" className="col-form-label">Status Ketertarikan:</label>
                        <select name="status_ketertarikan" onChange={onChange} value={data.status_ketertarikan} id="status_ketertarikan" className="form-control" style={{ width: '100% !important' }}>
                            <option> -Pilih salah satu- </option>
                            {statusKetertarikan.map((ketertarikan, index) => (
                                <option key={index} value={ketertarikan}>{ketertarikan}</option>
                            ))}
                        </select>
                        {errors && <div className='text-danger mt-1'>{errors.status_ketertarikan}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="sales_id" className="col-form-label">Sales:</label>
                        <select name="sales_id" onChange={onChange} value={data.sales_id} id="status_ketertarikan" className="form-control" style={{ width: '100% !important' }}>
                            <option> -Pilih salah satu- </option>
                            {userSales.map((sales, index) => (
                                <option key={index} value={sales.id}>{sales.name}</option>
                            ))}
                        </select>
                        {errors && <div className='text-danger mt-1'>{errors.sales_id}</div>}
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
