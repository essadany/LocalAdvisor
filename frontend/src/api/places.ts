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
  category_id: number;
}

const { token } = useAuth();

export const fetchPlaces = async (): Promise<Place[]> => {
  try {
    const response = await fetch('/api/places/all',{
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    }
    );
    if (!response.ok) throw new Error('Erreur lors du chargement des Places');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchPlaceById = async (id: string): Promise<Place | null> => {
  try {
    const response = await fetch(`/api/places/${id}`);
    if (!response.ok) throw new Error('Erreur lors du chargement du Place');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
