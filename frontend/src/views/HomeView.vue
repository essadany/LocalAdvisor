<template>

  <!-- Section Héro -->
  <section class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-16">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-8 md:mb-0">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Découvrez les meilleurs lieux près de chez vous</h1>
          <p class="text-xl mb-8">Explorez, notez et partagez vos avis sur les cafés, restaurants, boutiques et
            attractions de votre ville.</p>
          <div class="bg-white rounded-lg shadow-md p-4">
            <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div class="flex-grow">
                <label for="category" class="block text-gray-700 text-sm font-medium mb-1">Je recherche</label>
                <select id="category" v-model="selectedCategory"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-gray-900">
                  <option value="">Sélectionner une catégorie</option>
                  <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="flex-grow">
                <label for="location" class="block text-gray-700 text-sm font-medium mb-1">Localisation</label>
                <input type="text" id="location" v-model="location" placeholder="Ville ou Code Postal"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-gray-900">
              </div>
              <div class="flex items-end">
                <button
                  class="w-full md:w-auto px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition">
                  Rechercher
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="md:w-1/2 md:pl-12">
          <img src="../assets/logo.svg?height=400&width=500" alt="Découverte de lieux" class="rounded-lg shadow-xl">
        </div>
      </div>
    </div>
  </section>

  <!-- Section Catégories -->
  <section v-if="!categoryStore.loading" class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Explorez par catégorie</h2>
      <div v-if="categories.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CategoryMiniCard
          v-for="categorie in categories"
          :key="categorie.categoryId"
          :categorie="categorie"
          />
      </div>
    </div>
  </section>
  <!-- si les catégories ne sont pas encore chargées , afficher un loader-->
  <section v-else class="py-16">
    <div class="container mx-auto px-4 text-center">
      <p class="text-lg text-gray-600">Chargement des catégories...</p>
      <p>{{ categoryStore.error }}</p>
      <div class="loader"></div>
    </div>
  </section>

  <!-- Lieux populaires -->
  <section v-if="!placeStore.loading" class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-4">Lieux populaires</h2>
      <p class="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Découvrez les endroits les mieux notés et les plus
        appréciés par notre communauté.</p>

      <div v-if="popularPlaces.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceCard v-for="lieu in popularPlaces" :key="lieu.placeId" :lieu="lieu" />
      </div>

      <div class="text-center mt-12">
        <button @click="router.push('/places')"
          class="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition">
          Voir plus de lieux
        </button>
      </div>
    </div>
  </section>
  <section v-else class="py-16">
    <div class="container mx-auto px-4 text-center">
      <p class="text-lg text-gray-600">Chargement des lieux...</p>
      <p>{{ placeStore.error }}</p>
      <div class="loader"></div>
    </div>
  </section>

  <!-- Avis récents -->
  <section v-if="!reviewStore.loading" class="py-16">
    <h2 class="text-3xl font-bold text-center mb-12">Avis récents</h2>
    <div v-if="recentReviews.length >0" class="container mx-auto px-4">
      <ReviewCard v-for="review in recentReviews" :key="review.reviewId" :review="review" />
    </div>
  </section>
  <section v-else class="py-16">
    <div class="container mx-auto px-4 text-center">
      <p class="text-lg text-gray-600">Chargement des avis...</p>
      <p>{{ reviewStore.error }}</p>
      <div class="loader"></div>
    </div>
  </section>

  <!-- Section Statistiques -->
  <section class="py-12 bg-emerald-600 text-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <h3 class="text-4xl font-bold mb-2">{{ stats.places }}+</h3>
          <p>Lieux référencés</p>
        </div>
        <div>
          <h3 class="text-4xl font-bold mb-2">{{ stats.users }}+</h3>
          <p>Utilisateurs actifs</p>
        </div>
        <div>
          <h3 class="text-4xl font-bold mb-2">{{ stats.reviews }}+</h3>
          <p>Avis partagés</p>
        </div>
        <div>
          <h3 class="text-4xl font-bold mb-2">{{ stats.cities }}+</h3>
          <p>Villes couvertes</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Section CTA -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-4">Partagez vos découvertes</h2>
      <p class="text-xl mb-8 max-w-2xl mx-auto text-gray-600">Vous connaissez un endroit incroyable ? Aidez les autres à
        le découvrir en ajoutant vos avis et recommandations.</p>
      <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button class="px-8 py-3 bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700 transition">
          Ajouter un lieu
        </button>
        <button
          class="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-bold rounded-md hover:bg-emerald-50 transition">
          Écrire un avis
        </button>
      </div>
    </div>
  </section>

  <!-- Application Mobile -->
  <section class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-8 md:mb-0">
          <h2 class="text-3xl font-bold mb-4">Emportez GuideLocal partout avec vous</h2>
          <p class="text-gray-600 mb-6">Téléchargez notre application mobile pour découvrir des lieux même hors
            connexion, recevoir des recommandations personnalisées et partager vos expériences en temps réel.</p>
          <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              class="flex items-center justify-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
              <AppleIcon class="h-6 w-6 mr-2" />
              <span>App Store</span>
            </button>
            <button
              class="flex items-center justify-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
              <SmartphoneIcon class="h-6 w-6 mr-2" />
              <span>Google Play</span>
            </button>
          </div>
        </div>
        <div class="md:w-1/2 md:pl-12">
          <img src="../assets/logo.svg?height=400&width=300" alt="Application mobile"
            class="mx-auto rounded-lg shadow-xl">
        </div>
      </div>
    </div>
  </section>

</template>

<script lang="ts" setup>

import { computed, onMounted, ref } from 'vue'
import {
  Smartphone as SmartphoneIcon,
  Apple as AppleIcon
} from 'lucide-vue-next'
import router from '@/router'
import { usePlaceStore } from '@/stores/usePlaceStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import { useReviewStore } from '@/stores/useReviewStore'
import PlaceCard from '@/components/PlaceCard.vue'
import ReviewCard from '@/components/ReviewCard.vue'
import CategoryMiniCard from '@/components/CategoryMiniCard.vue'

const selectedCategory = ref('')
const location = ref('')
const placeStore = usePlaceStore()
const reviewStore = useReviewStore()
const categoryStore = useCategoryStore()

const categories = computed(() => categoryStore.categories)
const popularPlaces = computed(() => placeStore.places.slice(0, 3))
const recentReviews = computed(() => reviewStore.reviews)
const stats = {
  places: '5,000',
  users: '250,000',
  reviews: '750,000',
  cities: '120'
}

// Initialisation
onMounted(async () => {
  if (!placeStore.loading) {
     await placeStore.fetchPlaces(); // Charger les lieux si non chargés
  }

  if (!reviewStore.loading) {
     await reviewStore.fetchReviews(); // Charger les avis si non chargés
  }
  if (!categoryStore.loading) {
     await categoryStore.fetchCategories(); // Charger les catégories si non chargées
  }
});

</script>
