import { useState } from "react";
import Department from "./Department/Index";

export default function SideNav() {
    const [selectedMenu, setSelectedMenu] = useState(null);

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className="bg-white border-end vh-100 p-3 position-fixed" style={{ width: "250px" }}>
                <ul className="list-group settingsidebar">
                    <li onClick={() => setSelectedMenu("department")} className="list-group-item list-group-item-action custom-list-item">
                        Department
                    </li>
                    <li onClick={() => setSelectedMenu("kanban")} className="list-group-item list-group-item-action custom-list-item">
                        Kanban
                    </li>
                    <li onClick={() => setSelectedMenu("subscription")} className="list-group-item list-group-item-action custom-list-item">
                        Subscription
                    </li>
                    <li onClick={() => setSelectedMenu("tickets")} className="list-group-item list-group-item-action custom-list-item">
                        Tickets
                    </li>
                    <li onClick={() => setSelectedMenu("tools")} className="list-group-item list-group-item-action custom-list-item">
                        Tools
                    </li>
                    <li onClick={() => setSelectedMenu("userManagement")} className="list-group-item list-group-item-action custom-list-item">
                        User Management
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 ms-5 ps-5" style={{ marginLeft: "270px", padding: "20px" }}>
                {selectedMenu === "department" && <Department />}
                {selectedMenu === "kanban" && <h2></h2>}
                {selectedMenu === "subscription" && <h2></h2>}
                {selectedMenu === "tickets" && <h2></h2>}
                {selectedMenu === "tools" && <h2></h2>}
                {selectedMenu === "userManagement" && <h2></h2>}
            </div>
        </div>
    );
}
