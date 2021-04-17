import React, { Component } from 'react';
import Sidebar from "./components/Sidebar";
import './styles/App.css';
import Startseite from "./pages/Startseite";
import MensaInfo from "./pages/MensaInfo";
import Tag from "./pages/Tag";
import Favoriten from "./pages/Favoriten";
import Rechner from "./pages/Rechner";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UeberUns from "./pages/UeberUns";
import Einstellungen from './pages/Einstellungen';
import DbServices from './services/DbServices';
import EssenDetail from './pages/EssenDetail';
import FirstStart from './components/FirstStart';

class App extends Component {

    render() {
        return (
            <div>
                <DbServices />
                <FirstStart />
                <Router>
                    <div id="scrollable">
                        <Sidebar />
                    </div>
                    <div id="overlap">
                        <Switch >
                            <Route path="/" exact component={Startseite} />
                            <Route path="/favoriten" component={Favoriten} />
                            <Route path="/rechner" component={Rechner} />
                            <Route path="/mensa-info" component={MensaInfo} />
                            <Route path="/ueber-uns" component={UeberUns} />
                            <Route path="/essen/:date" exact component={Tag} />
                            <Route path="/essen/:date/:id" component={EssenDetail} />
                            <Route path="/einstellungen" component={Einstellungen} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;


