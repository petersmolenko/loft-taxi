import React from 'react'
import './Main.css'
import Login from '../Login'
import Signup from '../Signup'
import Map from '../Map'
import Profile from '../Profile'


class Main extends React.Component {
    render() {
        return (
            <main className='Main'>
                <div className="Main__content">
                    {this.renderPage(this.props.page)}
                </div>
            </main>
        )
    }

    renderPage = (page) => {
        switch (page) {
            case 'login':
                return <Login setRoute={this.props.setRoute}/>
            case 'signup':
                return <Signup setRoute={this.props.setRoute}/>
            case 'map':
                return <Map stopSubmit = {this.stopSubmit} />
            case 'profile':
                return <Profile stopSubmit = {this.stopSubmit}/>
            default:
              return null;
          }
    }

    stopSubmit = e => {
        e.preventDefault();
        console.log('Data submited')
    }
}

export default Main