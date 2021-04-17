import React, { Component } from "react";
import { openDB } from "idb";

class DbServices extends Component {

    async guthabenInst() {
        let db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["user"], "readwrite");
        var store = transaction.objectStore('user');
        var value = await store.get('guthaben');
        try {
            if (value['guthaben'] <= 0) {
                await store.put({ guthaben: 0 }, "guthaben");
                await transaction.oncomplete;
            }
        } catch (KeyError) {
            await store.put({ guthaben: 0 }, "guthaben");
            await transaction.oncomplete;
        }
        db.close();

    }

    notification = async () => {
        var db = await openDB('PWA_DATA', 2);
        var transaction = db.transaction(["settings"], "readwrite");
        var store = transaction.objectStore('settings');
        await store.put({ notification: false }, "notification");
        db.close();
    }

    constructor() {
        super();
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
        const DATABASE_NAME = 'PWA_DATA';
        const DATABASE_VERSION = 2;
        var dbPromise = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
        dbPromise.onupgradeneeded = function (e) {
            var db = dbPromise.result;
            if (e.oldVersion < DATABASE_VERSION) {
                if (!db.objectStoreNames.contains('user')) {
                    db.createObjectStore('user');
                }
                if (!db.objectStoreNames.contains('cache')) {
                    db.createObjectStore('cache');
                }
                if (!db.objectStoreNames.contains('meal')) {
                    db.createObjectStore('meal');
                }
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings');


                }
                if (!db.objectStoreNames.contains('mensa')) {
                    db.createObjectStore('mensa');
                }
                if (!db.objectStoreNames.contains('favorites')) {
                    db.createObjectStore('favorites');
                }
                if (!db.objectStoreNames.contains('cart')) {
                    db.createObjectStore('cart');
                }
            }
        };
        this.guthabenInst();
        this.notification();

    }

    render() {
        return (
            <></>
        )
    }
}

export default DbServices;

