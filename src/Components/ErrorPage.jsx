import React, { Component } from 'react';

class ErrorPage extends Component {
    state = {
        err: null,
        message: 'The requested resource can not be found. Please check url is typed correctly and all data fields have been completed.',
        code:  404
    }
    render() {
        const { message, code } = this.state;
        return (
            <div>
                <div className="errBox">
                    <div className="err">Error!</div>
                    <div className="errCode"> Code: {code} </div>
                    <img className="errImg" alt="http cats error message cat pic" src={`https://http.cat/${code}`} />
                </div>
                <p></p>
                <p className="errMsg" >{message} </p><br />
            </div>
        );
    }
    componentDidMount = () => {
        const {error, msg, message, code} = this.props.location.state
        console.dir(error)
        this.setState({ err: error || null, message: message || msg || 'The requested resource can not be found. Please check url is typed correctly and all data fields have been completed.', code: code || 404})
    }
}

export default ErrorPage;