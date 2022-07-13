import React,{ useEffect , useState } from "react";
import ContactForm from "./ContactForm";
import { dataref } from '../firebase'

const Contacts = () => {

    const [contactObjects , setcontactObjects] =useState({});
    const [currentId , setCurrentId] = useState('');

    useEffect(()=>{
        dataref.ref('contacts').on('value',snapshot =>{
            if(snapshot.val()!= null){
                setcontactObjects({
                    ...snapshot.val()
                })
            }
            else
                setcontactObjects({})
        })
    },[])
    
    function onDelete(e){
        if(window.confirm('Are u sure you want to DELETE this'))
         dataref.ref(`contacts/${e}`).remove();
    }

    const addOrEdit= obj => {
        if(currentId==='')
            dataref.ref('contacts').push(
                obj,
                err => {
                    if(err)
                    console.log(err);
                }
            )
       else {
       dataref.ref(`contacts/${currentId}`).set(
        obj,
        err => {
            if(err)
            console.log(err);
        })
    }
    setCurrentId('');
    }

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Contact Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
            <ContactForm {...({ addOrEdit, currentId, contactObjects })}/>
        </div>
        <div className="col-md-7">
        <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Full Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactObjects).map(id => {
                                    return <tr key={id}>
                                        <td>{contactObjects[id].fullName}</td>
                                        <td>{contactObjects[id].mobile}</td>
                                        <td>{contactObjects[id].email}</td>
                                        <td>
                                            <a className="btn text-primary" onClick={() => { setCurrentId(id) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => { onDelete(id) }}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
        </div>
      </div> 
    </>
  );
};

export default Contacts;
