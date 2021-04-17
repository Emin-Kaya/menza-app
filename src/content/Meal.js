import React from "react";
import { Link } from "react-router-dom";

/* eslint-disable */

function Meal({ name, category, notes, prices }) {

    var students
    var pupils
    var employees
    var others
    var ergebnis = []



    try {
        students = prices.students
        if (students === null) {
            students = "Kostenlos!"
        }
        pupils = prices.pupils
        if (pupils === null) {
            pupils = "Kostenlos!"
        }
        employees = prices.employees
        if (employees === null) {
            employees = "Kostenlos!"
        }
        others = prices.employees
        if (others === null) {
            others = "Kostenlos!"
        }
        ergebnis = notes
        ergebnis.pop();
    } catch (e) {

    }

    var ergebnisse = []
    ergebnis.map(note => {
        ergebnisse.push(
            <div className="essen-inhalt" key={note} id="notiz">{note}</div>
        );
    })


    return (
        <div>
            <Link to={`/essen/${ localStorage["tag"]}`}> <img className="back" src={'/assets/back.png'} alt="zurück" width="50" height="50" /> </Link>

            <div className="essen-name">{name}</div>
            <div className="essen-kategorie">

                Kategorie: {category}
            </div>
            <div className="essen-ergebnisse">
                <div className="ueberschrift"> Inhaltsstoffe: </div>
                {ergebnisse}
            </div>
            <div className="essen-preise">
                <div className="ueberschrift">Preise: </div>
                <div className="preis-inhalt">Studenten: {students}</div>
                <div className="preis-inhalt">Schüler: {pupils}</div>
                <div className="preis-inhalt">Mitarbeiter: {employees}</div>
                <div className="preis-inhalt">Andere: {others}</div>
            </div>
        </div>


    )
}


export default Meal;