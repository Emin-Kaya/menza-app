import React from 'react';
import { openDB } from 'idb';
/* eslint eqeqeq: 0 */
/* eslint-disable */

class Popup extends React.Component {


    constructor() {
        super();
        this.state = {
            mensa: 0,
            gps: 0,
            x: 0,
            y: 0,
        };
    }

    showPosition = (position) => {
        var location = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        }
        this.lat = location.latitude
        this.long = location.longitude
        this.fetchMensen()
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition)
        } else {
            console.log("Geo Location not supported by browser");
        }
    }


    fetchMensen = async () => {
        const data = await fetch(`https://openmensa.org/api/v2/canteens?near[lat]=${this.lat}&near[lng]=${this.long}&near[dist]=150`);
        const mensen = await data.json();
        this.mensa = mensen
        console.log(this.mensa)
        var mensaliste = document.getElementById("mensalistep");
        let option;

        for (let i = 0; i < this.mensa.length; i++) {
            option = document.createElement('option');
            option.text = this.mensa[i].name;
            option.value = this.mensa[i].id;
            mensaliste.add(option)
        }
        this.gps = 1

        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["mensa"], "readwrite");
        var store = transaction.objectStore('mensa');
        var id;
        var name;
        var key;
        for (let i = 0; i < this.mensa.length; i++) {
            name = this.mensa[i].name;
            id = this.mensa[i].id;
            key = i
            await store.put({ name: name, id: id }, key);
        }
        db.close()
    }

    setUserGroup = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["settings"], "readwrite");
        var store = transaction.objectStore('settings');
        await store.put({ usergroup: document.getElementById("usergroupp").value }, "usergroup");
        db.close()
    }

    setFavMensa = async () => {
        var mensaid = document.getElementById("mensalistep").value
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["user"], "readwrite");
        var store = transaction.objectStore('user');
        await store.put({ lieblingsmensa: mensaid }, "lieblingsmensa");
        db.close();
    }

    setCoords = async () => {
        var mensaid = document.getElementById("mensalistep").value
        const data = await fetch(`https://openmensa.org/api/v2/canteens/${mensaid}/`);
        const list = await data.json();
        this.x = await list.coordinates[0];
        localStorage["x"] = await list.coordinates[0];
        localStorage["x"] = await this.x;
        localStorage["y"] = await list.coordinates[1];
    }

    init = async () => {
        this.setFavMensa();
        await this.setCoords();
    }

    verstecken = () => {
        if (this.gps == 1) {
            var x = document.getElementById("mensalistep");
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        } else {
            setTimeout(this.verstecken, 1400)
        }

    }

    selectMensa = () => {
        this.getLocation();
        this.fetchMensen();
        this.verstecken();
    }

    refreshPage = async () => {
        var group = document.getElementById("usergroupp");
        var liste = document.getElementById("mensalistep")
        if (group.value == "" || liste.value == "") {
            document.getElementById("error").innerHTML = "Leider kann ich dich so nicht durchlassen, überprüfe nochmal deine Eingaben!";
        } else {
            await this.init();
            this.reloadP();
        }
    }

    reloadP = () => {
        window.location.reload();
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <span>  &nbsp;Du musst noch ein paar Fragen beantworten bevor du mich benutzen kannst: </span>
                    <div className="groupdiv">
                        Ich bin &nbsp;&nbsp;
                        <select name="gruppe" id="usergroupp" defaultValue={""} onChange={this.setUserGroup}>
                            <option value=""></option>
                            <option value="student">Student</option>
                            <option value="pupil">Schüler</option>
                            <option value="employee">Mitarbeiter</option>
                            <option value="other">Anderer</option>
                        </select>
                    </div>
                    <div className="groupdiv">
                        <span>Deine Lieblingsmensa:</span> <button onClick={this.selectMensa}>klick mich📍</button>
                        <select name="mensaliste" id="mensalistep" defaultValue={""} style={{ display: "none" }}>
                            <option value=""></option>
                        </select>
                    </div>
                    <div>
                        <span id="error"></span>
                        <br />
                        <br />
                    </div>
                    <button onClick={() => { this.refreshPage(); }} style={{ margin: "auto", display: "block" }}>Fertig!</button>
                </div>
            </div >
        );
    }
}

export default Popup;
