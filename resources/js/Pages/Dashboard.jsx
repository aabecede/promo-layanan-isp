import React from "react";
import Base from "../Layouts/Base";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { usePage } from "@inertiajs/inertia-react";
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {

    const { totalCustomer } = usePage().props
    const { totalCustomerClosing } = usePage().props
    const { totalCustomerBulanIni } = usePage().props
    const { totalCustomerClosingBulanIni } = usePage().props
    const { dataGraph } = usePage().props
    const { maxData } = usePage().props
    // console.log(dataGraph)
    const labels = dataGraph.label;
    const data = {
        labels,
        datasets: [
            {
                label: "Total Customer",
                data: dataGraph.totalMonthCustomer,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Total Customer Closing",
                data: dataGraph.totalMonthCustomerClosing,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: maxData,
            },
        },
    };

    return (
        <>
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-uppercase font-weight-bold">
                                                Total Customer
                                            </p>
                                            <h5 className="font-weight-bolder">
                                                {totalCustomer}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                                            <i
                                                className="ni text-lg opacity-10"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-uppercase font-weight-bold">
                                                Total Customer Closing
                                            </p>
                                            <h5 className="font-weight-bolder">
                                                {totalCustomerClosing}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                                            <i
                                                className="ni text-lg opacity-10"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-uppercase font-weight-bold">
                                                Total Customer Bulan ini
                                            </p>
                                            <h5 className="font-weight-bolder">
                                                {totalCustomerBulanIni}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                                            <i
                                                className="ni text-lg opacity-10"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-uppercase font-weight-bold">
                                                Total Customer Closing Bulan ini
                                            </p>
                                            <h5 className="font-weight-bolder">
                                                {totalCustomerClosingBulanIni}
                                            </h5>
                                            {/* <p className="mb-0">
                                                <span className="text-success text-sm font-weight-bolder">
                                                    +5%
                                                </span>{" "}
                                                than last month
                                            </p> */}
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                                            <i
                                                className="ni ni-cart text-lg opacity-10"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-12">
                        <div className="card card-carousel overflow-hidden h-100 p-0">
                            <Line data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <Base children={page} title={"Dashboard"} />;
