import React from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import CardHome from '../components/Card-Home';
import MenuSection from '../components/MenuSection';

function Home(){

    const navigate = useNavigate();

    return(
        <>
            <div>
                <Header />
                {/* Main Content */}
                <div className='min-h-screen bg-gray-100 px-48 py-8 flex flex-col justify-start items-center gap-8'>
                    <h1 className='text-6xl font-bold text-center'>Home Page</h1>

                    <MenuSection />
                </div>
            </div>
        </>
    )
}

export default Home;