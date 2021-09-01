import React from 'react'
import {useHistory} from "react-router-dom"

function UserProfile() {

    const history=useHistory();

    const firstname=localStorage.getItem("fname");
    const lastname=localStorage.getItem("lname");
    const gender=localStorage.getItem("gender");
    const email=localStorage.getItem("email");
    const mobile=localStorage.getItem("mobile");
     
    const onEditClick=()=>{
        history.push("/editProfile")
    }

    return (
        <div className="container p-3" style={{ boxShadow: "0px 0px 3px 0px gray" }}>
            <div>
                <h5>Profile</h5>
            </div>
            <hr></hr>
            <div className="d-flex">


            <div className="d-flex flex-column">
            <div className="p-2 font-weight-bold">Firstname</div>
            <div className="p-2 font-weight-bold">Lastname</div>
            <div className="p-2 font-weight-bold">Gender</div>
           
            <div className="p-2 font-weight-bold">Phone</div>
            <div className="p-2 font-weight-bold">Email</div>
                
            </div>
            <div className="d-flex flex-column pl-4">
            <div className="p-2">{firstname}</div>
            <div className="p-2">{lastname}</div>
            <div className="p-2">{gender}</div>
            
            <div className="p-2">{mobile}</div>
            <div className="p-2">{email}</div>
            </div>
            </div>
            <hr></hr>
            <button onClick={onEditClick} className="btn btn-secondary"><i className=" pr-2 fa fa-pencil"></i>Edit</button>
        </div>
    )
}

export default UserProfile
