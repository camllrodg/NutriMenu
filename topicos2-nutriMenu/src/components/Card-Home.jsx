import {useNavigate} from 'react-router-dom';

function CardHome(props)
{
    const navigate = useNavigate();
    
    const {title, titleBtn, imageUrl} = props;

    return(
        <div className="rounded-xl shadow-md h-80 w-100 overflow-hidden bg-white group">
            <div className="h-3/6 w-auto">
                <img src={imageUrl} className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-3/6 p-6 flex flex-col justify-between">
                <h2 className="font-bold text-2xl">{title}</h2>
                
                 <button 
                    onClick={() => navigate('/client-panel')}
                    className='bg-transparent rounded-3xl w-fit p-3 flex gap-2 font-semibold text-gray-500 group-hover:bg-gray-200 transition-all duration-500'
                >
                    {titleBtn}
                    <i className="bi bi-arrow-right"></i>
                </button>
            </div>

        </div>
    )
}

export default CardHome;