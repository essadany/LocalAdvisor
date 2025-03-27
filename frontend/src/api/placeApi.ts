// Fonctions API pour les Places

import { useAuth } from "@/composables/useAuth";

export interface Place {
  id: number;
  name: string;
  address: string;
  city: string;
  zip: string;
  state: string;
  rating: number;
  description: string;
  image: string;
  category: object;
}

const { token } = useAuth();

export const placeApi = {
  getPlaces: async (): Promise<Place[]> => {
    const response = await fetch('/api/places/all', {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    });
    if (!response.ok) throw new Error('Erreur lors du chargement des Places');
    return await response.json();
  },

  getPlaceById: async (id: string): Promise<Place | null> => {
    const response = await fetch(`/api/places/${id}`);
    if (!response.ok) throw new Error('Erreur lors du chargement du Place');
    return await response.json();
  },

  createPlace: async (place: Place): Promise<Place> => {
    const response = await fetch('/api/places', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify(place)
    });
    if (!response.ok) throw new Error('Erreur lors de la création du Place');
    return await response.json();
  },

  updatePlace: async (place: Place): Promise<Place> => {
    const response = await fetch(`/api/places/${place.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify(place)
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour du Place');
    return await response.json();
  },

  deletePlace: async (id: number): Promise<void> => {
    const response = await fetch(`/api/places/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression du Place');
  }
};
