import React, {Component} from 'react';
// import HeaderComponent from './HeaderComponent';
import TestComponent from './TestComponent';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PasteComponent from './PasteComponent';

class MainComponent extends Component{
    // constructor(){}

    render(){
        return(
            // <HeaderComponent/>
            <BrowserRouter>
                <Switch>
                    <Route exact path ='/' component = {TestComponent}/>
                    <Route exact path ='/paste/*' component = {PasteComponent}/>    
                </Switch>
            </BrowserRouter>
            
        );
    }
}


export default MainComponent;