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

    componentDidMount(){
        var url = window.location.href
        url = url.split('paste/');
        axios.get('http://localhost:9000/paste/' + url[1])
        .then(result => {
            if(result.data.empty === undefined || result.data.empty === false){
                console.log(result.data);
                this.setState({
                    text : result.data[0].text,
                    alreadyExist : true
                })
                console.log(this.state);
            }
        })
        .catch(err => alert(err))
    }

    submit = (e) => {
        e.preventDefault();
        var url = window.location.href
        url = url.split('paste/');
        console.log(e.target.text.value);
        if(!this.state.alreadyExist){
            axios.post("http://localhost:9000/paste/" + url[1], {
                text : e.target.text.value
            })
            .then(result => {
                if(result.data.success){
                    this.setState({
                        text : result.data.text
                    })
                    console.log("result: ",result);
                }
                else{
                    console.log(result);
                }
            })
            .catch(err => alert(err))
        }
        else{
            axios.put("http://localhost:9000/paste/" + url[1], {
                text : e.target.text.value
            })
            .then(result => {
                if(result.data.success){
                    alert("updated")
                }
                else{
                    alert("Somnething went wrong");
                }
            })
            .catch(err => alert(err))
        }
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
    
    render(){
        if(this.state.newLink){            
            this.setState({
                newLink : false
            })
            return(
                <Redirect to ={this.state.newUrl}/>
            );
            
        }
        return(
            <div className='container-fluid'>
                Place your text here
                <Form onSubmit={this.submit}>
                    <FormGroup>
                        <Input type='textarea' defaultValue={this.state.text} name='text' id='text'></Input>
                    </FormGroup>
                    <FormGroup>
                        <Button outline color='success' type='submit'>Share</Button>
                    </FormGroup>
                    <FormGroup>
                        <Button outline color='danger' type='button' onClick={this.newLink}>Find another link</Button>
                    </FormGroup>
                </Form>
            </div>  
        );
    }
}

export default PasteComponent;