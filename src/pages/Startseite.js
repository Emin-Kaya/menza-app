import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import { Link } from "react-router-dom";

function Startseite() {

    const writeLocal = (linkDate) => {
        localStorage["tag"] = linkDate;
    }

    useEffect(() => {
        const dateHandler = async () => {
            var day = new Date();
            day.setDate(day.getDate() - 365);
            var montag = new Date(day);
            var dienstag = new Date(day);
            var mittwoch = new Date(day);
            var donnerstag = new Date(day);
            var freitag = new Date(day);
            switch (day.getDay()) {
                case (0):
                    montag.setDate(day.getDate() + 1);
                    dienstag.setDate(day.getDate() + 2);
                    mittwoch.setDate(day.getDate() + 3);
                    donnerstag.setDate(day.getDate() + 4);
                    freitag.setDate(day.getDate() + 5);
                    break;
                case (1):
                    montag.setDate(day.getDate());
                    dienstag.setDate(day.getDate() + 1);
                    mittwoch.setDate(day.getDate() + 2);
                    donnerstag.setDate(day.getDate() + 3);
                    freitag.setDate(day.getDate() + 4);
                    break;
                case (2):
                    montag.setDate(day.getDate() - 1);
                    dienstag.setDate(day.getDate());
                    mittwoch.setDate(day.getDate() + 1);
                    donnerstag.setDate(day.getDate() + 2);
                    freitag.setDate(day.getDate() + 3);
                    break;
                case (3):
                    montag.setDate(day.getDate() - 2);
                    dienstag.setDate(day.getDate() - 1);
                    mittwoch.setDate(day.getDate());
                    donnerstag.setDate(day.getDate() + 1);
                    freitag.setDate(day.getDate() + 2);
                    break;
                case (4):
                    montag.setDate(day.getDate() - 3);
                    dienstag.setDate(day.getDate() - 2);
                    mittwoch.setDate(day.getDate() - 1);
                    donnerstag.setDate(day.getDate());
                    freitag.setDate(day.getDate() + 1);
                    break;
                case (5):
                    montag.setDate(day.getDate() - 4);
                    dienstag.setDate(day.getDate() - 3);
                    mittwoch.setDate(day.getDate() - 2);
                    donnerstag.setDate(day.getDate() - 1);
                    freitag.setDate(day.getDate());
                    break;
                case (6):
                    montag.setDate(day.getDate() - 5);
                    dienstag.setDate(day.getDate() - 4);
                    mittwoch.setDate(day.getDate() - 3);
                    donnerstag.setDate(day.getDate() - 2);
                    freitag.setDate(day.getDate() - 1);
                    break;
                default:
                    montag.setDate(day.getDate() + 1);
                    dienstag.setDate(day.getDate() + 2);
                    mittwoch.setDate(day.getDate() + 3);
                    donnerstag.setDate(day.getDate() + 4);
                    freitag.setDate(day.getDate() + 5);
                    break;
            }

            const ergebnis = [];
            var wochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
            var monat = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
            var object = [montag, dienstag, mittwoch, donnerstag, freitag];
            var ausgabe = []

            object.forEach(element => { ausgabe.push(wochentag[element.getDay()] + ' ' + ("0" + element.getDate()).slice(-2) + '.' + monat[element.getMonth()] + '.' + element.getFullYear()) });
            ausgabe.forEach(element => {
                var linkDate = element.slice(-10).replace(".", "-").replace(".", "-")
                ergebnis.push(<div id="startseitetag" key={element} > < Link to={`/essen/${linkDate}`} className="linkstyle" onClick={() => writeLocal(linkDate)}> {element} </Link></div >);
            });

            setDates(ergebnis);
        }

        dateHandler()
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    const [dates, setDates] = useState([]);



    return (<div id="overlap" >
        <header>
            <h1 > {dates} </h1>
        </header>
    </div >
    );
}



export default Startseite;