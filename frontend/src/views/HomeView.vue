<template>

    <!-- Section Héro -->
    <section class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Découvrez les meilleurs lieux près de chez vous</h1>
            <p class="text-xl mb-8">Explorez, notez et partagez vos avis sur les cafés, restaurants, boutiques et attractions de votre ville.</p>
            <div class="bg-white rounded-lg shadow-md p-4">
              <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div class="flex-grow">
                  <label for="category" class="block text-gray-700 text-sm font-medium mb-1">Je recherche</label>
                  <select id="category" v-model="selectedCategory" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-gray-900">
                    <option value="">Sélectionner une catégorie</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div class="flex-grow">
                  <label for="location" class="block text-gray-700 text-sm font-medium mb-1">Localisation</label>
                  <input type="text" id="location" v-model="location" placeholder="Ville ou Code Postal" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-gray-900">
                </div>
                <div class="flex items-end">
                  <button class="w-full md:w-auto px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition">
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
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Explorez par catégorie</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="category in categories" :key="category.id" class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <component :is="category.icon" class="h-8 w-8 text-emerald-600" />
            </div>
            <h3 class="text-lg font-semibold mb-2">{{ category.name }}</h3>
            <p class="text-gray-600 text-sm">{{ category.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Lieux populaires -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-4">Lieux populaires</h2>
        <p class="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Découvrez les endroits les mieux notés et les plus appréciés par notre communauté.</p>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="place in popularPlaces" :key="place.id" class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="relative">
              <img :src="place.image" :alt="place.name" class="w-full h-48 object-cover">
              <div class="absolute top-4 right-4 bg-emerald-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                {{ place.rating }} ★
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center mb-4">
                <div class="bg-emerald-100 p-2 rounded-full mr-4">
                  <component :is="place.categoryIcon" class="h-5 w-5 text-emerald-600" />
                </div>
                <span class="text-sm text-gray-600">{{ place.category }}</span>
              </div>
              <h3 class="text-xl font-bold mb-2">{{ place.name }}</h3>
              <p class="text-gray-600 mb-4">{{ place.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">{{ place.location }}</span>
                <button class="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50 transition">
                  Voir détails
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <button class="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition">
            Voir plus de lieux
          </button>
        </div>
      </div>
    </section>

    <!-- Avis récents -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Avis récents</h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="review in recentReviews" :key="review.id" class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center mb-4">
              <img :src="review.userAvatar" :alt="review.userName" class="w-12 h-12 rounded-full mr-4">
              <div>
                <h4 class="font-semibold">{{ review.userName }}</h4>
                <p class="text-sm text-gray-500">à propos de <span class="font-medium text-emerald-600">{{ review.placeName }}</span></p>
              </div>
            </div>
            <div class="flex text-yellow-400 mb-2">
              <Star v-for="i in 5" :key="i" class="h-4 w-4" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'" />
            </div>
            <p class="text-gray-600 italic">"{{ review.comment }}"</p>
            <p class="text-sm text-gray-500 mt-4">{{ review.date }}</p>
          </div>
        </div>
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
        <p class="text-xl mb-8 max-w-2xl mx-auto text-gray-600">Vous connaissez un endroit incroyable ? Aidez les autres à le découvrir en ajoutant vos avis et recommandations.</p>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button class="px-8 py-3 bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700 transition">
            Ajouter un lieu
          </button>
          <button class="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-bold rounded-md hover:bg-emerald-50 transition">
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
            <p class="text-gray-600 mb-6">Téléchargez notre application mobile pour découvrir des lieux même hors connexion, recevoir des recommandations personnalisées et partager vos expériences en temps réel.</p>
            <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button class="flex items-center justify-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
                <AppleIcon class="h-6 w-6 mr-2" />
                <span>App Store</span>
              </button>
              <button class="flex items-center justify-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
                <SmartphoneIcon class="h-6 w-6 mr-2" />
                <span>Google Play</span>
              </button>
            </div>
          </div>
          <div class="md:w-1/2 md:pl-12">
            <img src="../assets/logo.svg?height=400&width=300" alt="Application mobile" class="mx-auto rounded-lg shadow-xl">
          </div>
        </div>
      </div>
    </section>

</template>

<script lang="ts" setup>

import { ref } from 'vue'
import {
  Coffee,
  Utensils,
  ShoppingBag,
  Scissors,
  Building,
  Landmark,
  Hotel,
  Music,
  Star,
  Smartphone as SmartphoneIcon,
  Apple as AppleIcon
} from 'lucide-vue-next'

const selectedCategory = ref('')
const location = ref('')


const categories = [
  {
    id: 1,
    name: 'Restaurants',
    icon: Utensils,
    description: 'Découvrez les meilleurs restaurants près de chez vous'
  },
  {
    id: 2,
    name: 'Cafés & Bars',
    icon: Coffee,
    description: 'Trouvez le café parfait pour votre pause'
  },
  {
    id: 3,
    name: 'Shopping',
    icon: ShoppingBag,
    description: 'Boutiques, centres commerciaux et marchés'
  },
  {
    id: 4,
    name: 'Beauté & Bien-être',
    icon: Scissors,
    description: 'Salons de coiffure, spas et instituts de beauté'
  },
  {
    id: 5,
    name: 'Culture',
    icon: Landmark,
    description: 'Musées, galeries et sites historiques'
  },
  {
    id: 6,
    name: 'Divertissement',
    icon: Music,
    description: 'Cinémas, théâtres et lieux de spectacle'
  },
  {
    id: 7,
    name: 'Hôtels',
    icon: Hotel,
    description: 'Hébergements pour tous les budgets'
  },
  {
    id: 8,
    name: 'Services',
    icon: Building,
    description: 'Services locaux et commerces de proximité'
  }
]

const popularPlaces = [
  {
    id: 1,
    name: 'Le Petit Café',
    category: 'Café & Bar',
    categoryIcon: Coffee,
    description: 'Un café chaleureux avec une sélection de pâtisseries maison et des cafés de spécialité.',
    image: '../assets/logo.svg?height=200&width=300',
    rating: 4.9,
    location: 'Paris, 6ème'
  },
  {
    id: 2,
    name: 'Bistrot du Marché',
    category: 'Restaurant',
    categoryIcon: Utensils,
    description: 'Cuisine traditionnelle française avec des produits frais du marché. Ambiance conviviale.',
    image: '../assets/logo.svg?height=200&width=300',
    rating: 4.8,
    location: 'Lyon, 2ème'
  },
  {
    id: 3,
    name: 'Musée d\'Art Moderne',
    category: 'Culture',
    categoryIcon: Landmark,
    description: 'Collection impressionnante d\'art contemporain dans un bâtiment historique rénové.',
    image: '../assets/logo.svg?height=200&width=300',
    rating: 4.7,
    location: 'Marseille, Centre'
  }
]

const recentReviews = [
  {
    id: 1,
    userName: 'Marie Dupont',
    userAvatar: '../assets/logo.svg?height=100&width=100',
    placeName: 'Le Petit Café',
    rating: 5,
    comment: 'J\'adore cet endroit ! Le café est excellent et le personnel est très accueillant. Les pâtisseries sont à tomber par terre.',
    date: '15 juin 2023'
  },
  {
    id: 2,
    userName: 'Thomas Martin',
    userAvatar: '../assets/logo.svg?height=100&width=100',
    placeName: 'Bistrot du Marché',
    rating: 4,
    comment: 'Très bon rapport qualité-prix. Les plats sont généreux et savoureux. Seul bémol, l\'attente peut être longue le weekend.',
    date: '3 mai 2023'
  },
  {
    id: 3,
    userName: 'Sophie Leroy',
    userAvatar: '../assets/logo.svg?height=100&width=100',
    placeName: 'Musée d\'Art Moderne',
    rating: 5,
    comment: 'Une visite incontournable ! Les expositions sont fascinantes et le bâtiment est magnifique. Je recommande vivement.',
    date: '22 avril 2023'
  }
]

const stats = {
  places: '5,000',
  users: '250,000',
  reviews: '750,000',
  cities: '120'
}

</script>
