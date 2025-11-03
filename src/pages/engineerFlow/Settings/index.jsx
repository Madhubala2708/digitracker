import {  Tab, Tabs } from 'react-bootstrap';
import { useState } from 'react';
import GeneralSettings from '../../engineerFlow/Settings/General';

export const EngineerSettings = () => {
    const [key, setKey] = useState("general");
    return (
        <main className='container-wrapper page-settings'>
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                                        <Tab eventKey="general" className="tab-title" title="General">
                                            <GeneralSettings />
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </main>
    );
};

export default EngineerSettings;
