import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { openDB } from 'idb';
/* eslint-disable */



function Rechner() {
    useEffect(() => {
        getGroup();
        getStoredMeals();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    const [favo, setFavo] = useState([]);
    const [preis, setPreis] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);


    const removeCart = async (key) => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["cart"], "readwrite");
        var store = transaction.objectStore('cart');
        await store.delete(key);
        db.close()
        window.location.reload();
    }

    const getGroup = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["settings"], "readonly");
        var store = transaction.objectStore('settings');
        var test = await store.get('usergroup');
        localStorage["group"] = test.usergroup;
        db.close()
    }

    const submitData = async (neu) => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["user"], "readwrite");
        var store = transaction.objectStore('user');
        await store.put({ guthaben: neu }, 'guthaben');
        db.close()
    }

    const berechnen = async () => {
        var guthabenadd = 0;
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["user"], "readonly");
        var store = transaction.objectStore('user');
        var test = await store.get('guthaben');
        var guthaben = test['guthaben'];
        db.close();
        clearCart();
        preis.forEach(element => {
            if (element != null) {
                guthabenadd = parseFloat(element) + parseFloat(guthabenadd)
            }
        });
        var guthabenNew = parseFloat(guthaben) - parseFloat(guthabenadd);
        submitData(guthabenNew);
        alert(`Dein neues Guthaben beträgt: ${guthabenNew}€`)
        window.location.reload();
    }

    const clearCart = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["cart"], "readwrite");
        var store = transaction.objectStore('cart');
        await store.clear();
        db.close()
    }


    const getStoredMeals = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["cart"], "readonly");
        var store = transaction.objectStore('cart');
        var liste = await store.getAll();
        var favArray = [];
        var preise = [];
        var localgroup = localStorage["group"];

        for (var i = 0; i < (await liste).length; i += 1) {
            var allgemein = liste[i].name;

            switch (localgroup) {
                case "pupil":
                    preise.push(allgemein.prices.pupils);
                    favArray.push(
                        <div className="dive" key={allgemein.id}>
                            {allgemein.name} €&nbsp;
                            <span className="preisanzeige">{allgemein.prices.pupils}€</span>
                            <br />
                            <img src={'/assets/delete.png'} alt="favoriten" width="25" height="25" onClick={() => removeCart(allgemein.name)} />
                        </div>
                    )
                    break;
                case "student":
                    preise.push(allgemein.prices.students);
                    favArray.push(
                        <div className="dive" key={allgemein.id}>
                            {allgemein.name}&nbsp;
                            <span className="preisanzeige">{allgemein.prices.students}€</span>
                            <br />
                            <img src={'/assets/delete.png'} alt="favoriten" width="25" height="25" onClick={() => removeCart(allgemein.name)} />
                        </div>
                    )
                    break;
                case "employee":
                    preise.push(allgemein.prices.employees);
                    favArray.push(
                        <div className="dive" key={allgemein.id}>
                            {allgemein.name}&nbsp;
                            <span className="preisanzeige">{allgemein.prices.employees}€</span>
                            <br />
                            <img src={'/assets/delete.png'} alt="favoriten" width="25" height="25" onClick={() => removeCart(allgemein.name)} />
                        </div>
                    )
                    break;
                case "other":
                    preise.push(allgemein.prices.others)
                    favArray.push(
                        <div className="dive" key={allgemein.id}>
                            {allgemein.name}&nbsp;
                            <span className="preisanzeige">{allgemein.prices.others}€</span>
                            <br />
                            <img src={'/assets/delete.png'} alt="favoriten" width="25" height="25" onClick={() => removeCart(allgemein.name)} />
                        </div>
                    )
                    break;
                default:
                    preise.push(allgemein.prices.students)
                    favArray.push(
                        <div className="dive" key={allgemein.id}>
                            {allgemein.name}&nbsp;
                            <span className="preisanzeige">{allgemein.prices.students}€</span>
                            <br />
                            <img className="trash" src={'/assets/delete.png'} alt="favoriten" width="25" height="25" onClick={() => removeCart(allgemein.name)} />
                        </div>
                    )
                    break;
            }

        }
        setFavo(favArray)
        setPreis(preise)
    }

    return (
        <div className="favoriten-container">
            <h1>Zum Korb hinzugefügtes Essen:</h1>
            <div>{favo}</div>
            <br />
            <div className="dive">
                <button className="btn" onClick={() => berechnen()}>Berechnen!</button>
            </div>
        </div>
    )





}

export default Rechner;
