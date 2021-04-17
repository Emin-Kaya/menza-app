import React, { Component } from 'react';
import '../styles/App.css';
import PopupGuthaben from "../components/PopupGuthaben"
import { openDB } from 'idb';
import firbaseApp from "../lib/firebase-config";
const messaging = firbaseApp.messaging();

/* eslint-disable */

/*
Notifications Funktionen etc. aus dem Github https://github.com/pavan-nw/fcm-client
genommen und selbst angepasst

Quelle: https://github.com/pavan-nw/fcm-client
*/

class Einstellungen extends Component {

    constructor() {
        super();
        this.state = {
            showPopup: false,
            mensa: 0,
            long: 0,
            lat: 0,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleBgCb = this.handleBgCb.bind(this);
    }

    handleBgCb(payload) {
        const payloadMsg = JSON.stringify(payload);
    }

    handleClick() {
        messaging.onMessage(this.handleBgCb);
        messaging
            .requestPermission()
            .then(() => {
                console.log("Notification permission granted.");
                messaging
                    .getToken()
                    .then(currentToken => {
                        if (currentToken) {
                            console.log("Token generated is ", currentToken);
                            this.setState(...this.state, {
                                status: "success",
                                message: currentToken
                            });
                            // sendTokenToServer(currentToken);
                            // updateUIForPushEnabled(currentToken);
                        } else {
                            // Show permission request.
                            console.log(
                                "No Instance ID token available. Request permission to generate one."
                            );
                            this.setState(...this.state, {
                                status: "error",
                                message:
                                    "No Instance ID token available. Request permission to generate one."
                            });

                            // Show permission UI.
                            // updateUIForPushPermissionRequired();
                            // setTokenSentToServer(false);
                        }
                    })
                    .catch(err => {
                        console.log("An error occurred while retrieving token. ", err);

                        // showToken('Error retrieving Instance ID token. ', err);
                        // setTokenSentToServer(false);
                    });
            })
            .catch(err => {
                console.log("Unable to get permission to notify.", err);
            });
    } handleBgCb(payload) {
        console.log(payload);
        const payloadMsg = JSON.stringify(payload);
    }

    handleClick() {
        console.log(messaging);
        messaging.onMessage(this.handleBgCb);
        messaging
            .requestPermission()
            .then(() => {
                console.log("Notification permission granted.");
                messaging
                    .getToken()
                    .then(currentToken => {
                        if (currentToken) {
                            console.log("Token generated is ", currentToken);
                            this.setState(...this.state, {
                                status: "success",
                                message: currentToken
                            });
                            // sendTokenToServer(currentToken);
                            // updateUIForPushEnabled(currentToken);
                        } else {
                            // Show permission request.
                            console.log(
                                "No Instance ID token available. Request permission to generate one."
                            );
                            this.setState(...this.state, {
                                status: "error",
                                message:
                                    "No Instance ID token available. Request permission to generate one."
                            });

                            // Show permission UI.
                            // updateUIForPushPermissionRequired();
                            // setTokenSentToServer(false);
                        }
                    })
                    .catch(err => {
                        console.log("An error occurred while retrieving token. ", err);

                        // showToken('Error retrieving Instance ID token. ', err);
                        // setTokenSentToServer(false);
                    });
            })
            .catch(err => {
                console.log("Unable to get permission to notify.", err);
            });
    }

    fetchMensen = async () => {
        const data = await fetch(`https://openmensa.org/api/v2/canteens?near[lat]=${this.lat}&near[lng]=${this.long}&near[dist]=150`);
        const mensen = await data.json();
        this.mensa = mensen

        var mensaliste = document.getElementById("mList");

        let option;

        for (let i = 0; i < this.mensa.length; i++) {
            option = document.createElement('option');
            option.text = this.mensa[i].name;
            option.value = this.mensa[i].id;
            mensaliste.add(option)
        }
    }

    getGuthaben = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["user"], "readonly");
        var store = transaction.objectStore('user');
        var test = await store.get('guthaben');
        document.getElementById("ausgabe").innerHTML = test['guthaben'];
        db.close()
    }

    setData = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["user"], "readwrite");
        var store = transaction.objectStore('user');
        var guthabenField = document.getElementById("inField").value.replace(",", ".");
        await store.put({ guthaben: parseFloat(guthabenField) }, "guthabenCache");
        db.close()
    }

    getStoredMensa = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["mensa"], "readonly");
        var store = transaction.objectStore('mensa');
        var liste = store.getAll();
        let option;
        var mensaliste = document.getElementById("mensalistec");

        for (var i = 0; i < (await liste).length; i += 1) {
            var mensa = await store.get(i)
            option = document.createElement('option');
            option.text = mensa.name;
            option.value = mensa.id;
            mensaliste.add(option)
        }

    }

    togglePopup() {
        if (!document.getElementById("inField").value == "") {
            this.setData()
            this.setState({
                showPopup: !this.state.showPopup
            });
        }
    }

    setUserGroup = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["settings"], "readwrite");
        var store = transaction.objectStore('settings');
        await store.put({ usergroup: document.getElementById("usergroup").value }, "usergroup");
        db.close()
    }

    showPosition = (position) => {
        var location = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        }
        this.lat = location.latitude
        this.long = location.longitude
        this.fetchMensen()
        console.log(location)
    }

    componentDidMount = () => {
        window.addEventListener('load', this.update());
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition)
        } else {
            console.log("Geo Location not supported by browser");
        }
    }

    update = () => {
        this.getGuthaben();
        this.getStoredMensa();
        this.showNamen();
    }

    setFavMensa = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["user"], "readwrite");
        var store = transaction.objectStore('user');
        await store.put({ lieblingsmensa: parseFloat(document.getElementById("mensalistec").value) }, "lieblingsmensa");
        db.close()
        this.showNamen();
    }

    setFavMensaGPS = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["user"], "readwrite");
        var store = transaction.objectStore('user');
        await store.put({ lieblingsmensa: parseFloat(document.getElementById("mensalistecc").value) }, "lieblingsmensa");
        db.close()
        this.showNamen();
    }


    selectMensa = () => {
        this.getLocation();
        this.fetchMensen();
        this.verstecken();
    }

    showNamen = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["user"], "readwrite");
        var store = transaction.objectStore('user');
        var mensaLocal = await store.get('lieblingsmensa');
        this.id = mensaLocal['lieblingsmensa'];
        const data = await fetch(`https://openmensa.org/api/v2/canteens/${mensaLocal['lieblingsmensa']}/`);
        const mensa = await data.json();
        document.getElementById("mensaname").innerHTML = mensa.name
        db.close();
    }

    verstecken = () => {
        if (this.gps == 1) {
            var x = document.getElementById("mensalistecc");
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        } else {
            setTimeout(this.verstecken, 1300)
        }

    }

    fetchMensen = async () => {
        const data = await fetch(`https://openmensa.org/api/v2/canteens?near[lat]=${this.lat}&near[lng]=${this.long}&near[dist]=50`);
        const mensen = await data.json();
        this.mensa = mensen

        var mensaliste = document.getElementById("mensalistecc");
        let option;

        for (let i = 0; i < this.mensa.length; i++) {
            option = document.createElement('option');
            option.text = this.mensa[i].name;
            option.value = this.mensa[i].id;
            mensaliste.add(option)
        }
        this.gps = 1

    }
    benachrichtigung = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["settings"], "readwrite");
        var store = transaction.objectStore('settings');
        var bool = await store.get('notification');
        if (bool.notification == true) {
            await store.put({ notification: false }, "notification");
            alert("Benachrichtigungen sind jetzt ausgeschaltet!")
        } else {
            await store.put({ notification: true }, "notification");
            alert("Benachrichtigungen sind jetzt angeschaltet!")
            this.handleClick();
        }

        db.close()
    }

    render() {
        return (
            <div>
                <div className="dive">
                    <button id="push-button" onClick={this.benachrichtigung}>Benachrichtigungen (de)aktivieren</button>
                </div>
                <div className="dive">
                    <div>
                        <span>aktuelles Guthaben: &nbsp;&nbsp;&nbsp;&nbsp;</span> <span id="ausgabe"></span> <span>€</span>
                    </div>
                    <div>
                        <span>Guthaben hinzufügen:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <input type="tel" inputMode="numeric" id="inField" />
                    </div>
                    <button onClick={this.togglePopup.bind(this)}>hinzufügen</button>
                    {this.state.showPopup ?
                        <PopupGuthaben
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }
                </div>
                <div className="dive">
                    <br />
                    <span>Ich bin&nbsp;&nbsp;</span>
                    <select name="gruppe" defaultValue={""} id="usergroup" onChange={this.setUserGroup}>
                        <option value=""></option>
                        <option value="student">Student</option>
                        <option value="pupil">Schüler</option>
                        <option value="employee">Mitarbeiter</option>
                        <option value="other">jemand anderes</option>
                    </select>
                </div>
                <br />
                <div className="dive">
                    <h1>
                        Aktuell ausgewählte Mensa:
                    </h1>
                    <br />
                    <span id="mensaname"></span>
                </div>
                <div className="dive">
                    <div>
                        <select name="gruppe" defaultValue={""} id="mensalistec" className="mensaliste" onClick={this.setFavMensa}>
                            <option value="">aus gespeicherten Mensen auswählen</option>
                        </select>
                    </div>
                    <br />
                </div>
                <div className="dive">
                    <br />
                    <div>
                        <button onClick={this.selectMensa}>Lieblingsmensa ändern über GPS📍</button>
                        <select name="mensaliste" id="mensalistecc" onClick={this.setFavMensaGPS} className="mensaliste" defaultValue={""} style={{ display: "none" }}>
                            <option value=""></option>
                        </select>
                        <br />
                    </div>
                    <br />
                </div>
            </div >
        )
    }
}

export default Einstellungen;

