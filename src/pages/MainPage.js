import React from 'react';
import {Link} from "react-router-dom";

export const MainPage = () => {
    return(
        <Link to={'/qr'}>QR-codes</Link>
    );
}