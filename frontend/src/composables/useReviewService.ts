import { reviewApi, type Review } from "@/api/reviewApi";
import { ref } from "vue";

export function useReviewService() {
  const errorMessage = ref("");

  const getReviewsByPlace = async (place_id: number) => {
    try {
      return await reviewApi.fetchReviewsByPlaceId(place_id);
    } catch (error) {
      errorMessage.value = "Erreur lors du chargement des avis";
      console.error(error);
      return [];
    }
  };

  const getReviewsByUser = async (user_id: number) => {
    try {
      return await reviewApi.fetchReviewsByUserId(user_id);
    } catch (error) {
      errorMessage.value = "Erreur lors du chargement des avis";
      console.error(error);
      return [];
    }
  };

  const createReview = async (review: Review) => {
    try {
      await reviewApi.createReview(review);
    } catch (error) {
      errorMessage.value = "Erreur lors de la création";
      console.error(error);
    }
  };

  const updateReview = async (review: Review) => {
    try {
      await reviewApi.updateReview(review);
    } catch (error) {
      errorMessage.value = "Erreur lors de la mise à jour";
      console.error(error);
    }
  };

  const deleteReview = async (review_id: number) => {
    try {
      await reviewApi.deleteReview(review_id);
    } catch (error) {
      errorMessage.value = "Impossible de supprimer l'avis";
      console.error(error);
    }
  };

  return { getReviewsByPlace, getReviewsByUser, createReview, updateReview, deleteReview, errorMessage };
}
