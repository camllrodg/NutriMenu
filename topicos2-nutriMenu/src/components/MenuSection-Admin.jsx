import React from 'react';
import { useState } from 'react';
import MenuCardAdmin from './MenuCard-Admin';
import { simulatedMenuData } from '../data/menuData';
import {updateDataService} from '../services/updateDataService';

function MenuSectionAdmin(){
    
    const [menuData, setMenuData] = useState(simulatedMenuData);
  return (
    <section className="w-full px-12 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Administrador de Menus</h2>
        <p className="text-sm text-emerald-700">Mostrando {menuData.length} opciones</p>
      </div>

      <div className="flex flex-wrap gap-6">
        {menuData.map(item => (
          <MenuCardAdmin
            key={item.id}
            dish={item.dish}
            price={item.price}
            stock={item.stock}
            restaurant={item.restaurant}
            imageURL={item.imageURL}
            isPublished={item.isPublished}
            updatePublicationStatus={async () => {
                await updateDataService.updateData(item.id, menuData, !item.isPublished);
                setMenuData([...menuData]); // Creamos una copia para notificar a React
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default MenuSectionAdmin;
