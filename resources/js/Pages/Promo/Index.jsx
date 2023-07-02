import { Link, usePage } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../Components/Dashboard/Dialog';
import Base from '../../Layouts/Base';
import useDialog from '../../Hooks/useDialog';
import CreateComponent from '../../Components/Dashboard/Promo/Create';
import EditComponent from '../../Components/Dashboard/Promo/Edit';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props) {

    const { data: data, links, meta } = props.data;
    const { assetPath } = usePage().props
    const { module } = usePage().props
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
            route(`${module}.destroy`, state.uuid),
            { onSuccess: () => destroyCloseTrigger() });
    }

    return (
        <>
            <div className="container-fluid py-4">
                <Dialog trigger={addTrigger} title="Create New Promo">
                    <CreateComponent close={addCloseTrigger} />
                </Dialog>

                <Dialog trigger={UpdateTrigger} title={`Update Promo: ${state.title}`}>
                    <EditComponent model={state} close={UpdateCloseTrigger} />
                </Dialog>

                <Dialog trigger={destroyTrigger} title={`Delete Promo: ${state.title}`}>
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
                                        <h6>Promo table</h6>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">
                                        <button onClick={addDialogHandler} type="button" className="btn bg-gradient-success btn-block mb-3" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                                            Create New Promo
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
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Title</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Image</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Start Date</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">End Date</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className='text-center'>{meta.from + index}</td>
                                                    <td className="align-middle text-left">
                                                        <div className="d-flex align-items-center text-left">
                                                            <span className="text-xs font-weight-bold mb-0">{item.title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-left">
                                                        <div className="d-flex align-items-center text-left">
                                                            <span className="text-xs font-weight-bold mb-0">
                                                                <img src={`${assetPath}/storage/${item.image}`} style={{maxWidth:'100px', maxHeight:'100px'}} />
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-left">
                                                        <div className="d-flex align-items-center text-left">
                                                            <span className="text-xs font-weight-bold mb-0">{item.start_date}</span>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-left">
                                                        <div className="d-flex align-items-center text-left">
                                                            <span className="text-xs font-weight-bold mb-0">{item.end_date}</span>
                                                        </div>
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

Index.layout = (page) => <Base key={page} children={page} title={"Manage Promo"} />
