import { useAuth } from "@/composables/useAuth";

export interface Category {
  categoryId: number;
  name: string;
  description: string;
  icon: string;
}

const { token } = useAuth();

export const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch('/api/categories/all', {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    });
    if (!response.ok) throw new Error('Erreur lors du chargement des Categories');
    return await response.json();
  },

  getCategoryById: async (category_id: string): Promise<Category | null> => {
    const response = await fetch(`/api/categories/${category_id}`);
    if (!response.ok) throw new Error('Erreur lors du chargement du Category');
    return await response.json();
  },

  createCategory: async (category: Category): Promise<Category> => {
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify(category)
    });
    if (!response.ok) throw new Error('Erreur lors de la création du Category');
    return await response.json();
  },

  updateCategory: async (category: Category): Promise<Category> => {
    const response = await fetch(`/api/categories/${category.categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify(category)
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour du Category');
    return await response.json();
  },

  deleteCategory: async (category_id: number): Promise<void> => {
    const response = await fetch(`/api/categories/${category_id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` },
    });
    if (!response.ok) throw new Error("Erreur lors de la suppression du Category");
  },

}

