import React, { Component } from 'react';

class ErrorPage extends Component {
    state = {
        err: this.props.err || null,
        data: null,
        message: this.props.message || 'The requested resource can not be found. Please check url is typed correctly and all data fields have been completed.',
        code: this.props.code || 404
    }
    render() {
        let { err, data, message, code } = this.state;
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
        let error = this.props.err;
        console.log(error)
        this.setState({ err: error || null })
    }
}

export default ErrorPage;