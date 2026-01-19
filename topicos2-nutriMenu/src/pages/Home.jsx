import React from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import CardHome from '../components/Card-Home';

function Home(){

    const navigate = useNavigate();

    return(
        <>
            <div>
                <Header />
                {/* Main Content */}
                <div className='min-h-screen bg-gray-100 px-48 py-8 flex flex-col justify-start items-center gap-8'>
                    <h1 className='text-6xl font-bold text-center'>Home Page</h1>

                    {/* Cards Section */}
                    <div className='flex gap-3'>
                        <CardHome 
                        title="Client Panel"
                        titleBtn="Go to Client Panel"
                        imageUrl="https://cdn7.kiwilimon.com/articuloimagen/32308/450x450/32455.jpg.webp"
                        />
                        <CardHome 
                            title="Another Panel"
                            titleBtn="Go to Another Panel"
                            imageUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/9b/05/c5/restaurante-rick-s.jpg?w=900&h=500&s=1"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;