import React, { Fragment, useEffect, useState } from "react";
import { Table, Dropdown, Button } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getBoqItemsSelector } from "../../../store/selector/masterSelector";
import { useDispatch, useSelector } from "react-redux";
import { getBoqItemsAction } from "../../../store/actions/masterAction";

const Material = () => {
  const [selectedSite, setSelectedSite] = useState("MRM Site");

  const { data, loading, error } = useSelector(getBoqItemsSelector);
  const dispatch = useDispatch();
  const projectID = 221;

  const [boqItems, setBoqItems] = useState(data);

  const sites = ["MRM Site", "ABC Site", "XYZ Site"];

  const navigate = useNavigate();

  const getLevelBadge = (level) => {
    const levelColors = {
      High: "#D00416",
      Medium: "#F1C300",
      Low: "#30A335",
      Urgent: "#D00416",
    };
    return (
      <span
        className="level-badge fs-12-400 m-0-auto py-1 px-2 mx-auto"
        style={{
          backgroundColor: levelColors[level],
          padding: "2px",
          borderRadius: "3px",
          color: "white",
        }}
      >
        {level}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Pending: "#F1C300",
      Approval: "#30A335",
      "Low Stock": "#606060",
      Rejected: "#D00416",
    };
    return (
      <span
        className="status-badge"
        style={{ color: statusColors[status] || "black" }}
      >
        {status}
      </span>
    );
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const ProjectID = userData?.projects?.[0]?.projectId;

    if (ProjectID) {
      dispatch(getBoqItemsAction(ProjectID));
    }
  }, [dispatch]);

  useEffect(() => {
    setBoqItems(data);
    console.log("BOQ ITEMS DATA", data);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <Fragment>
      <main className="page-engineer-dashboard d-flex">
        <div className="left-container w-100">
          <div className="row mt-4 align-items-center">
            <div className="col-sm-6 col-md-6 col-lg-6 text-start">
              <select className="form-select select-custom" style={{ backgroundColor: "#E8E8E8" }}
                value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)}>
                {sites.map((site, index) => (
                  <option key={index} value={site}>
                    {site}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 text-right">
              <Button className="create-button border-radius-2 fs-14-600 border-0" onClick={() =>navigate("/admin/engineermaterialcreate", { state: { boqId: 123 } }) }>Create</Button>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="tbl w-100">
                  <thead>
                    <tr>
                      <th className="fs-16-500 text-center text-dark">S.No</th>
                      <th className="fs-16-500 text-center text-dark">Material List</th>
                      <th className="fs-16-500 text-center text-dark">In Stock Quantity</th>
                      <th className="fs-16-500 text-center text-dark">Required Quantity</th>
                      <th className="fs-16-500 text-center text-dark">Level</th>
                      <th className="fs-16-500 text-center text-dark">Request Status</th>
                      <th className="fs-16-500 text-center text-dark">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boqItems.map((material, index) => (
                      <tr key={index}>
                        <td className="w48 fs-16-500 text-center text-dark-gray">{index + 1}</td>
                        <td className="fs-16-500 text-center text-dark-gray">{material.itemName}</td>
                        <td className="fs-16-500 text-center text-dark-gray">100</td>
                        <td className="fs-16-500 text-center text-dark-gray">500</td>
                        <td  className="fs-16-500 text-center text-dark-gray">{getLevelBadge("High")}</td>
                        <td className="fs-16-500 text-center text-dark-gray fw-light">{getStatusBadge(material.approvalStatus)}</td>
                        <td className="fs-16-500 text-center text-dark-gray">
                          <a href="" style={{ color: material.action === "View" ? "#0456D0" : "#0456D0", }}
                            onClick={() =>
                              navigate(`/admin/materialview/${material.boqId}`)
                            }
                          >View</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Material;
