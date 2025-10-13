import React, { createContext, useState, useContext } from 'react';
import { offers as initialOffers } from '../data/mockData';
import { useAuth } from './AuthContext';

const OfferContext = createContext(null);

export function OfferProvider({ children }) {
  const [offers, setOffers] = useState(initialOffers);
  const { user } = useAuth();

  const addOffer = (newOfferData) => {
    const randomOffset = (Math.random() - 0.5) * 0.01;
    const newPosition = [49.2331 + randomOffset, 28.4682 + randomOffset];
    const specs = [
      `Тип: ${newOfferData.category}`,
      `Количество: ${newOfferData.quantity}`,
      `Забрать до: ${newOfferData.pickupTime}`
    ];
    const newOffer = {
      ...newOfferData,
      id: Date.now(),
      userId: user.id,
      location: "Ваш город",
      position: newPosition,
      specs: specs,
      imageUrl: newOfferData.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=3174&auto.format&fit=crop'
    };
    setOffers(prevOffers => [newOffer, ...prevOffers]);
  };
   const claimOffer = (offerId) => {
    setOffers(prevOffers =>
      prevOffers.map(offer => {
        if (offer.id === offerId) {
          console.log(`Волонтер ${user.id} запрашивает оффер ${offerId}`);
          return { ...offer, status: 'Reserved', claimedBy: user.id }; // Меняем статус и записываем, кто забрал
        }
        return offer;
      })
    );
  };

    const approveClaim = (offerId) => {
    setOffers(prevOffers =>
      prevOffers.map(offer => {
        if (offer.id === offerId) {
          return { ...offer, status: 'Confirmed' }; // Меняем статус на "Подтверждено"
        }
        return offer;
      })
    );
  };

    const denyClaim = (offerId) => {
    setOffers(prevOffers =>
      prevOffers.map(offer => {
        if (offer.id === offerId) {
          // Возвращаем в активное состояние и убираем информацию о том, кто запрашивал
          return { ...offer, status: 'Active', claimedBy: null };
        }
        return offer;
      })
    );
  };

  const updateOffer = (offerId, updatedData) => {
    setOffers(prevOffers => 
      prevOffers.map(offer => {
        if (offer.id === offerId) {
          return { ...offer, ...updatedData };
        }
        return offer;
      })
    );
  };

  const deleteOffer = (offerId) => {
    setOffers(prevOffers => prevOffers.filter(offer => offer.id !== offerId));
  };

  const getOfferById = (id) => {
    return offers.find(o => o.id === parseInt(id));
  };

   const value = {
    offers,
    addOffer,
    updateOffer,
    deleteOffer,
    getOfferById,
    claimOffer, 
    approveClaim, 
    denyClaim     
  };

  return (
    <OfferContext.Provider value={value}>
      {children}
    </OfferContext.Provider>
  );
}

export function useOffers() {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error('useOffers должен использоваться внутри OfferProvider');
  }
  return context;
}