import { useAuth } from "@/composables/useAuth";

export interface Review {
  review_id: number;
  place_id: number;
  user_id: number;
  rating: number;
  content: string;
  createdAt: string;
}

const { token } = useAuth();

export const reviewApi = {
  fetchReviewsByPlaceId: async (place_id: number): Promise<Review[]> => {
    const response = await fetch(`/api/reviews/place/${place_id}`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });
    if (!response.ok) throw new Error('Erreur lors du chargement des Reviews');
    return await response.json();
  },

  fetchReviewsByUserId: async (user_id: number): Promise<Review[]> => {
    const response = await fetch(`/api/reviews/user/${user_id}`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });
    if (!response.ok) throw new Error('Erreur lors du chargement des Reviews');
    return await response.json();
  },

  fetchReviewById: async (review_id: string): Promise<Review | null> => {
    const response = await fetch(`/api/reviews/${review_id}`);
    if (!response.ok) throw new Error('Erreur lors du chargement du Review');
    return await response.json();
  },

  createReview: async (review: Review): Promise<Review> => {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify(review)
    });
    if (!response.ok) throw new Error('Erreur lors de la création du Review');
    return await response.json();
  },

  updateReview: async (review: Review): Promise<Review> => {
    const response = await fetch(`/api/reviews/${review.review_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify(review)
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour du Review');
    return await response.json();
  },

  deleteReview: async (id: number): Promise<void> => {
    const response = await fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` },
    });
    if (!response.ok) throw new Error("Erreur lors de la suppression du Review");
  }
}

