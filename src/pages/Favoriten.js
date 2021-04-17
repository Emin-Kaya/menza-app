import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { openDB } from 'idb';
import Meal from "../content/Meal";
/* eslint-disable */
function Favoriten() {


    useEffect(() => {
        getStoredMensa();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    const [favo, setFavo] = useState([]);

    const getStoredMensa = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["favorites"], "readonly");
        var store = transaction.objectStore('favorites');
        var liste = await store.getAll();
        var favArray = [];
        for (var i = 0; i < (await liste).length; i += 1) {
            var allgemein = liste[i].name
            favArray.push(
                <div key={allgemein.name} className="dive">
                    <Meal
                        name={allgemein.name}
                        category={allgemein.category}
                        notes={allgemein.notes}
                        prices={allgemein.prices}
                    />
                    <img src={'/assets/delete.png'} alt="favoriten" width="25" height="25" onClick={() => removeCart(allgemein.name)} />                </div>
            )

        }

        if (favArray.length == 0) {
            favArray.push(<div key={"bos"}>Sie haben keine Favoriten ausgewählt</div>)
        }
        setFavo(favArray)
    }


    const removeCart = async (key) => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["favorites"], "readwrite");
        var store = transaction.objectStore('favorites');
        await store.delete(key);
        db.close()
        window.location.reload();
    }

    return (
        <div className="favoriten-container">
            <div>{favo}</div>
        </div>

    )
}

export default Favoriten;
