<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Ajouter un nouveau lieu</h1>

      <div class="bg-white rounded-lg shadow-md p-6">
        <form @submit.prevent="submitPlace">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="col-span-1 md:col-span-2">
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nom du lieu *</label>
              <input
                type="text"
                id="name"
                v-model="placeData.nom"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div class="col-span-1 md:col-span-2">
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                id="description"
                v-model="placeData.description"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              ></textarea>
            </div>

            <div>
              <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
              <select
                id="category"
                v-model="placeData.categoryId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="" disabled>Sélectionnez une catégorie</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.nom }}
                </option>
              </select>
            </div>

            <div>
              <label for="image" class="block text-sm font-medium text-gray-700 mb-1">URL de l'image *</label>
              <input
                type="url"
                id="image"
                v-model="placeData.image"
                placeholder="https://example.com/image.jpg"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Adresse *</label>
              <input
                type="text"
                id="address"
                v-model="placeData.adresse"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label for="city" class="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
              <input
                type="text"
                id="city"
                v-model="placeData.ville"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label for="postal" class="block text-sm font-medium text-gray-700 mb-1">Code postal *</label>
              <input
                type="text"
                id="postal"
                v-model="placeData.codePostal"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div class="flex justify-end gap-4">
            <router-link
              to="/lieux"
              class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Annuler
            </router-link>
            <button
              type="submit"
              class="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              :disabled="submitting"
            >
              <span v-if="submitting">Envoi en cours...</span>
              <span v-else>Ajouter le lieu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePlacesStore } from '../stores/places';
import { useAuthStore } from '../stores/auth';
import { fetchCategories } from '../services/api';
import { Category } from '../types';

const router = useRouter();
const placesStore = usePlacesStore();
const authStore = useAuthStore();

const categories = ref<Category[]>([]);
const submitting = ref(false);
const placeData = ref({
  nom: '',
  description: '',
  adresse: '',
  ville: '',
  codePostal: '',
  image: '',
  categoryId: '',
  userId: 0
});

const isAuthenticated = computed(() => authStore.isAuthenticated);

onMounted(async () => {
  // Rediriger si l'utilisateur n'est pas connecté
  if (!isAuthenticated.value) {
    router.push('/login');
    return;
  }

  try {
    categories.value = await fetchCategories();
    placeData.value.userId = authStore.currentUser?.id || 0;
  } catch (err) {
    console.error("Erreur lors du chargement des catégories:", err);
  }
});

async function submitPlace() {
  if (!isAuthenticated.value) {
    router.push('/login');
    return;
  }

  submitting.value = true;
  try {
    const newPlace = await placesStore.createPlace({
      ...placeData.value,
      categoryId: Number(placeData.value.categoryId)
    });

    if (newPlace) {
      router.push(`/lieux/${newPlace.id}`);
    }
  } catch (err) {
    console.error("Erreur lors de la création du lieu:", err);
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.bg-primary {
  background-color: #4f46e5;
}
.bg-primary-dark {
  background-color: #4338ca;
}
.text-primary {
  color: #4f46e5;
}
</style>
