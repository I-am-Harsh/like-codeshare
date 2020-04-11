import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
// import axios from 'axios';
import { Button } from 'reactstrap';

class TestComponent extends Component {
    constructor(){
        super();
        this.state = {
            redirect : false,
            url : ''
        }
    }

    componentDidMount(){
        
        // axios.get('http://localhost:9000/paste/')
    }

    

    randomString = () => {
        console.log('random string called');
        var result = '';
        var len = 5
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (var i = len; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        const fullPath = 'paste/' + result; 
        this.setState({
            url : fullPath,
            redirect : true
        })
    }
    

    render(){
        var display;
        if(this.state.redirect){
            console.log(this.state.url);
            display = <Redirect to = {this.state.url}/>
            
        }
        else{
            display = 
                <div className='container-fluid'>
                    To Share your code please click the button below <br/>
                    <Button onClick={this.randomString} color='primary' outline>Start Sharing</Button>
                </div>
        }
        return(
            <div className='container-fluid'>
                {display}
            </div>
        );
    }
}


export default TestComponent;
