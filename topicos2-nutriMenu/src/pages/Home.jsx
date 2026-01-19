import React from 'react';
import {useNavigate} from 'react-router-dom';   

function Home(){

    const navigate = useNavigate();

    return(
        <>
            <h1 className='text-6xl font-bold'>Home Page</h1>
            <button 
                onClick={() => navigate('/client-panel')}
                className='p-5 bg-red-700 text-white rounded'
            >
            Go to Client Panel
            </button>
        </>
    )
}

export default Home;