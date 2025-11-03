import { Fragment } from "react";
import Notification from "../../../components/common/NotificationTab";
import { Link } from "react-router-dom";
export const roleCheck = { role: "admin" };

const VendorDashboard = () => {
  return (
    <Fragment>
      <main className="page-ceodashboard d-flex">
        <div className="left-container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4  mb-4">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Total POs Received</span>420
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4  mb-4">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Pending Updates</span>112
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4  mb-4">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Completed Orders</span>24
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mt-2 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="pending-approvel-conatiner">
                <h4 className="fs-20-500 my-2 mb-3">Recent Updates</h4>
                <div>
                  <table className="tbl w-100">
                    <thead>
                      <tr>
                        <th className="fs-16-500 text-dark text-center">
                          PO Number
                        </th>
                        <th className="fs-16-500 text-dark text-center">
                          Project Name
                        </th>
                        <th className="fs-16-500 text-dark text-center">
                          Date Received
                        </th>
                        <th className="fs-16-500 text-dark text-center">
                          Status
                        </th>
                        <th className="fs-16-500 text-dark text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="fs-16-500 text-dark-gray text-center">PO#1123</td>
                          <td className="fs-16-500 text-dark-gray text-center">Skyline Towers</td>
                          <td className="fs-16-500 text-dark-gray text-center">25-Apr-2025</td>
                          <td className="fs-16-500 text-dark-gray text-center"><span className="">Completed</span></td>
                          <td className="fs-16-500 text-dark-gray text-center"><Link className="text-decoration-underline text-bright-royal-blue-1">Update Status</Link></td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-container">
          <Notification />
        </div>
      </main>
    </Fragment>
  );
};

export default VendorDashboard;
