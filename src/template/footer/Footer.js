import React from 'react';

function Footer() {
    return (
        <footer className="page-footer">
            <div className="container">
                <div className="row">
                    <div className="col s6 m3">
                        <p>Indiro development.</p>
                    </div>
                    <div className="col s6 m3">
                        <h5>About</h5>
                        <ul>
                            <li><a href="https://indiro.ru/">Site</a></li>
                        </ul>
                    </div>
                    <div className="col s6 m3">
                        <h5>Connect</h5>
                        <ul>
                            <li><a href="tel:+79207501403">Phone</a></li>
                            <li><a href="mailto:web@indiro.ru">Email</a></li>
                        </ul>
                    </div>
                    <div className="col s6 m3">
                        <h5>Contact</h5>
                        <ul>
                            <li><a href="https://github.com/indiro71">Github</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
