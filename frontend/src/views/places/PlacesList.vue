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
            <div
              v-for="lieu in paginatedLieux"
              :key="lieu.id"
              class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img :src="lieu.image" :alt="lieu.name" class="w-full h-48 object-cover" />
              <div class="p-4">
                <div class="flex justify-between items-start">
                  <h2 class="text-lg font-bold text-gray-800">{{ lieu.name }}</h2>
                  <div class="flex items-center">
                    <StarIcon class="h-5 w-5 text-yellow-500" />
                    <span class="ml-1 text-gray-700">{{ lieu.note }}</span>
                  </div>
                </div>
                <p class="text-gray-600 text-sm mt-1">{{ lieu.categorie }}</p>
                <p class="text-gray-700 mt-2 line-clamp-2">{{ lieu.description }}</p>
                <div class="mt-4 flex justify-between items-center">
                  <router-link :to="`/places/${lieu.id}`" class="text-emerald-600 hover:underline">Voir détails</router-link>
                  <button @click="toggleFavori(lieu.id)" class="text-gray-400 hover:text-red-500 transition-colors">
                    <HeartIcon class="h-6 w-6" :class="{ 'text-red-500 fill-current': lieu.favori }" />
                  </button>
                </div>
              </div>
            </div>
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
import {
  SearchIcon,
  StarIcon,
  HeartIcon,
  SearchXIcon
} from 'lucide-vue-next';


// Catégories
const categories = ref([
  { name: 'Restaurants', icon: 'utensils' },
  { name: 'Cafés', icon: 'coffee' },
  { name: 'Shopping', icon: 'shopping-bag' },
  { name: 'Parcs', icon: 'tree' },
  { name: 'Hôtels', icon: 'building' },
  { name: 'Culture', icon: 'museum' }
]);

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
const lieux = ref([
  {
    id: 1,
    name: 'Le Petit Bistrot',
    categorie: 'Restaurants',
    note: 4.8,
    description: 'Un charmant bistrot français avec une cuisine authentique et une ambiance conviviale.',
    image: '/placeholder.svg?height=300&width=500',
    favori: true,
    distance: 1.2,
    popularity: 95
  },
  {
    id: 2,
    name: 'Café des Artistes',
    categorie: 'Cafés',
    note: 4.5,
    description: 'Un café cosy où les artistes locaux exposent leurs œuvres. Parfait pour travailler ou se détendre.',
    image: '/placeholder.svg?height=300&width=500',
    favori: false,
    distance: 0.8,
    popularity: 87
  },
  {
    id: 3,
    name: 'Parc des Cèdres',
    categorie: 'Parcs',
    note: 4.7,
    description: 'Un magnifique parc avec des sentiers de randonnée, des aires de jeux et des espaces de pique-nique.',
    image: '/placeholder.svg?height=300&width=500',
    favori: false,
    distance: 2.5,
    popularity: 92
  },
  {
    id: 4,
    name: 'Hôtel Bellevue',
    categorie: 'Hôtels',
    note: 4.3,
    description: 'Un hôtel élégant avec une vue imprenable sur la ville et un service impeccable.',
    image: '/placeholder.svg?height=300&width=500',
    favori: false,
    distance: 3.1,
    popularity: 88
  },
  {
    id: 5,
    name: 'Musée d\'Art Moderne',
    categorie: 'Culture',
    note: 4.6,
    description: 'Un musée fascinant présentant des œuvres d\'art contemporain d\'artistes locaux et internationaux.',
    image: '/placeholder.svg?height=300&width=500',
    favori: true,
    distance: 4.2,
    popularity: 90
  },
  {
    id: 6,
    name: 'Centre Commercial Les Arcades',
    categorie: 'Shopping',
    note: 4.0,
    description: 'Un grand centre commercial avec une variété de boutiques, restaurants et divertissements.',
    image: '/placeholder.svg?height=300&width=500',
    favori: false,
    distance: 5.5,
    popularity: 85
  },
  {
    id: 7,
    name: 'La Trattoria',
    categorie: 'Restaurants',
    note: 4.4,
    description: 'Un restaurant italien authentique proposant des pizzas, pâtes et autres spécialités italiennes.',
    image: '/placeholder.svg?height=300&width=500',
    favori: false,
    distance: 1.8,
    popularity: 89
  },
  {
    id: 8,
    name: 'Théâtre Municipal',
    categorie: 'Culture',
    note: 4.7,
    description: 'Un théâtre historique proposant une programmation variée de pièces, concerts et spectacles.',
    image: '/placeholder.svg?height=300&width=500',
    favori: false,
    distance: 2.9,
    popularity: 91
  },
  {
    id: 9,
    name: 'Boulangerie Artisanale',
    categorie: 'Cafés',
    note: 4.9,
    description: 'Une boulangerie traditionnelle offrant des pains, viennoiseries et pâtisseries faits maison.',
    image: '/placeholder.svg?height=300&width=500',
    favori: true,
    distance: 0.5,
    popularity: 96
  },
  {
    id: 10,
    name: 'Jardin Botanique',
    categorie: 'Parcs',
    note: 4.5,
    description: 'Un jardin paisible avec une collection impressionnante de plantes exotiques et locales.',
    image: '/placeholder.svg?height=300&width=500',
    favori: false,
    distance: 3.7,
    popularity: 87
  },
  {
    id: 11,
    name: 'Boutique Mode Éthique',
    categorie: 'Shopping',
    note: 4.2,
    description: 'Une boutique proposant des vêtements et accessoires éthiques et durables de créateurs locaux.',
    image: '/placeholder.svg?height=300&width=500',
    favori: false,
    distance: 1.5,
    popularity: 83
  },
  {
    id: 12,
    name: 'Auberge du Vieux Port',
    categorie: 'Hôtels',
    note: 4.6,
    description: 'Une auberge charmante située dans un bâtiment historique avec une ambiance chaleureuse.',
    image: '/placeholder.svg?height=300&width=500',
    favori: false,
    distance: 2.2,
    popularity: 88
  }
]);

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
    result = result.filter(lieu => selectedCategories.value.includes(lieu.categorie));
  }

  // Filtre par note minimale
  result = result.filter(lieu => lieu.note >= minRating.value);

  // Filtre par distance
  result = result.filter(lieu => lieu.distance <= maxDistance.value);

  // Tri
  switch (sortBy.value) {
    case 'rating':
      result.sort((a, b) => b.note - a.note);
      break;
    case 'distance':
      result.sort((a, b) => a.distance - b.distance);
      break;
    case 'newest':
      // Dans un cas réel, on aurait une date de création
      result.sort((a, b) => b.id - a.id);
      break;
    case 'popularity':
    default:
      result.sort((a, b) => b.popularity - a.popularity);
      break;
  }

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

const goToPage = (page : number) => {
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

// Fonction pour ajouter/retirer des favoris
const toggleFavori = (id : number) => {
  const lieu = lieux.value.find(item => item.id === id);
  if (lieu) {
    lieu.favori = !lieu.favori;
  }
};

// Initialisation
onMounted(() => {
  // Dans une application réelle, on chargerait les données depuis une API
});
</script>
