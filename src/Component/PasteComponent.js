import React, {Component} from 'react';
import axios from 'axios';
import {Input, Button, Form, FormGroup} from 'reactstrap';
import { Redirect } from 'react-router-dom';

class PasteComponent extends Component {
    constructor(){
        super();
        this.state = {
            text : '',
            alreadyExist : false,
            newLink : false,
            newUrl : ''
        }
    }

    getData = async () => {
        var url = window.location.href
        url = url.split('paste/');
        console.log(window.location.hostname);
        await axios.get("http://" + window.location.hostname + ":9000/paste/" + url[1])
        .then(result => {
            if(result.data.length >= 1){
                this.setState({
                    text : result.data[0].text,
                    alreadyExist : true
                })
                console.log(this.state);
            }
            else{
                console.log("DNE");
            }
        })
        .catch(err => console.log(err))
    }

    async componentDidMount(){
        await this.getData();
        setInterval(this.getData, 5000);
    }

    submit = async (value) => {
        // e.preventDefault();
        var url = window.location.href
        url = url.split('paste/');

        if(!this.state.alreadyExist){
            this.setState({
                alreadyExist : true
            })
            console.log("Value being sent : ",value)
            await axios.post("http://" + window.location.hostname + ":9000/paste/" + url[1], {
                text : value,
            })
            .then(result => {
                if(result.data.success){
                    this.setState({
                        text : result.data.text,
                    })
                }
                else{
                    this.setState({
                        alreadyExist : false
                    })
                }
            })
            .catch(err => console.log(err))
        }
        else{
            await axios.put("http://" + window.location.hostname + ":9000/paste/" + url[1], {
                text : value
            })
            .then(result => {
                if(result.data.success){
                    console.log("Updated");
                }
                else{
                    console.log("Somnething went wrong");
                }
            })
            .catch(err => console.log(err))
        }
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            text : e.target.value
        })
        // console.log("State : ", this.state.text);
        this.submit(e.target.value);
    }


    newLink = () => {
        console.log('random string called');
        var result = '';
        var len = 5
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (var i = len; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        const fullPath = result; 
        this.setState({
            newLink : true,
            newUrl : fullPath
        })
    }

    lmao = () =>{
        this.setState({
            newLink : false
        })
        // window.location.assign("http://localhost:3000/paste"/+this.state.newUrl)

    }

    render(){
        if(this.state.newLink){            
            this.lmao();
            // window.location.assign("http://localhost:3000/paste"/+this.state.newUrl)
            return(
                <Redirect to ={this.state.newUrl}/>
            );
            
        }
        return(
            <div className='container-fluid'>
                Place your text here
                <Form onSubmit={this.submit}>
                    <FormGroup>
                        <Input type='textarea'
                            value={this.state.text} onChange={e => this.handleChange(e)} name='text'>
                        </Input>
                    </FormGroup>
                    {/* <FormGroup>
                        <Button outline color='success' type='submit'>Share</Button>
                    </FormGroup> */}
                    <FormGroup>
                        <Button outline color='danger' type='button' onClick={this.newLink}>Find another link</Button>
                    </FormGroup>
                </Form>
            </div>  
        );
    }
}

export default PasteComponent;