import React, { Fragment, useEffect, useMemo } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEngineerMaterials } from "../../../store/slice/Engineer/engineerMaterialsSlice";

const Material = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { materials, materialsLoading } = useSelector(
    (state) => state.engineerMaterials
  );

  // removed selectedSite: fetch engineer materials on component mount
  useEffect(() => {
    dispatch(fetchEngineerMaterials());
  }, [dispatch]);

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
      <span className="status-badge" style={{ color: statusColors[status] }}>
        {status}
      </span>
    );
  };

  // deep-search helper to find a human-friendly name in an object
  const findName = (obj) => {
    if (!obj || typeof obj !== "object") return null;
    const keys = [
      "itemName","name","materialName","material","item","item_name",
      "boqItemName","productName","product","title","description","label","masterItemName"
    ];
    for (const k of keys) {
      if (k in obj) {
        const v = obj[k];
        if (typeof v === "string" && v.trim()) return v.trim();
        if (typeof v === "object") {
          const rec = findName(v);
          if (rec) return rec;
        }
      }
    }
    // fallback: scan all properties for a short string value or nested name
    for (const k in obj) {
      const v = obj[k];
      if (typeof v === "string" && v.trim()) return v.trim();
      if (typeof v === "object") {
        const rec = findName(v);
        if (rec) return rec;
      }
    }
    return null;
  };

  // normalize for UI: support array of items OR array of BOQs with boqItems
  const displayMaterials = useMemo(() => {
    if (!Array.isArray(materials)) return [];

    console.log("Raw materials payload:", materials); // inspect if still needed

    const out = [];
    materials.forEach((m) => {
      if (Array.isArray(m.boqItems) && m.boqItems.length > 0) {
        m.boqItems.forEach((it) => {
          const itemName = findName(it) || findName(m) || "N/A";
          const inStock =
            it.inStockQuantity ?? it.inStock ?? it.stockQty ?? it.availableQty ?? 0;
          const required =
            it.requiredQuantity ?? it.quantity ?? it.qty ?? it.required ?? 0;

          out.push({
            boqId: m.boqId ?? m.id,
            itemName,
            inStockQuantity: inStock,
            requiredQuantity: required,
            level: it.level ?? m.level ?? "Low",
            approvalStatus: m.approvalStatus ?? it.status ?? "Pending",
            raw: { parent: m, item: it },
          });
        });
      } else {
        const itemName = findName(m) || m.boqName || "N/A";
        const inStock =
          m.inStockQuantity ?? m.inStock ?? m.stockQty ?? m.availableQty ?? 0;
        const required =
          m.requiredQuantity ?? m.quantity ?? m.qty ?? m.required ?? 0;

        out.push({
          boqId: m.boqId ?? m.id,
          itemName,
          inStockQuantity: inStock,
          requiredQuantity: required,
          level: m.level ?? "Low",
          approvalStatus: m.approvalStatus ?? "Pending",
          raw: { item: m },
        });
      }
    });
    return out;
  }, [materials]);

  return (
    <Fragment>
      <main className="page-engineer-dashboard d-flex">
        <div className="left-container w-100">
          <div className="row mt-4 align-items-center">

            {/* 🔥 Title instead of dropdown */}
            <div className="col-sm-6 col-md-6 col-lg-6 text-start">
              <h2 className="fs-24-600 text-dark">SKS Park</h2>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-6 text-right">
              <Button
                className="create-button border-radius-2 fs-14-600 border-0"
                onClick={() => navigate("/admin/engineermaterialcreate")}
              >
                Create
              </Button>
            </div>
          </div>

          {/* Table */}
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
                    {materialsLoading ? (
                      <tr>
                        <td colSpan="7" className="text-center text-muted">
                          Loading materials...
                        </td>
                      </tr>
                    ) : displayMaterials && displayMaterials.length > 0 ? (
                      displayMaterials.map((material, index) => (
                        <tr key={material.boqId || index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{material.itemName || "N/A"}</td>
                          <td className="text-center">{material.inStockQuantity || 0}</td>
                          <td className="text-center">{material.requiredQuantity || 0}</td>
                          <td className="text-center">{getLevelBadge(material.level || "Low")}</td>
                          <td className="text-center">{getStatusBadge(material.approvalStatus || "Pending")}</td>
                          <td className="text-center">
                            <a
                              href="#"
                              style={{ color: "#0456D0" }}
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/admin/materialview/${material.boqId}`, {
                                  state: { material },
                                });
                              }}
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center text-muted">
                          No materials found for SKS Park.
                        </td>
                      </tr>
                    )}
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
