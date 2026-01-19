import React from 'react';
import MenuCard from './MenuCard';
import { simulatedMenuData } from '../data/menuData';

function MenuSection(props){
  const { onRequestAvailability, loadingId } = props || {};

  return (
    <section className="w-full px-12 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Menú del Día</h2>
        <p className="text-sm text-emerald-700">Mostrando {simulatedMenuData.length} opciones</p>
      </div>

      <div className="flex flex-wrap gap-6">
        {simulatedMenuData.map(item => (
          item.isPublished && (
            <MenuCard
              key={item.id}
              id={item.id}
              dish={item.dish}
              price={item.price}
              stock={item.stock}
              restaurant={item.restaurant}
              imageURL={item.imageURL}
              onRequestAvailability={onRequestAvailability}
              isLoading={loadingId === item.id}
            />
          )
        ))}
      </div>
    </section>
  );
}

export default MenuSection;
