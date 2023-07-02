import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import { usePage } from '@inertiajs/inertia-react'
export default function ContentSidebar() {
    const { auth } = usePage().props;
    // console.log(auth.user.roles, auth)
    if (auth.user.roles == 'super-admin') {
        return (
            <li className="nav-item">
                <Link className={`${route().current('users.*') && 'active'} nav-link`} href={route('users.index')}>
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1">Users</span>
                </Link>
                <Link className={`${route().current('customers.*') && 'active'} nav-link`} href={route('customers.index')}>
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1">Customers</span>
                </Link>
                <Link className={`${route().current('packages.*') && 'active'} nav-link`} href={route('packages.index')}>
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1">Packages</span>
                </Link>
                <Link className={`${route().current('promos.*') && 'active'} nav-link`} href={route('promos.index')}>
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1">Promo</span>
                </Link>
            </li>
        )
    }
    else if(auth.user.roles == 'marketing'){
        return (
            <li>
                <Link className={`${route().current('users.*') && 'active'} nav-link`} href={route('users.index')}>
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1">Sales</span>
                </Link>
                <Link className={`${route().current('customers.*') && 'active'} nav-link`} href={route('customers.index')}>
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1">Customers</span>
                </Link>
                <Link className={`${route().current('packages.*') && 'active'} nav-link`} href={route('packages.index')}>
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1">Packages</span>
                </Link>
            </li>

        );
    }
    else if(auth.user.roles == 'sales'){
        return (
            <li>
                <Link className={`${route().current('users.*') && 'active'} nav-link`} href={route('users.index')}>
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1">Customer</span>
                </Link>
                <Link className={`${route().current('packages.*') && 'active'} nav-link`} href={route('packages.index')}>
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1">Packages</span>
                </Link>
            </li>
        );
    }
    else{
        return ('');
    }
}
