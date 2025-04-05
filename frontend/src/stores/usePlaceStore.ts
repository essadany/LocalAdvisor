// src/store/useStore.ts
import { defineStore } from 'pinia';
import { placeApi, type Place } from '@/api/placeApi';
import { ref } from 'vue';

export const usePlaceStore = defineStore('place', {
  state: () => ({
    places: ref<Place[]>([]),
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchPlaces() {
      this.loading = true;
      this.error = null;
      try {
        this.places = await placeApi.getPlaces();
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },

    async addPlace(place: Place) {
      try {
        const newPlace = await placeApi.createPlace(place);
        this.places.push(newPlace);
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      }
    },

    async removePlace(id: number) {
      try {
        await placeApi.deletePlace(id);
        this.places = this.places.filter((place) => place.placeId !== id);
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      }
    },
  },
});
