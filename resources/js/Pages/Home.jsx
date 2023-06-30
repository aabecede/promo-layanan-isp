import React from "react";
import Guest from "../Layouts/Guest";

export default function Home() {
    return (
        <>
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <h5>Promos</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <h5>Packages</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Home.layout = (page) => <Guest children={page} title={"Home"} />;
