import { useForm, usePage } from '@inertiajs/inertia-react'
import React from 'react'

export default function Create({close}) {

    const { metodeKetemu } = usePage().props;
    const { statusKetertarikan } = usePage().props;
    const { userSales } = usePage().props;
    const { auth } = usePage().props;
    const {data, setData, post, reset, errors} = useForm({
        name: '', phone: '',
        address: '', metode_ketemu: '',
        status_ketertarikan: '', sales_id: auth.user.id,
    });
    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('customers.store'), {
            data,
            onSuccess: () => {
                reset(),
                close()
            },
        });
    }
    const isHideSales = auth.user.roles == 'sales' ? 'd-none' : 'show';

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="name" className="col-form-label">Name:</label>
                            <input type="text" className="form-control" name='name' value={data.name} onChange={onChange} id="name"/>
                            {errors && <div className='text-danger mt-1'>{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone" className="col-form-label">Phone:</label>
                            <input type="number" className="form-control" name='phone' value={data.phone} onChange={onChange} id="phone"/>
                            {errors && <div className='text-danger mt-1'>{errors.phone}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="col-form-label">Address:</label>
                            {/* <input type="text" className="form-control" name='address' value={data.address} onChange={onChange} id="address"/> */}
                            <textarea name="address" onChange={onChange} id="address" cols="30" rows="10" className="form-control">{data.address}</textarea>
                            {errors && <div className='text-danger mt-1'>{errors.address}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="metode_ketemu" className="col-form-label">Cara Ketemu:</label>
                            <select name="metode_ketemu" onChange={onChange} id="metode_ketemu" className="form-control" style={{ width: '100% !important' }} value={data.metode_ketemu}>
                                <option> -Pilih salah satu- </option>
                                {metodeKetemu.map((metode, index) => (
                                    <option key={index} value={metode}>{metode}</option>
                                ))}
                            </select>
                            {errors && <div className='text-danger mt-1'>{errors.metode_ketemu}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="status_ketertarikan" className="col-form-label">Status Ketertarikan:</label>
                            <select name="status_ketertarikan" onChange={onChange} id="status_ketertarikan" className="form-control" style={{ width: '100% !important' }} value={data.status_ketertarikan}>
                                <option> -Pilih salah satu- </option>
                                {statusKetertarikan.map((ketertarikan, index) => (
                                    <option key={index} value={ketertarikan}>{ketertarikan}</option>
                                ))}
                            </select>
                            {errors && <div className='text-danger mt-1'>{errors.status_ketertarikan}</div>}
                        </div>
                        <div className={`${isHideSales} form-group`}>
                            <label htmlFor="sales_id" className="col-form-label">Sales:</label>
                            {userSales.length == 0 ? (<a href={route('users.index')} target="_blank"> Buat Sales </a>) : ''}
                            <select name="sales_id" onChange={onChange} id="sales_id" disabled={userSales.length==0? 'disabled' : ''} className="form-control" style={{ width: '100% !important' }}
                                value={(auth?.user?.id)}
                            >
                                <option> -Pilih salah satu- </option>
                                {userSales.map((sales, index) => (
                                    <option key={index} value={sales.id} >{sales.name}</option>
                                ))}
                            </select>
                            {errors && <div className='text-danger mt-1'>{errors.sales_id}</div>}
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
