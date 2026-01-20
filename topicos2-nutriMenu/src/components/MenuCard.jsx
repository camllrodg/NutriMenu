import React from 'react';

function MenuCard(props){
  const { id, dish, price, stock, restaurant, imageURL, onRequestAvailability, isLoading } = props;

  const img = imageURL || 'https://via.placeholder.com/600x400?text=Plato';

  const stockBadge = stock <= 3 ? '¡Últimos! ' + stock : `Quedan ${stock} raciones`;
  const stockColor = stock <= 3 ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80">
      <div className="relative h-44 w-full">
        <img src={img} alt={dish} className="w-full h-full object-cover" />
        <div className={`${stockColor} absolute top-3 right-3 rounded-full px-3 py-1 text-sm font-semibold`}>
          {stockBadge}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{dish}</h3>
          <span className="font-extrabold text-green-700">${price.toFixed(2)}</span>
        </div>

        <p className="text-sm text-gray-500 font-semibold mt-2">Local: {restaurant}</p>

        <div className="mt-4">
          <button
            onClick={() => !isLoading && onRequestAvailability && onRequestAvailability({ id, restaurant, dish })}
            className="w-full bg-amber-50 text-amber-900 border border-amber-100 rounded-md py-3 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-4 border-t-transparent border-amber-900 rounded-full animate-spin" />
                <span>Cargando...</span>
              </>
            ) : (
              <>
                <i className="bi bi-shop"></i>
                Solicitar pedido
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
