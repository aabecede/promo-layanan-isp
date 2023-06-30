import { useForm, usePage } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'

export default function EditUser({ close, model }) {

    const { data, setData, put, reset, errors } = useForm({ name: model.name, email: model.email, username: model.username, address: model.address, password: model.password, roles: model.roles });
    const { userRoles } = usePage().props;
    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', model.id), {
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
            name: model.name, email: model.email, username: model.username, address: model.address, password: model.password, roles: model.roles
        });
    }, [model]);

    console.log(data)
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
                        <label htmlFor="username" className="col-form-label">Username:</label>
                        <input type="text" className="form-control" name='username' value={data.username} onChange={onChange} id="username" />
                        {errors && <div className='text-danger mt-1'>{errors.username}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="col-form-label">Email:</label>
                        <input type="email" className="form-control" name='email' value={data.email} onChange={onChange} id="email" />
                        {errors && <div className='text-danger mt-1'>{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="col-form-label">Roles:</label>
                        <select name="roles" onChange="onChange" id="roles" className="form-control" style={{ width: '100% !important' }}>
                            {userRoles.map((role, index) => (
                                <option key={index} value={role} selected={role === data.roles}>{role}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="col-form-label">Address:</label>
                        {/* <input type="text" className="form-control" name='address' value={`${data.address || ''}`} onChange={onChange} id="address" /> */}
                        <textarea name="address" onChange={onChange} id="address" cols="30" rows="10" className="form-control">{data.address}</textarea>
                        {errors && <div className='text-danger mt-1'>{errors.address}</div>}
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
