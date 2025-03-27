<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- En-tête de la page -->
    <section class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl font-bold mb-4">Explorez par catégorie</h1>
          <p class="text-xl">Découvrez les meilleurs lieux classés par catégorie pour faciliter votre recherche.</p>
        </div>
      </div>
    </section>

    <!-- Contenu principal -->
    <main class="flex-1 container mx-auto px-4 py-12">
      <!-- Recherche et filtres -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="relative flex-grow">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher une catégorie..."
              class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <SearchIcon class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          <div>
            <select
              v-model="sortBy"
              class="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="name">Nom (A-Z)</option>
              <option value="name-desc">Nom (Z-A)</option>
              <option value="popularity">Popularité</option>
              <option value="places">Nombre de lieux</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Liste des catégories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="categorie in filteredCategories"
          :key="categorie.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div class="relative h-48">
            <img :src="categorie.image" :alt="categorie.nom" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div class="p-6 w-full">
                <div class="flex items-center justify-between">
                  <h2 class="text-2xl font-bold text-white">{{ categorie.nom }}</h2>
                  <div class="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                    {{ categorie.nombreLieux }} lieux
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-6">
            <p class="text-gray-600 mb-4">{{ categorie.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="(tag, index) in categorie.tags" :key="index" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {{ tag }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <router-link
                :to="`/places?category=${categorie.id}`"
                class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
              >
                Voir tous les lieux
                <ArrowRightIcon class="h-4 w-4 ml-1" />
              </router-link>
              <span class="text-gray-500 text-sm">{{ categorie.nombreAvis }} avis</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Catégories populaires -->
      <section class="mt-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Catégories populaires</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="categorie in popularCategories"
            :key="categorie.id"
            class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer"
            @click="$router.push(`/places?category=${categorie.id}`)"
          >
            <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <component :is="categorie.icon" class="h-8 w-8 text-emerald-600" />
            </div>
            <h3 class="text-lg font-semibold mb-2">{{ categorie.nom }}</h3>
            <p class="text-gray-600 text-sm">{{ categorie.nombreLieux }} lieux</p>
          </div>
        </div>
      </section>

      <!-- Suggestions de catégories -->
      <section class="mt-16 bg-white rounded-lg shadow-md p-8">
        <div class="md:flex items-center justify-between">
          <div class="md:w-2/3 mb-6 md:mb-0">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Vous ne trouvez pas ce que vous cherchez ?</h2>
            <p class="text-gray-600">
              Si vous ne trouvez pas la catégorie que vous recherchez, n'hésitez pas à nous suggérer une nouvelle catégorie.
              Nous sommes toujours à l'écoute de vos besoins !
            </p>
          </div>
          <div>
            <button
              @click="showSuggestionModal = true"
              class="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              Suggérer une catégorie
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- Modal de suggestion -->
    <div v-if="showSuggestionModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-800">Suggérer une nouvelle catégorie</h3>
            <button @click="showSuggestionModal = false" class="text-gray-500 hover:text-gray-700">
              <XIcon class="h-5 w-5" />
            </button>
          </div>
          <form @submit.prevent="submitSuggestion" class="space-y-4">
            <div>
              <label for="categoryName" class="block text-sm font-medium text-gray-700 mb-1">Nom de la catégorie</label>
              <input
                type="text"
                id="categoryName"
                v-model="suggestionForm.nom"
                placeholder="Ex: Parcs d'attractions"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label for="categoryDescription" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="categoryDescription"
                v-model="suggestionForm.description"
                rows="3"
                placeholder="Décrivez brièvement cette catégorie..."
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              ></textarea>
            </div>
            <div>
              <label for="categoryReason" class="block text-sm font-medium text-gray-700 mb-1">Pourquoi cette catégorie est-elle nécessaire ?</label>
              <textarea
                id="categoryReason"
                v-model="suggestionForm.raison"
                rows="3"
                placeholder="Expliquez pourquoi cette catégorie serait utile..."
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              ></textarea>
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="showSuggestionModal = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                Envoyer la suggestion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  SearchIcon,
  ArrowRightIcon,
  XIcon,
  Coffee,
  Utensils,
  ShoppingBag,
  Scissors,
  Building,
  Landmark,
  Hotel,
  Music
} from 'lucide-vue-next';

// État du modal
const showSuggestionModal = ref(false);

// Recherche et tri
const searchQuery = ref('');
const sortBy = ref('name');

// Formulaire de suggestion
const suggestionForm = ref({
  nom: '',
  description: '',
  raison: ''
});

// Données des catégories (simulées)
const categories = ref([
  {
    id: 1,
    nom: 'Restaurants',
    description: 'Découvrez les meilleurs restaurants près de chez vous, des bistrots traditionnels aux restaurants gastronomiques.',
    image: '/placeholder.svg?height=300&width=500',
    icon: Utensils,
    nombreLieux: 1250,
    nombreAvis: 8750,
    popularite: 98,
    tags: ['Gastronomie', 'Cuisine française', 'Cuisine italienne', 'Cuisine asiatique']
  },
  {
    id: 2,
    nom: 'Cafés & Bars',
    description: 'Trouvez le café parfait pour votre pause, des cafés cosy aux bars branchés pour vos soirées.',
    image: '/placeholder.svg?height=300&width=500',
    icon: Coffee,
    nombreLieux: 980,
    nombreAvis: 6420,
    popularite: 95,
    tags: ['Café', 'Bar à vin', 'Cocktails', 'Brunch']
  },
  {
    id: 3,
    nom: 'Shopping',
    description: 'Boutiques, centres commerciaux et marchés pour tous vos besoins shopping et cadeaux.',
    image: '/placeholder.svg?height=300&width=500',
    icon: ShoppingBag,
    nombreLieux: 850,
    nombreAvis: 4200,
    popularite: 90,
    tags: ['Mode', 'Décoration', 'Cadeaux', 'Artisanat']
  },
  {
    id: 4,
    nom: 'Beauté & Bien-être',
    description: 'Salons de coiffure, spas et instituts de beauté pour prendre soin de vous.',
    image: '/placeholder.svg?height=300&width=500',
    icon: Scissors,
    nombreLieux: 620,
    nombreAvis: 3100,
    popularite: 85,
    tags: ['Spa', 'Massage', 'Coiffure', 'Soins esthétiques']
  },
  {
    id: 5,
    nom: 'Culture',
    description: 'Musées, galeries et sites historiques pour enrichir vos connaissances et votre culture.',
    image: '/placeholder.svg?height=300&width=500',
    icon: Landmark,
    nombreLieux: 450,
    nombreAvis: 2800,
    popularite: 88,
    tags: ['Musée', 'Galerie d\'art', 'Monument', 'Exposition']
  },
  {
    id: 6,
    nom: 'Divertissement',
    description: 'Cinémas, théâtres et lieux de spectacle pour vos sorties et divertissements.',
    image: '/placeholder.svg?height=300&width=500',
    icon: Music,
    nombreLieux: 380,
    nombreAvis: 2500,
    popularite: 92,
    tags: ['Cinéma', 'Théâtre', 'Concert', 'Spectacle']
  },
  {
    id: 7,
    nom: 'Hôtels',
    description: 'Hébergements pour tous les budgets, des hôtels économiques aux établissements de luxe.',
    image: '/placeholder.svg?height=300&width=500',
    icon: Hotel,
    nombreLieux: 320,
    nombreAvis: 1950,
    popularite: 82,
    tags: ['Hôtel', 'Chambre d\'hôte', 'Auberge', 'Boutique-hôtel']
  },
  {
    id: 8,
    nom: 'Services',
    description: 'Services locaux et commerces de proximité pour faciliter votre quotidien.',
    image: '/placeholder.svg?height=300&width=500',
    icon: Building,
    nombreLieux: 580,
    nombreAvis: 2100,
    popularite: 78,
    tags: ['Banque', 'Poste', 'Pressing', 'Réparation']
  }
]);

// Catégories filtrées
const filteredCategories = computed(() => {
  let result = [...categories.value];

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(categorie =>
      categorie.nom.toLowerCase().includes(query) ||
      categorie.description.toLowerCase().includes(query) ||
      categorie.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Tri
  switch (sortBy.value) {
    case 'name':
      result.sort((a, b) => a.nom.localeCompare(b.nom));
      break;
    case 'name-desc':
      result.sort((a, b) => b.nom.localeCompare(a.nom));
      break;
    case 'popularity':
      result.sort((a, b) => b.popularite - a.popularite);
      break;
    case 'places':
      result.sort((a, b) => b.nombreLieux - a.nombreLieux);
      break;
  }

  return result;
});

// Catégories populaires
const popularCategories = computed(() => {
  return [...categories.value]
    .sort((a, b) => b.popularite - a.popularite)
    .slice(0, 4);
});

// Soumission du formulaire de suggestion
const submitSuggestion = () => {
  // Dans une application réelle, on enverrait ces données à une API
  console.log('Suggestion soumise:', suggestionForm.value);

  // Réinitialiser le formulaire
  suggestionForm.value = {
    nom: '',
    description: '',
    raison: ''
  };

  // Fermer le modal
  showSuggestionModal.value = false;

  // Afficher un message de confirmation
  alert('Merci pour votre suggestion ! Nous l\'examinerons dans les plus brefs délais.');
};
</script>
