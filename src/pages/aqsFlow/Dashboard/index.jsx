import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profile , constructions_img } from '../../../assets/images';
import { MdOutlineCurrencyRupee } from "react-icons/md";
export const roleCheck = { role: "admin" };

const pendingBOQs = [
  {
    id: 1,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 2,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 3,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 4,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 5,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 6,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 7,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 8,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 9,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 10,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 11,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 12,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
];
const requestposs = [
  {
    id: 1,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 2,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 3,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 4,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
];
const costEstimations = [
  {
    id: 1,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 2,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
];
const vendorInquiries = [
  {
    id: 1,
    vendor: "CCS Enterprises",
    user: "Marvin McKinney",
    img: profile,
  },
  {
    id: 2,
    vendor: "CCS Enterprises",
    user: "Marvin McKinney",
    img: profile,
  },
  {
    id: 3,
    vendor: "CCS Enterprises",
    user: "Marvin McKinney",
    img: profile,
  },
  
];
const matrials = [
    {
        id: 1,
        product: "CCS Enterprises",
        prize: "100",
        currentprize: "102",
        vendor: "profile",
        productimg: profile,
        img: profile,
    }, 
    {
        id: 2,
        product: "CCS Enterprises",
        prize: "55",
        currentprize: "100",
        vendor: "profile",
        productimg: profile,
        img: profile,
    }, 
];

const AqsDashboard = ({ progress = 50, maxValue = 100 }) => {
  const percentage = (progress / maxValue) * 100;
  // const activeBoardName = findBoardById(userInfo.activeBoard);

  const navigate = useNavigate();

  return (
    <Fragment>
        <main className="page-aqs-dashboard d-flex">
            <div className="left-containeleft-container left-container-100">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <div className="card-conatiner">                
                        <h2><span className="text-dark-gray">Total Projects</span>420</h2>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <div className="card-conatiner">
                        <h2><span className="text-dark-gray">Active Projects</span>112</h2>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <div className="card-conatiner">
                        <h2><span className="text-dark-gray">Biding Projects</span>24</h2>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <div className="card-conatiner">
                        <div>
                        <h2><span className="text-dark-gray">Pending Approvals</span>12</h2>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className="pending-approvel-conatiner">
                            <div className="justify-content-between d-flex mb-4">
                                <h4 className="fs-22-700 mb-0 justify-content-start align-items-center d-flex">Pending BOQ's <span className="pending-approvel-count fs-16-500">12</span></h4>
                            </div>
                            <div className="poq-max-height scrollbar-none">
                            {pendingBOQs.map((pendingBOQ) => (
                                <Link key={pendingBOQ.id} className="card-boq text-decoration-none text-dark">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div className="">
                                            <h4 className="fs-16-500 text-dark">{pendingBOQ.site}<span className="text-dark-gray fs-14-400 ms-2">{pendingBOQ.block}</span></h4>
                                        </div>
                                        <div className=" d-flex justify-content-between align-items-center">
                                            <span className="text-dark-gray fs-12-400">{pendingBOQ.time}</span>
                                            <span className="dot"></span>
                                            <span className="text-dark-gray fs-12-400">{pendingBOQ.date}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <div className="d-flex">
                                            <img src={pendingBOQ.img} className="h32-w32 me-2" alt="profile" />
                                            <h6 className="mb-0 ms-1 fs-16-500">{pendingBOQ.user} 
                                                <span className="d-block fs-12-400 text-dark-gray mt-1">{pendingBOQ.role}</span>
                                            </h6>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <span 
                                                className={`fs-14-400 ${
                                                    pendingBOQ.status === "Approved" ? "text-green6" :
                                                    pendingBOQ.status === "Reject" ? "text-crimson-red" :
                                                    pendingBOQ.status === "In review" ? "text-golden-yellow" :
                                                    pendingBOQ.status === "Pending" ? "text-info" : ""
                                                }`}
                                            >
                                                {pendingBOQ.status}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className="pending-approvel-conatiner">
                            <div className="justify-content-between d-flex mb-4">
                                <h4 className="fs-22-700 mb-0 justify-content-start align-items-center d-flex">PO's Request <span className="pending-approvel-count fs-16-500">12</span></h4>
                            </div>
                            <div className="poq-max-height scrollbar-none">
                            {requestposs.map((requestpos) => (
                                <Link key={requestpos.id} className="card-boq text-decoration-none text-dark">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div className="">
                                            <h4 className="fs-16-500 text-dark">{requestpos.site}<span className="text-dark-gray fs-14-400 ms-2">{requestpos.block}</span></h4>
                                        </div>
                                        <div className=" d-flex justify-content-between align-items-center">
                                            <span className="text-dark-gray fs-12-400">{requestpos.time}</span>
                                            <span className="dot"></span>
                                            <span className="text-dark-gray fs-12-400">{requestpos.date}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <div className="d-flex">
                                            <img src={requestpos.img} className="h32-w32 me-2" alt="profile" />
                                            <h6 className="mb-0 ms-1 fs-16-500">{requestpos.user} 
                                                <span className="d-block fs-12-400 text-dark-gray mt-1">{requestpos.role}</span>
                                            </h6>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <span 
                                                className={`fs-14-400 ${
                                                    requestpos.status === "Approved" ? "text-green6" :
                                                    requestpos.status === "Reject" ? "text-crimson-red" :
                                                    requestpos.status === "In review" ? "text-golden-yellow" :
                                                    requestpos.status === "Pending" ? "text-info" : ""
                                                }`}
                                            >
                                                {requestpos.status}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className="pending-approvel-conatiner">
                            <div className="justify-content-between d-flex mb-4">
                                <h4 className="fs-22-700 mb-0 justify-content-start align-items-center d-flex">Cost Estimation <span className="pending-approvel-count fs-16-500">12</span></h4>
                            </div>
                            <div className="poq-max-height scrollbar-none">
                            {costEstimations.map((costEstimation) => (
                                <div key={costEstimation.id} className="card-boq text-decoration-none text-dark">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div className="">
                                            <h4 className="fs-16-500 text-dark">{costEstimation.site}<span className="text-dark-gray fs-14-400 ms-2">{costEstimation.block}</span></h4>
                                        </div>
                                        <div className=" d-flex justify-content-between align-items-center">
                                            <span className="text-dark-gray fs-12-400">{costEstimation.time}</span>
                                            <span className="dot"></span>
                                            <span className="text-dark-gray fs-12-400">{costEstimation.date}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <div className="d-flex">
                                            <img src={costEstimation.img} className="h32-w32 me-2" alt="profile" />
                                            <h6 className="mb-0 ms-1 fs-16-500">{costEstimation.user} 
                                                <span className="d-block fs-12-400 text-dark-gray mt-1">{costEstimation.role}</span>
                                            </h6>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <Link className="fs-14-400 text-bright-royal-blue">
                                            View List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8">
                        <div className="pending-approvel-conatiner">
                            <div className="justify-content-between d-flex mb-4">
                                <h4 className="fs-22-700 mb-0 justify-content-start align-items-center d-flex">Material Prize</h4>
                            </div>
                            <div className="poq-max-small scrollbar-none">
                                <table className="border-0 w-100 tbl-material-prize">
                                    <thead>
                                        <tr className="border-bottom-1">
                                            <th className="fs-16-500 text-dark text-center bg-transparent border-0">Product</th>
                                            <th className="fs-16-500 text-dark text-center text-center bg-transparent border-0">Prize <MdOutlineCurrencyRupee /></th>
                                            <th className="fs-16-500 text-dark text-center text-center bg-transparent border-0">Current Prize <MdOutlineCurrencyRupee /></th>
                                            <th className="fs-16-500 text-dark text-center text-center bg-transparent border-0">Product</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {matrials.map((matrial) => (
                                        <tr key={matrial.id} className="">
                                            <td className="fs-16-500 text-dark text-center bg-transparent">
                                            <img src={matrial.productimg} className="h32-w32 me-2" alt="profile" /> {matrial.product}</td>
                                            <td className="fs-16-500 text-dark text-center text-center bg-transparent">{matrial.prize}</td>
                                            <td className="fs-16-500 text-dark text-center bg-transparent">
                                                {matrial.currentprize}
                                                {matrial.prize !== 0 && (
                                                (() => {
                                                    const difference = ((matrial.currentprize - matrial.prize) / matrial.prize) * 100;
                                                    const isIncrease = difference > 0;

                                                    return (
                                                    <span className={`ms-2 ${isIncrease ? 'text-success' : 'text-danger'}`}>
                                                        {isIncrease ? (
                                                        <img src={profile} className="h16-w16 ms-1" alt="up-arrow" />
                                                        ) : (
                                                        <img src={constructions_img} className="h16-w16 ms-1" alt="down-arrow" />
                                                        )}
                                                        {Math.abs(difference).toFixed(0)}%
                                                    </span>
                                                    );
                                                })()
                                                )}
                                            </td>
                                            <td className="fs-16-500 text-dark text-center text-center bg-transparent"><img src={matrial.img} className="h24-w24 me-2" alt="profile" /> {matrial.vendor}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                        <div className="pending-approvel-conatiner">
                            <div className="justify-content-between d-flex mb-4">
                                <h4 className="fs-22-700 mb-0 justify-content-start align-items-center d-flex">Vendor's Inquiries</h4>
                            </div>
                            <div className="poq-max-small scrollbar-none">
                            {vendorInquiries.map((vendorInquirie) => (
                                <div key={vendorInquirie.id} className="card-boq text-decoration-none text-dark">
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <div className="">
                                            <div className="d-flex align-items-center">
                                                <img src={vendorInquirie.img} className="h24-w24 me-1" alt="profile" />
                                                <h6 className="mb-0 ms-1 fs-16-500">{vendorInquirie.vendor} 
                                                    
                                                </h6>
                                            </div>
                                            <span className="d-block fs-12-400 text-dark-gray mt-1">{vendorInquirie.user}</span>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <Link className="fs-14-40066 text-bright-royal-blue">
                                            View List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </Fragment>
  );
};

export default AqsDashboard;
