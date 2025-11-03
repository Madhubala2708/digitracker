import React, { useState, Fragment } from 'react';
import AqsNotificationTab from './NotificationTab';

const AqsMaterials = () => {
    const [selectedSite, setSelectedSite] = useState('MRM Site');

    const sites = ['MRM Site', 'ABC Site', 'XYZ Site'];

    // Sample data for the table
    const materials = [
        { id: '01', name: 'Cement (50kg)', inStock: '500 Bags', required: '200 Bags' },
        { id: '02', name: 'PVC Pipes', inStock: '56 Unit', required: '28 Unit' },
        { id: '03', name: 'Wire (4mm)', inStock: '220 Meter', required: '0 Meter' },
        { id: '04', name: 'Oil-Based Paints (Interior)', inStock: '45 L', required: '92 L' },
        { id: '05', name: 'Cement (50kg)', inStock: '500 Bags', required: '200 Bags' },
        { id: '06', name: 'Cement (50kg)', inStock: '500 Bags', required: '200 Bags' },
        { id: '07', name: 'Cement (50kg)', inStock: '500 Bags', required: '200 Bags' },
        { id: '08', name: 'Cement (50kg)', inStock: '500 Bags', required: '200 Bags' },
        { id: '09', name: 'Cement (50kg)', inStock: '500 Bags', required: '200 Bags' },
        { id: '10', name: 'Cement (50kg)', inStock: '500 Bags', required: '200 Bags' },
        { id: '11', name: 'Cement (50kg)', inStock: '500 Bags', required: '200 Bags' },
        { id: '12', name: 'Cement (50kg)', inStock: '500 Bags', required: '200 Bags' },
        { id: '13', name: 'Cement (50kg)', inStock: '500 Bags', required: '200 Bags' },
        { id: '14', name: 'Cement (50kg)', inStock: '500 Bags', required: '200 Bags' },
    ];

    return (
        <Fragment>
            <main className="page-home d-flex">
                <div className="container-fluid">
                    <div className="row">
                        {/* Left Panel - Table */}
                        <div className="col-md-7 p-3">  {/* Added padding */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <select
                                    className="form-select select-custom"
                                    style={{ backgroundColor: '#E8E8E8' }}
                                    value={selectedSite}
                                    onChange={(e) => setSelectedSite(e.target.value)}
                                >
                                    {sites.map((site, index) => (
                                        <option key={index} value={site}>{site}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
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
                                        {materials.map((material) => (
                                            <tr key={material.id}>
                                                <td>{material.id}</td>
                                                <td>{material.name}</td>
                                                <td>{material.inStock}</td>
                                                <td
                                                    className={`required-quantity ${material.required === '0 Meter' ? 'zero-required' : ''}`}
                                                >
                                                    {material.required}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>

                        {/* Right Panel - Notifications */}
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
