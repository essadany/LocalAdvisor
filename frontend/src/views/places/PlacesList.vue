<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Contenu principal -->
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Filtres (sidebar) -->
        <aside class="w-full md:w-64 bg-white rounded-lg shadow-md p-4 h-fit">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Filtres</h2>

          <!-- Recherche -->
          <div class="mb-6">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <div class="relative">
              <input
                type="text"
                id="search"
                v-model="searchQuery"
                placeholder="Nom du lieu..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <SearchIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <!-- Catégories -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Catégories</h3>
            <div class="space-y-2">
              <label v-for="(categorie, index) in categories" :key="index" class="flex items-center">
                <input
                  type="checkbox"
                  :value="categorie.name"
                  v-model="selectedCategories"
                  class="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <span class="ml-2 text-gray-700">{{ categorie.name }}</span>
              </label>
            </div>
          </div>

          <!-- Note minimale -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Note minimale</h3>
            <div class="flex items-center">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                v-model="minRating"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span class="ml-2 text-gray-700">{{ minRating }}</span>
            </div>
            <div class="flex justify-between mt-1">
              <span class="text-xs text-gray-500">1</span>
              <span class="text-xs text-gray-500">5</span>
            </div>
          </div>

          <!-- Distance -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Distance maximale</h3>
            <select
              v-model="maxDistance"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="1">1 km</option>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="20">20 km</option>
              <option value="50">50 km</option>
            </select>
          </div>

          <!-- Boutons d'action -->
          <div class="flex flex-col space-y-2">
            <button
              @click="applyFilters"
              class="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              Appliquer les filtres
            </button>
            <button
              @click="resetFilters"
              class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </aside>

        <!-- Liste des lieux -->
        <div class="flex-1">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Tous les lieux</h1>
            <div class="flex items-center">
              <span class="text-gray-600 mr-2">Trier par:</span>
              <select
                v-model="sortBy"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="popularity">Popularité</option>
                <option value="rating">Note</option>
                <option value="distance">Distance</option>
                <option value="newest">Plus récent</option>
              </select>
            </div>
          </div>

          <!-- Résultats -->
          <div v-if="paginatedLieux.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaceCard
              v-for="lieu in paginatedLieux"
              :key="lieu.placeId"
              :lieu="lieu"
            />
          </div>

          <!-- Message si aucun résultat -->
          <div v-else class="bg-white rounded-lg shadow-md p-8 text-center">
            <SearchXIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 class="text-xl font-bold text-gray-800 mb-2">Aucun lieu trouvé</h3>
            <p class="text-gray-600 mb-4">Essayez de modifier vos filtres ou d'élargir votre recherche.</p>
            <button @click="resetFilters" class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
              Réinitialiser les filtres
            </button>
          </div>

          <!-- Pagination -->
          <div class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Précédent
              </button>
              <div v-for="page in totalPages" :key="page" class="flex">
                <button
                  @click="goToPage(page)"
                  :class="[
                    'px-3 py-1 rounded-md',
                    currentPage === page
                      ? 'bg-emerald-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { SearchIcon, SearchXIcon } from 'lucide-vue-next';
import PlaceCard from '@/components/PlaceCard.vue';

// Filtres
const searchQuery = ref('');
const selectedCategories = ref<string[]>([]);
const minRating = ref(1);
const maxDistance = ref(10);
const sortBy = ref('popularity');

// Pagination
const currentPage = ref(1);
const itemsPerPage = 9;
const totalPages = computed(() => Math.ceil(filteredLieux.value.length / itemsPerPage));

// Données des lieux (simulées)
import { usePlaceStore } from '@/stores/usePlaceStore';
import { useCategoryStore } from '@/stores/useCategoryStore';

const placeStore = usePlaceStore();
const categoriesStore = useCategoryStore();
const lieux = computed(() => placeStore.places);
// Catégories
const categories = computed(() => categoriesStore.categories);


// Lieux filtrés
const filteredLieux = computed(() => {
  let result = [...lieux.value];

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(lieu =>
      lieu.name.toLowerCase().includes(query) ||
      lieu.description.toLowerCase().includes(query)
    );
  }

  // Filtre par catégories
  if (selectedCategories.value.length > 0) {
    result = result.filter(lieu => selectedCategories.value.includes(lieu.category.name));
  }

  // Filtre par note minimale
  result = result.filter(lieu => lieu.rating >= minRating.value);

  return result;
});

// Lieux paginés
const paginatedLieux = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredLieux.value.slice(startIndex, endIndex);
});

// Fonctions de pagination
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

// Fonctions pour les filtres
const applyFilters = () => {
  currentPage.value = 1; // Retour à la première page après filtrage
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategories.value = [];
  minRating.value = 1;
  maxDistance.value = 10;
  sortBy.value = 'popularity';
  currentPage.value = 1;
};

// Initialisation
onMounted(async () => {
  if (!placeStore.loading) {
    await placeStore.fetchPlaces(); // Charger les lieux si non chargés
  }

  if (!categoriesStore.loading) {
    await categoriesStore.fetchCategories(); // Charger les catégories si non chargées
  }
});
</script>
