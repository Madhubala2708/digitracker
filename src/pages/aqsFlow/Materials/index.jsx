import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterialsProjects } from "../../../store/slice/Aqs/materialsSlice";
import AqsNotificationTab from "./NotificationTab";

const AqsMaterials = () => {
  const dispatch = useDispatch();
  
  const [selectedSite, setSelectedSite] = useState("");

  const { projects, loading, error } = useSelector((state) => state.materials);

  useEffect(() => {
    dispatch(fetchMaterialsProjects());
  }, [dispatch]);

  return (
    <Fragment>
      <main className="page-home d-flex">
        <div className="container-fluid">
          <div className="row">

            {/* Left Panel */}
            <div className="col-md-7 p-3">

              <div className="d-flex justify-content-between align-items-center mb-3">
                <select
                  className="form-select select-custom"
                  value={selectedSite}
                  style={{ backgroundColor: "#E8E8E8" }}
                  onChange={(e) => setSelectedSite(e.target.value)}
                >
                  <option value="">Select Project</option>

                  {loading && <option>Loading...</option>}

                  {!loading &&
                    projects?.map((p) => (
                      <option key={p.projectId} value={p.projectId}>
                        {p.projectName}
                      </option>
                    ))
                  }
                </select>
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}

              {/* Table Placeholder */}
              <table className="tbl">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Material Ordered</th>
                    <th>In Stock Quantity</th>
                    <th>Required Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {/* STATIC until next API added */}
                  <tr>
                    <td>1</td>
                    <td>Demo Item</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right Notification Panel */}
            <div className="col-md-5 p-0">
              <div className="right-container">
                <AqsNotificationTab />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default AqsMaterials;
