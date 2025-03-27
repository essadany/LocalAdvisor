import { categoryApi, type Category } from "@/api/categoryApi";
import { ref } from "vue";

export function useCategoryService() {

  const errorMessage = ref("");

  const getCategories = async () => {
    try {
      return await categoryApi.fetchCategories();
    } catch (error) {
      errorMessage.value = "Erreur lors du chargement des catégories";
      console.error(error);
      return [];
    }
  };

  const createCategory = async (category: Category) => {
    try {
      await categoryApi.createCategory(category);
    } catch (error) {
      errorMessage.value = "Erreur lors de la création";
      console.error(error);
    }
  };

  const updateCategory = async (category: Category) => {
    try {
      await categoryApi.updateCategory(category);
    } catch (error) {
      errorMessage.value = "Erreur lors de la mise à jour";
      console.error(error);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await categoryApi.deleteCategory(id);
    } catch (error) {
      errorMessage.value = "Impossible de supprimer la catégorie";
      console.error(error);
    }
  };

  return { getCategories, createCategory, updateCategory, deleteCategory, errorMessage };
}


