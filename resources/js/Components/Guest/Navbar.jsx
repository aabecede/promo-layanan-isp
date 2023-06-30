import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import { usePage } from '@inertiajs/inertia-react'

export default function Navbar() {
    const { appName } = usePage().props;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
            <div className="container">
                <a className="navbar-brand" href="#">{appName}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" href={route('home')}>Home</Link>
                    </li>
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" href={route('login')}>Login</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}
