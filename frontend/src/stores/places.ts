import { fetchPlaces } from '@/api/places';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Place {
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

export const useplaceStore = defineStore('places', () => {
  const places = ref<Place[]>([]);

  //use function in api/places.ts

  const LoadPlaces = async () => {
    places.value = await fetchPlaces();
    console.log("places : ",places.value);
  }

  return {places, LoadPlaces}

})
