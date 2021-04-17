import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { openDB } from 'idb';
import '../styles/App.css';

/* eslint eqeqeq: 0 */
/* eslint array-callback-return: 0*/

function Tag({ match }) {

    useEffect(() => {
        const fetchMeals = async () => {
            var db = await openDB('PWA_DATA', 2);
            var transaction = db.transaction(["user"], "readwrite");
            var store = transaction.objectStore('user');
            var mensa = await store.get('lieblingsmensa');
            var id = mensa['lieblingsmensa'];
            const j = match.params.date[6] + match.params.date[7] + match.params.date[8] + match.params.date[9];
            const m = match.params.date[3] + match.params.date[4]
            const d = match.params.date[0] + match.params.date[1]
            const data = await fetch(`https://openmensa.org/api/v2/canteens/${id}/days/${j}-${m}-${d}/meals`);
            const meals = await data.json();
            var ergebnis = [];
            meals.map(meal => {
                ergebnis.push(
                    <h1 key={meal.id} id="anzeige">
                        <Link className="essenname" to={`/essen/${match.params.date}/${meal.id}`}>{meal.name}
                        </Link>
                    </h1>
                );
            })
            
            if(ergebnis==0){
                ergebnis.push(
                    <div className="dive"  key={"Alles"}>
                    <img src={'/assets/bird.gif'} alt="Vogel" width="110%" height="50%" />
                    <h1 className="kein-essen-info">Leider haben wir heute kein Essen</h1> 
                     </div>            
                     )
                setChoose(ergebnis)
            }else{
                setChoose(ergebnis)
    
            }
            setMeals(meals);

        }
        fetchMeals();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    const [meals, setMeals] = useState([]);
    const [choose, setChoose] = useState([]);

    const updateChoose = (id) => {
        const category = ["Salate", "Suppen", "Aktionen", "Essen", "Beilagen", "Desserts", "Alles"];
        const ergebnis = [];
        var i=0;
        switch (id) {
            case (category[0]):
                meals.map(meal => {
                    if (meal.category == category[0]) {
                        ergebnis.push(
                            <h1 key={meal.id} id="anzeige">
                                <Link className="essenname" to={`/essen/${match.params.date}/${meal.id}`}>{meal.name}</Link>
                            </h1>
                        );
                    }
                })
                i=0;
                break;
            case (category[1]):
                meals.map(meal => {
                    if (meal.category == category[1]) {
                        ergebnis.push(
                            <h1 key={meal.id} id="anzeige">
                                <Link className="essenname" to={`/essen/${match.params.date}/${meal.id}`}>{meal.name}</Link>
                            </h1>
                        );
                    }
                })
                i=1;
                break;
            case (category[2]):
                meals.map(meal => {
                    if (meal.category == category[2]) {
                        ergebnis.push(
                            <h1 key={meal.id} id="anzeige">
                                <Link className="essenname" to={`/essen/${match.params.date}/${meal.id}`}>{meal.name}</Link>
                            </h1>
                        );
                    }
                })
                i=2;
                break;
            case (category[3]):
                meals.map(meal => {
                    if (meal.category == category[3]) {
                        ergebnis.push(
                            <h1 key={meal.id} id="anzeige">
                                <Link className="essenname" to={`/essen/${match.params.date}/${meal.id}`}>{meal.name}</Link>
                            </h1>
                        );
                    }
                })
                i=3;
                break;
            case (category[4]):
                meals.map(meal => {
                    if (meal.category == category[4]) {
                        ergebnis.push(
                            <h1 key={meal.id} id="anzeige">
                                <Link className="essenname" to={`/essen/${match.params.date}/${meal.id}`}>{meal.name}</Link>
                            </h1>
                        );
                    }
                })
                i=4;
                break;
            case (category[5]):
                meals.map(meal => {
                    if (meal.category == category[5]) {
                        ergebnis.push(
                            <h1 key={meal.id} id="anzeige">
                                <Link className="essenname" to={`/essen/${match.params.date}/${meal.id}`}>{meal.name}</Link>
                            </h1>
                        );
                    }
                })
                i=5;
                break;
            default:
                meals.map(meal => {
                    ergebnis.push(
                        <h1 key={meal.id} id="anzeige">
                            <Link className="essenname" to={`/essen/${match.params.date}/${meal.id}`}>{meal.name}</Link>
                        </h1>
                    );
                })

                break;


        }

        if(ergebnis==0){
            ergebnis.push(
                <div className="dive"  key={category[i]}>
                <img src={'/assets/bird.gif'} alt="Vogel" width="110%" height="50%" />
                <h1 className="kein-essen-info">Leider haben wir heute kein/e {category[i]}</h1> 
                 </div>            
                 )
            setChoose(ergebnis)
        }else{
            setChoose(ergebnis)

        }
    }

    return (
        <div >
            <div className="filter-btn">
                <ul id="buttons" >
                    <Link to={`/`}> <img className="back" src={'/assets/back.png'} alt="zurück" width="50" height="50" /> </Link>
                    <li onClick={() => updateChoose('Alles')}>Alles</li>
                </ul>
                <ul id="buttons1" >
                    <li onClick={() => updateChoose('Salate')}>Salate</li>
                    <li onClick={() => updateChoose('Suppen')}>Suppen</li>
                    <li onClick={() => updateChoose('Aktionen')}>Aktionen</li>
                </ul>
                <ul id="buttons1"   >
                    <li onClick={() => updateChoose("Essen")}>Essen</li>
                    <li onClick={() => updateChoose("Beilagen")}>Beilagen</li>
                    <li onClick={() => updateChoose("Desserts")}>Desserts</li>

                </ul>
            </div>

            {choose}

        </div>
    );



}

export default Tag;

