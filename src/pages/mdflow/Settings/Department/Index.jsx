import React from 'react'
import { TopNav } from '../TopNav';
import Permissions from '../Permissions';
import SideNav from '../SideNav';

const Department = () => {
  return (
    <>
    {/* <TopNav />
    <Permissions />
    <SideNav /> */}
    <div className="container d-flex justify-content-center align-items-center">
    <table className="table table-bordered text-center"> 
    <thead>
    <tr>
        <th className="text-center table-heading ActionTable">Action</th>
        <th className="text-center table-heading Permission">Permission</th>
    </tr>
</thead>

        <tbody className='table-body'>
            <tr>
                <td>Create</td>
                <td>
                    <div className="form-check form-switch d-flex justify-content-center">
                        <input className="form-check-input" type="checkbox"/>
                    </div>
                </td>
            </tr>
            <tr>
                <td>Edit</td>
                <td>
                    <div className="form-check form-switch d-flex justify-content-center">
                        <input className="form-check-input" type="checkbox"/>
                    </div>
                </td>
            </tr>
            <tr>
                <td>Archive</td>
                <td>
                    <div className="form-check form-switch d-flex justify-content-center">
                        <input className="form-check-input" type="checkbox"/>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</>
  )
}

export default Department;
