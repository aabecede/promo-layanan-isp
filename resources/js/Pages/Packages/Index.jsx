import { Link, usePage } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../Components/Dashboard/Dialog';
import Base from '../../Layouts/Base';
import useDialog from '../../Hooks/useDialog';
import CreateComponent from '../../Components/Dashboard/Packages/Create';
import EditComponent from '../../Components/Dashboard/Packages/Edit';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props) {

    const { data: data, links, meta } = props.data;
    const [state, setState] = useState([])
    const [addDialogHandler, addCloseTrigger, addTrigger] = useDialog()
    const [UpdateDialogHandler, UpdateCloseTrigger, UpdateTrigger] = useDialog()
    const [destroyDialogHandler, destroyCloseTrigger, destroyTrigger] = useDialog()
    const openUpdateDialog = (data) => {
        setState(data);
        UpdateDialogHandler()
    }

    const openDestroyDialog = (data) => {
        setState(data);
        destroyDialogHandler()
    };

    const destroyAction = () => {
        Inertia.delete(
            route('packages.destroy', state.uuid),
            { onSuccess: () => destroyCloseTrigger() });
    }

    return (
        <>
            <div className="container-fluid py-4">
                <Dialog trigger={addTrigger} title="Create New Package">
                    <CreateComponent close={addCloseTrigger} />
                </Dialog>

                <Dialog trigger={UpdateTrigger} title={`Update Package: ${state.name}`}>
                    <EditComponent model={state} close={UpdateCloseTrigger} />
                </Dialog>

                <Dialog trigger={destroyTrigger} title={`Delete Package: ${state.name}`}>
                    <p>Are you sure to delete this user ?</p>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" onClick={destroyAction} className="btn bg-gradient-danger">Delete</button>
                    </div>
                </Dialog>

                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Package table</h6>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">
                                        <button onClick={addDialogHandler} type="button" className="btn bg-gradient-success btn-block mb-3" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                                            Create New Package
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive-xxl p-0" width="100%">
                                    <table className="table align-items-center justify-content-center mb-0" width="100%">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-centter">#</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Name</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Deskripsi</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Price</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Bandwith</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Kuota</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Uploads/Download</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">IP Dynamic</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Modem</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Tv Chanel</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Jumlah Perangkat</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className='text-center'>{meta.from + index}</td>
                                                    <td className='text-left'>
                                                        <div className="d-flex px-2">
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm">{item.name}</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-left">
                                                        <div className="d-flex align-items-center text-left">
                                                            <span className="text-xs font-weight-bold mb-0">{item.deskripsi}</span>
                                                        </div>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.price}</span>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.bandwith}</span>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.kuota}</span>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.upload_download}</span>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.dynamic}</span>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.modem}</span>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.tv_chanel}</span>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.jumlah_perangkat}</span>
                                                    </td>
                                                    <td className="align-middle text-center" width="10%">
                                                        <div>
                                                            <button type="button" onClick={() => openUpdateDialog(item)} className="btn btn-vimeo btn-icon-only mx-2">
                                                                <span className="btn-inner--icon"><i className="fas fa-pencil-alt"></i></span>
                                                            </button>
                                                            <button type="button" onClick={() => openDestroyDialog(item)} className="btn btn-youtube btn-icon-only">
                                                                <span className="btn-inner--icon"><i className="fas fa-trash"></i></span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {meta.links.map((link, k) => (
                            <li key={k} className="page-item">
                                <Link disabled={link.url == null ? true : false} as="button" className={`${link.active && 'bg-info'} ${link.url == null && 'btn bg-gradient-secondary text-white'} page-link`} href={link.url || ''} dangerouslySetInnerHTML={{ __html: link.label }} />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}

Index.layout = (page) => <Base key={page} children={page} title={"Manage Package"} />
