import { useNavigate } from 'react-router-dom';

function ClientPanel() {

    const navigate = useNavigate();

    return(
        <>
            <h1 className='text-6xl font-bold'>Panel de Cliente</h1>
            <button 
                onClick={() => navigate('/')}
                className='p-5 bg-red-700 text-white rounded'
            >
            Go to Home
            </button>  
        </>
    )
}

export default ClientPanel;