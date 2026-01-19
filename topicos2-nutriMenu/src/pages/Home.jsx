import React from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import CardHome from '../components/Card-Home';

function Home(){

    const navigate = useNavigate();

    return(
        <>
            <div>
                {/* Header Component */}
                <Header />

                {/* Main Content */}
                <div className='min-h-screen bg-gray-200 px-48 py-8 flex flex-col justify-start items-center gap-8'>
                    <h1 className='text-5xl font-bold text-center'>Bienvenido a Nutrimenu</h1>
                    <p className='font-semibold text-gray-500'>Selecciona tu perfil para ingresar al sistema de gestion de comedor universitario</p>

                    {/* Cards Section */}
                    <div className='flex gap-3'>
                        <CardHome 
                        title="Acceso Estudiante"
                        titleBtn="Ingresar al portal"
                        imageUrl="https://cdn7.kiwilimon.com/articuloimagen/32308/450x450/32455.jpg.webp"
                        />
                        <CardHome 
                            title="Acceso Administrador"
                            titleBtn="Panel de control"
                            imageUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/9b/05/c5/restaurante-rick-s.jpg?w=900&h=500&s=1"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;