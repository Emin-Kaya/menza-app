import React from 'react';
import { openDB } from 'idb';


class PopupGuthaben extends React.Component {

    const = (props) => {
        this.props.closePopup()
    }

    update = () => {
        this.getDataNew()
        this.getDataOld()
    }

    getDataOld = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["user"], "readonly");
        var store = transaction.objectStore('user');
        var value = await store.get('guthaben');
        document.getElementById("old").innerHTML = value['guthaben'];
        db.close()
    }

    getDataNew = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["user"], "readonly");
        var store = transaction.objectStore('user');
        var value = await store.get('guthabenCache');
        var oldValue = await store.get('guthaben');
        var newValue = value['guthaben'] + oldValue['guthaben']
        document.getElementById("new").innerHTML = newValue;
        db.close()
        return newValue
    }

    submitData = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["user"], "readwrite");
        var store = transaction.objectStore('user');
        var value = await store.get('guthabenCache');
        var oldValue = await store.get('guthaben');
        var newValue = value['guthaben'] + oldValue['guthaben']
        await store.put({ guthaben: parseFloat(newValue) }, 'guthaben');
        db.close()
    }

    resetInput = () => {
        window.location.reload();
        document.getElementById("inField").innerHTML = ""
    }


    render() {
        return (
            <div className='popup' id="clickCheck" onChange={this.update()}>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <button style={{ float: "right" }} onClick={this.props.closePopup} id="exit">&#10006;</button>
                    <br></br>
                    <br></br>
                    <div>Alter Wert: <l id="old"></l> </div>
                    <div>Neuer Wert: <l id="new"></l> </div>
                    <br />
                    <div style={{ margin: "0 auto" }}><button onClick={() => {
                        this.props.closePopup(); this.submitData(); this.resetInput()
                    }} id="btn" >Bestätigen</button></div>
                </div>
            </div>
        );
    }
}

export default PopupGuthaben

