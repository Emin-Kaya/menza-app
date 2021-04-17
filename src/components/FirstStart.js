import React, { Component } from "react";
import Popup from './Popup';


class FirstStart extends Component {

    constructor(props) {
        super();
        this.state = { showPopup: false };
    }

    componentDidMount = () => {
        window.addEventListener('load', this.togglePopup.bind(this));
    }

    togglePopup() {
        let visited = localStorage["alreadyVisited"];
        if (!visited) {
            this.setState({
                showPopup: !this.state.showPopup
            });
            localStorage["alreadyVisited"] = true;
        }
    }

    render() {
        return (
            <div>
                {this.state.showPopup ?
                    <Popup
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div>

        );
    }

}

export default FirstStart