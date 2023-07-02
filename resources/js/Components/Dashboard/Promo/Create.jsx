import { useForm, usePage } from '@inertiajs/inertia-react'
import React, { useState } from 'react'

export default function Create({ close }) {

    const { data, setData, post, reset, errors } = useForm({
        title: '',
        start_date: '',
        end_date: '',
        image: '',
    });
    const { module } = usePage().props;
    const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

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
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="title" className="col-form-label">Title:</label>
                        <input type="text" className="form-control" name='title' value={data.title} onChange={onChange} id="title" />
                        {errors && <div className='text-danger mt-1'>{errors.title}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="start_date" className="col-form-label">start_date:</label>
                        <input type="datetime-local" className="form-control" name='start_date' value={data.start_date} onChange={onChange} id="start_date" />
                        {errors && <div className='text-danger mt-1'>{errors.start_date}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="end_date" className="col-form-label">end_date:</label>
                        <input type="datetime-local" className="form-control" name='end_date' value={data.end_date} onChange={onChange} id="end_date" />
                        {errors && <div className='text-danger mt-1'>{errors.end_date}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="image" className="col-form-label">image:</label>
                        <input type="file" className="form-control" name='image' onChange={e => setData({ ...data, image: e.target.files[0] })} id="image" />
                        {errors && <div className='text-danger mt-1'>{errors.image}</div>}
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
