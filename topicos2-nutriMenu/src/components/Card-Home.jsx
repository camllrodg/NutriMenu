import {useNavigate} from 'react-router-dom';
function CardHome(props){

    const {title, titleBtn, imageUrl} = props;

    return(
        <div className="rounded h-80 w-auto">
            <div className="h-3/6 w-auto">
                <img src={imageUrl} className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-auto p-6">
                <h3 className="font-bold">{title}</h3>
                 <button 
                        onClick={() => navigate('/client-panel')}
                        className='bg-transparent flex'
                    >
                    {titleBtn}
                    <i class="bi bi-arrow-right"></i>
                </button>
            </div>

        </div>
    )
}

export default CardHome;