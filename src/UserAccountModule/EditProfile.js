import React from 'react'

function EditProfile() {
    const firstname=localStorage.getItem("fname");
    const lastname=localStorage.getItem("lname");
    const gender=localStorage.getItem("gender");
    const email=localStorage.getItem("email");
    const mobile=localStorage.getItem("mobile");
    return (
        <div className="container p-2">

      
      

        
        <form>
  <div class="form-group">
    <input  style={{width:"350px",margin:"auto"}} type="text" class="form-control"  placeholder="Firstname" value={firstname}/>
    </div>
    <div class="form-group">
    <input  style={{width:"350px",margin:"auto"}} type="text" class="form-control"  placeholder="Lastname" value={lastname}/>
    </div>
   
   <div style={{width:"350px",margin:"auto"}} >
    <div class="form-check form-check-inline" >
            <input className="form-check-input" type="radio" name="gender" value={gender} />
            <label className="form-check-label">Male</label>
        </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="gender" value={gender}/>
            <label className="form-check-label">Female</label>
        </div>
        </div>

    <div class="form-group">
    <input style={{width:"350px",margin:"auto"}} type="text" class="form-control"  placeholder="Phone" value={mobile}/>
    </div>

  <div class="form-group">
   <input style={{width:"350px",margin:"auto"}} type="email" class="form-control"  placeholder="Email" value={email}/>
  </div>
  <div className="text-center">
  <button type="submit" class="btn btn-primary">Submit</button>
  </div>
 
</form>
</div>

    )
}

export default EditProfile
