import React from 'react';

function AvailabilityCard({ id, restaurant, imageURL, capacity, currentAforo, onOrder, processing }){
  const img = imageURL || 'https://via.placeholder.com/600x400?text=Local';

  const ratio = capacity > 0 ? currentAforo / capacity : 0;
  const percent = Math.min(100, Math.round(ratio * 100));

  let status = { badge: 'Disponible', color: 'bg-emerald-50 text-emerald-700', box: 'bg-emerald-50' };
  if (currentAforo >= capacity) {
    status = { badge: 'Local lleno', color: 'bg-rose-50 text-rose-700', box: 'bg-rose-50' };
  } else if (ratio >= 0.8) {
    status = { badge: 'Poca disponibilidad', color: 'bg-amber-50 text-amber-700', box: 'bg-amber-50' };
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80">
      <div className="relative h-44 w-full">
        <img src={img} alt={restaurant} className="w-full h-full object-cover" />
        <div className={`absolute top-3 right-3 rounded-full px-3 py-1 text-sm font-semibold ${status.color}`}>
          {status.badge}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg">{restaurant}</h3>

        <div className="mt-4 p-3 rounded-md border border-gray-100">
          <div className="text-sm font-medium mb-2">Ocupación actual</div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div className="h-3 bg-emerald-600" style={{ width: `${percent}%` }} />
          </div>
          <div className="text-xs text-gray-600 mt-2">{currentAforo}/{capacity}</div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => onOrder && onOrder(id)}
            className={`w-full ${processing ? 'bg-amber-300' : 'bg-emerald-800'} text-white rounded-md py-3 flex items-center justify-center gap-2`}
            disabled={processing}
          >
            {processing ? (
              <>
                <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin" />
                <span>Procesando...</span>
              </>
            ) : (
              <>
                <i className="bi bi-bag"></i>
                Realizar pedido
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvailabilityCard;
