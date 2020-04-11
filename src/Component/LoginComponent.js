import React from 'react';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

LoginComponent = () =>{
    
    // create a modal
    // create alternate for signup

    // validate password for login
    const url = "http://localhost:9000"


    login = () =>{
        axios.get(`${url}/login`)
        .then(result => {
            if(result.data.success === true){
                console.log("User logged in");
            }
            else if(result.data.success === false){
                console.log("The id or password did not match");
            }
            else if(result.data.success === undefined){
                console.log("The user does not exist");
            }
            else{
                console.log(result)
            }
        })
    }

    // create a user
    signup = () =>{
        axios.post(`${url}/login/signup`)
        .then(result => {
            if(result.data.success == true){
                console.log('User created')
            }
            else{
                console.log(result)
                alert('There was an error please try again');
            }
        })
    }


    return(
        <div className='container'>
            Put login stuff
        </div>
    );
}

export default LoginComponent;

