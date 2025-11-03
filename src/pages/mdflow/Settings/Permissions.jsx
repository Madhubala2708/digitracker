import React from 'react'

const Permissions = () => {
  return (
<div className="container d-flex justify-content-between align-items-center">
<h3 className="mt-0 mb-3 Text-per">Permissions</h3>
    <div className="d-flex align-items-center gap-3">
        <div>
        <p>Role</p>
        <select name="Team Lead" className="form-select w-auto">
            <option>Team Lead</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
        </select>
        </div>

        <div>
        <p>Department</p>
        <select name="Quantity Surveyor" className="form-select w-auto">
            <option>Quantity Surveyor</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
        </select>
        </div>
    </div>
</div>


  )
}

export default Permissions
