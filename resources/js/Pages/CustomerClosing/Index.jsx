import { Link, usePage } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../Components/Dashboard/Dialog';
import Base from '../../Layouts/Base'
import useDialog from '../../Hooks/useDialog';
// import CreateComponent from '../../Components/Dashboard/Customer/Create';
// import EditComponent from '../../Components/Dashboard/Customer/Edit';
import ClosingComponent from '../../Components/Dashboard/Customer/Closing';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props) {

    const { data: data, links, meta } = props.data;
    const [state, setState] = useState([])
    const [addDialogHandler, addCloseTrigger, addTrigger] = useDialog()
    const [ClosingDialogHandler, ClosingCloseTrigger, ClosingTrigger] = useDialog()
    const { assetPath } = usePage().props

    // const destroyAction = () => {
    //     Inertia.delete(
    //         route('customers.destroy', state.uuid),
    //         { onSuccess: () => destroyCloseTrigger() });
    // }

    return (
        <>
            <div className="container-fluid py-4">

                {/* <Dialog trigger={ClosingTrigger} title={`Closing Customer: ${state.name}`}>
                    <ClosingComponent model={state} close={ClosingCloseTrigger} />
                </Dialog> */}

                {/* <Dialog trigger={destroyTrigger} title={`Delete Customer: ${state.name}`}>
                    <p>Are you sure to delete this user ?</p>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" onClick={destroyAction} className="btn bg-gradient-danger">Delete</button>
                    </div>
                </Dialog> */}

                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Customer Closing table</h6>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">
                                        {/* <button onClick={addDialogHandler} type="button" className="btn bg-gradient-success btn-block mb-3" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                                            Create New Customer
                                        </button> */}
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
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Phone</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Address</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Status Ketertarikan</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Cara Ketemu</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Sales Name</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Package</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Promo</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Rumah</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Lat</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Long</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"></th>
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
                                                                <table>
                                                                    <tr>
                                                                        <td colSpan={2}>
                                                                            <img src={`${assetPath}/storage/${item.ktp_image}`} style={{maxWidth:'150px', maxHeight:'150px'}} />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>KTP NIK :</td>
                                                                        <td>{item.ktp_nik}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>KTP Nama :</td>
                                                                        <td>{item.ktp_nama}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>KTP address :</td>
                                                                        <td>{item.ktp_address}</td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.phone}</span>
                                                    </td>
                                                    <td className="align-middle text-left">
                                                        <div className="d-flex align-items-center text-left">
                                                            <span className="text-xs font-weight-bold mb-0">{item.address}</span>
                                                        </div>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.status_ketertarikan}</span>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.metode_ketemu}</span>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.sales_name}</span>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.package}</span>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.promo}</span>
                                                    </td>
                                                    <td className='text-left'>
                                                        <div className="d-flex px-2">
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm">{item.rumah_address}</h6>
                                                                <table>
                                                                    <tr>
                                                                        <td>
                                                                            <img src={`${assetPath}/storage/${item.rumah_foto}`} style={{maxWidth:'150px', maxHeight:'150px'}} />
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.rumah_lat}</span>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{item.rumah_long}</span>
                                                    </td>
                                                    <td className="align-middle text-center" width="10%">
                                                        <div>
                                                            {/* {item.status_ketertarikan == 'PROSPEK' ? (
                                                                <button type="button" onClick={() => openClosingDialog(item)} className="btn btn-vimeo btn-icon-only mx-2" title="Data Closing">
                                                                    <span className="btn-inner--icon"><i className="fas fa-user-alt"></i></span>
                                                                </button>
                                                            ): ''} */}
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

Index.layout = (page) => <Base key={page} children={page} title={"Manage Customer Closing"} />
