// stores/useImageStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { addImage, deleteImage, fetchImagesByPlaceId } from "@/api/ImageApi";

export const useImageStore = defineStore("imageStore", () => {
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);

  const addPlaceImage = async (file: File, place_id: number, user_id: number) => {
    try {
      isLoading.value = true;
      errorMessage.value = null;
      const data = await addImage(file, place_id, user_id);
      return data;
    } catch (error) {
      errorMessage.value = (error as Error).message;
    } finally {
      isLoading.value = false;
    }
  };

  const getPlaceImages = async (place_id: number) => {
    try {
      isLoading.value = true;
      errorMessage.value = null;
      const data = await fetchImagesByPlaceId(place_id);
      return data;
    } catch (error) {
      errorMessage.value = (error as Error).message;
    } finally {
      isLoading.value = false;
    }
  }


  const deletePlaceImage = async (imageId: number) => {
    try {
      isLoading.value = true;
      errorMessage.value = null;
      await deleteImage(imageId);
    } catch (error) {
      errorMessage.value = (error as Error).message;
    } finally {
      isLoading.value = false;
    }
  };


  return {
    isLoading,
    errorMessage,
    addPlaceImage,
    getPlaceImages,
    deletePlaceImage,
  };
});
