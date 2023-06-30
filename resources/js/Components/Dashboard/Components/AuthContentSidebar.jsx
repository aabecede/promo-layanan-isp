import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import { usePage } from '@inertiajs/inertia-react'
export default function ContentSidebar() {
    const { auth } = usePage().props;
    console.log(auth.user.roles, auth)
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
                    <span className="nav-link-text ms-1">customers</span>
                </Link>
            </li>
        )
    }
    else if(auth.user.roles == 'marketing'){
        return (
            <Link className={`${route().current('users.*') && 'active'} nav-link`} href={route('users.index')}>
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                </div>
                <span className="nav-link-text ms-1">Sales</span>
            </Link>
        );
    }
    else if(auth.user.roles == 'sales'){
        return (
            <Link className={`${route().current('users.*') && 'active'} nav-link`} href={route('users.index')}>
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                </div>
                <span className="nav-link-text ms-1">Customer</span>
            </Link>
        );
    }
    else{
        return ('');
    }
}
