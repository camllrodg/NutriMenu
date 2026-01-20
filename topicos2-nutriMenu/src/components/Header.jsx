import {Link} from 'react-router-dom';

function Header(){
    return(
        <header className='fixed top-0 left-0 w-full shadow-md flex justify-between items-center px-28 py-5 bg-white z-50 group'>
            <div className='flex gap-3 items-center'>
                <i className="bi bi-egg-fill text-lg text-gray-600 p-2 rounded-full bg-gray-300"></i>
                <p className="text-xl font-bold text-gray-600">NutriMenu UCAB</p>
            </div>

            <Link to="/">
                <i className="bi bi-house-door-fill text-3xl p-2 rounded-full group-hover:bg-gray-300 transition-colors duration-300"></i>
            </Link>
        </header>
    )
}

export default Header;