import React from 'react';
import 'materialize-css';
import Header from './header/Header';
import Content from './Content';
import Footer from './footer/Footer';

function Layout({ children }) {
    return (
        <>
            <Header/>
            <Content content={children}/>
            <Footer/>
        </>
    );
}

export default Layout;
