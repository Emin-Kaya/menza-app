import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import Meal from "../content/Meal";
import { openDB } from 'idb';

/* eslint-disable */

function EssenDetail({ match }) {


  useEffect(() => {
    getMeals();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const addFavMeal = async () => {
    var db = await openDB('PWA_DATA', 2);
    var transaction = db.transaction(["favorites"], "readwrite");
    var store = transaction.objectStore('favorites');
    var name = meals.name
    await store.put({ name: meals }, meals.name)
    db.close()
  }

  const addToCart = async () => {
    var db = await openDB('PWA_DATA', 2);
    var transaction = db.transaction(["cart"], "readwrite");
    var store = transaction.objectStore('cart');
    var name = meals.name
    await store.add({ name: meals }, meals.name)
    db.close()
  }

  const [meals, setMeals] = useState([]);

  const getMeals = async () => {
    var db = await openDB('PWA_DATA', 2);
    var transaction = db.transaction(["user"], "readwrite");
    var store = transaction.objectStore('user');
    var mensa = await store.get('lieblingsmensa');
    var id = mensa['lieblingsmensa'];
    const j = match.params.date[6] + match.params.date[7] + match.params.date[8] + match.params.date[9];
    const m = match.params.date[3] + match.params.date[4]
    const d = match.params.date[0] + match.params.date[1]
    const response = await fetch(`https://openmensa.org/api/v2/canteens/${id}/days/${j}-${m}-${d}/meals/${match.params.id}`);
    const data = await response.json();

    
    setMeals(data);
  }




  return (
    <div className="essen-detail">

      <Meal
        name={meals.name}
        category={meals.category}
        notes={meals.notes}
        prices={meals.prices}
      />
      <div className="logos" id="logo-btn">

        <img className="herz" src={'/assets/favoriten.png'} alt="favoriten" width="75.5" height="75.5" id="imgClickHeart" onClick={addFavMeal} />
        <img className="cart" src={'/assets/cart.png'} alt="favoriten" width="90" height="75.5" id="imgClickCart" onClick={addToCart} />
      </div>
    </div>
  );
}

export default EssenDetail;