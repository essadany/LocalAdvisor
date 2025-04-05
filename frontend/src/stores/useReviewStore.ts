import { defineStore } from "pinia";
import { reviewApi, type Review } from "@/api/reviewApi";
import { ref } from "vue";

export const useReviewStore = defineStore("review", {
  state: () => ({
    reviews : ref<Review[]>([]),
    reviewsByPlace: ref<Review[]>([]),
    reviewsByUser: ref<Review[]>([]),
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchReviews() {
      this.loading = true;
      this.error = null;
      try {
        this.reviews = await reviewApi.getAllReviews();
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

    async getReviewsByPlace(place_id: number) {
      this.loading = true;
      this.error = null;
      try {
        this.reviewsByPlace = await reviewApi.getReviewsByPlaceId(place_id);
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

    async getReviewsByUser(user_id: number) {
      this.loading = true;
      this.error = null;
      try {
        this.reviewsByUser = await reviewApi.getReviewsByUserId(user_id);
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
        return [];
      } finally {
        this.loading = false;
      }
    },

    async createReview(review: Review) {
      this.loading = true;
      this.error = null;
      try {
        const newReview = await reviewApi.createReview(review);
        this.reviews.push(newReview);
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

    async updateReview(review: Review) {
      this.loading = true;
      this.error = null;
      try {
        await reviewApi.updateReview(review);
        const index = this.reviews.findIndex((r) => r.reviewId === review.reviewId);
        if (index !== -1) {
          this.reviews[index] = review;
        }
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

    async deleteReview(review_id: number) {
      this.loading = true;
      this.error = null;
      try {
        await reviewApi.deleteReview(review_id);
        this.reviews = this.reviews.filter((review) => review.reviewId !== review_id);
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
  },
});
