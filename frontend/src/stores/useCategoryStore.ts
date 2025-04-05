import { defineStore } from 'pinia';
import { ref } from 'vue';
import { categoryApi, type Category } from '@/api/categoryApi';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: ref<Category[]>([]),
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        this.categories = await categoryApi.getCategories();
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
