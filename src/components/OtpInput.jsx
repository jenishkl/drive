import React, {Component, ReactDOM} from 'react';
import axios from "../axios";

class OtpInput extends React.Component {


    constructor(props) {
        super(props);
        this.state = {value: '', otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", otp6: "", disable: true};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(value1, event) {

        this.setState({[value1]: event.target.value});
    }

    handleSubmit(event) {
        const otp = `${this.state.otp1}${this.state.otp2}${this.state.otp3}${this.state.otp4}${this.state.otp5}${this.state.otp6}`;
        console.log(otp);
        axios.post('/free-trial/verify-otp', otp)
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the server (e.g., show success or error message)
                if (data.verified) {
                    console.log('OTP verified successfully!');
                } else {
                    console.log('Verification failed. Please check the OTP and try again.');
                }
            })
            .catch((error) => {
                console.error('Error occurred while verifying OTP:', error);
            });
        event.preventDefault();
    }

    inputFocus = (elmnt) => {
        console.log(elmnt);
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
            const next = elmnt.target.tabIndex - 2;
            if (next > -1) {
                const allInputs = document.querySelectorAll(".otpInput");
                allInputs[next].focus();
            }
        } else {
            console.log("next");
            const next = elmnt.target.tabIndex;
            if (next < 6) {
                const allInputs = document.querySelectorAll(".otpInput");
                allInputs[next].focus();
            }
        }
    };

    render() {
        const otp = `${this.state.otp1}${this.state.otp2}${this.state.otp3}${this.state.otp4}${this.state.otp5}${this.state.otp6}`;
        return (
            <>

                <div className="otpContainer">
                    <input
                        name="otp1"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        value={this.state.otp1}
                        onChange={e => this.handleChange("otp1", e)}
                        tabIndex="1" maxLength="1" onKeyUp={this.inputFocus}
                        pattern="^[0-9]*$"

                    />
                    <input
                        name="otp2"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        value={this.state.otp2}
                        onChange={e => this.handleChange("otp2", e)}
                        tabIndex="2" maxLength="1" onKeyUp={this.inputFocus}
                        pattern="^[0-9]*$"

                    />
                    <input
                        name="otp3"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        value={this.state.otp3}
                        onChange={e => this.handleChange("otp3", e)}
                        tabIndex="3" maxLength="1" onKeyUp={this.inputFocus}
                        pattern="^[0-9]*$"

                    />
                    <input
                        name="otp4"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        value={this.state.otp4}
                        onChange={e => this.handleChange("otp4", e)}
                        tabIndex="4" maxLength="1" onKeyUp={this.inputFocus}
                        pattern="^[0-9]*$"
                    />

                    <input
                        name="otp5"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        value={this.state.otp5}
                        onChange={e => this.handleChange("otp5", e)}
                        tabIndex="5" maxLength="1" onKeyUp={this.inputFocus}
                        pattern="^[0-9]*$"
                    />
                    <input
                        name="otp6"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        value={this.state.otp6}
                        onChange={e => this.handleChange("otp6", e)}
                        tabIndex="6" maxLength="1" onKeyUp={this.handleSubmit}
                        pattern="^[0-9]*$"
                    />
                    {/*<button className="confirm-btn" onClick={this.handleSubmit}>Verify</button>*/}
                    </div>
                <small className="text-verified mt-2 ">Verified</small>
                <small className="text-error mt-2 hidden">Verification code doesn't match!</small>
            </>
        );
    }
}

export default OtpInput;