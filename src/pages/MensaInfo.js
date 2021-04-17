import React, { Component } from 'react';
import '../styles/App.css';
import { openDB } from 'idb';
import Map from '../content/Map';
import styled from 'styled-components';


const Wrapper = styled.div`
    height: ${props => props.height};
`;

class MensaInfo extends Component {

    constructor() {
        super();
        this.state = {
            id: null,
            info: null,
        };

        this.fetchMensa = this.fetchMensa.bind(this);
    }

    fetchMensa = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["user"], "readwrite");
        var store = transaction.objectStore('user');
        var mensa = await store.get('lieblingsmensa');
        this.id = mensa['lieblingsmensa'];
        const data = await fetch(`https://openmensa.org/api/v2/canteens/${mensa['lieblingsmensa']}/`);
        const list = await data.json();
        this.info = list;
        localStorage["x"] = this.info.coordinates[0];
        localStorage["y"] = this.info.coordinates[1];
        localStorage["name"] = this.info.name;
        localStorage["address"] = this.info.address
        db.close()

        this.setState({ info: list });
    }

    componentDidMount = () => {
        this.fetchMensa();
    }

    render() {
        var name = localStorage["name"];
        var address = localStorage["address"]
        return (
            <div id="mensainfo">
                <div className="dive">
                    <div id="divheader">Deine aktuelle Lieblingsmensa:</div>
                    <br />
                    {name}<br />
                    {address}&nbsp;&nbsp;
                        <br />
                </div>
                <div>
                    <div id="divmap">
                        <Wrapper height="200px" id="mapdiv" />
                        <Map></Map>
                    </div>
                </div>
            </div>
        );

    }

}

export default MensaInfo;
