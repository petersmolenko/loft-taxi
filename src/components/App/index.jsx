import React from 'react';
import Header from '../Header'
import Main from '../Main'
import './App.css';


class App extends React.Component {
    state = {
        route: 'login'
    }

    render() {
        return (
            <div className='App'>
                {(this.state.route !== 'login' && this.state.route !== 'signup')
                    ? <Header name='Peter' setRoute={this.setRoute.bind(this)}/>
                    : null
                }
                <Main page={this.state.route} setRoute={this.setRoute.bind(this)}/>
            </div>
        );
    }

    setRoute = (route) => {
        this.setState({
            route: route
        }, ()=>{
            console.log('page: ', this.state.route)
        })     
    }
}

export default App;
