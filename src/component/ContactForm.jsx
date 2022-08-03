import React, { useState, useEffect } from "react";


const ContactForm = (props) => {
  const initialFieldValues = {
    fullName: "",
    mobile: "",
    email: "",
    address: "",
  };

  var [values, setValues] = useState(initialFieldValues);
  let btn;
   if(props.currentId===''){
        btn="SAVE";
   }
   else btn="UPDATE"

  useEffect(()=>{
      //  if(props.currentId===''){
      //    setValues({...initialFieldValues})
      //  }
       if(props.currentId!=='')
          setValues({
            ...props.contactObjects[props.currentId]
          }
          )
  },[props.currentId,props.contactObjects])

  function handleInputChange(event){
    const {name , value} = event.target;

    setValues(prevVal =>{
        return{
            ...prevVal, // to hold and reflect all the values simontaneously
            [name] : value
        };
    });
  }
  function handleFormSubmit(e){
     e.preventDefault();
     props.addOrEdit(values);
     setValues(initialFieldValues);
  }

  return (
    <>
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input
          className="form-control"
          placeholder="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
      <div className="form-group input-group col-md-6">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-phone"></i>
          </div>
        </div>
        <input
          className="form-control"
          placeholder="Mobile"
          name="mobile"
          value={values.mobile}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group col-md-6">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-envelope"></i>
          </div>
        </div>
        <input
          className="form-control"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
        />
      </div>
      </div>
      <div className="form-group">
                <textarea className="form-control" placeholder="Address" name="address"
                    value={values.address}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <input type="submit" value={btn} className="btn btn-primary btn-block" />
            </div>
            </form>
    </>
  );
};

export default ContactForm;
