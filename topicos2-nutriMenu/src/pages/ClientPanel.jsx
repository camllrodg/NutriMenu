import { useNavigate } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import MenuSection from '../components/MenuSection';

function ClientPanel() {

    const navigate = useNavigate();

    return(
        <>
            <Header />
            <MenuSection />
        </>
    )
}

export default ClientPanel;