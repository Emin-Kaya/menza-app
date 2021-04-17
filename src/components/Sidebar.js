import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        const navStyle = {
            textDecoration: 'none'
        };
        return (
            <div id="sticked-menu">
                <div id="sidebar">
                    <div id="menueSymbol" className="toggle-btn" onClick={show}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>

                    <ul>
                        <Link to="/" style={navStyle}>
                            <li onClick={show}>
                                <div>
                                    <img src={window.location.origin + '/assets/icon128.png'} alt="logo" />
                                </div>
                            </li>
                        </Link>
                        <Link to='/favoriten' style={navStyle}><li onClick={show}>Favoriten</li></Link>
                        <Link to='/rechner' style={navStyle}><li onClick={show}>Essenskorb</li></Link>
                        <Link to='/mensa-info' style={navStyle}><li onClick={show}>Mensa Info</li></Link>
                        <Link to='/ueber-uns' style={navStyle}><li onClick={show}>Über uns</li></Link>
                        <Link to='/einstellungen' style={navStyle}>
                            <li onClick={show}>
                                <img src={window.location.origin + '/assets/settingsw32.png'} alt="settings" />
                            </li>
                        </Link>
                    </ul>
                </div>
                <div id="topnav">
                    <span id="Ueberschrift">Menza</span>
                </div>

            </div>
        );
    }
}

function show() {
    var header = document.getElementById('Ueberschrift')

    document.getElementById('sidebar').classList.toggle('active');

    if (header.style.visibility === "hidden") {
        header.style.visibility = "visible";
    } else {
        header.style.visibility = "hidden";
    }
}

export default Sidebar;


