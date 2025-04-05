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
        <CategoryCard
          v-for="(categorie, index) in categories"
          :key="index"
          :categorie="categorie"
        />
      </div>

      <!-- Catégories populaires -->
      <section class="mt-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Catégories populaires</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="(categorie, index) in popularCategories"
            :key="index"
            class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer"
            @click="$router.push(`/places?category=${categorie.categoryId}`)"
          >
            <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <component :is="categorie.icon" class="h-8 w-8 text-emerald-600" />
            </div>
            <h3 class="text-lg font-semibold mb-2">{{ categorie.name }}</h3>
            <p class="text-gray-600 text-sm"> categorie.nombreLieux  lieux</p>
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
                v-model="suggestionForm.name"
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
import { ref, computed, onMounted } from 'vue';
import { SearchIcon, XIcon } from 'lucide-vue-next';
import CategoryCard from '@/components/CategoryCard.vue';
import { useCategoryStore } from '@/stores/useCategoryStore';
// État du modal
const showSuggestionModal = ref(false);

// Recherche et tri
const searchQuery = ref('');
const sortBy = ref('name');

// Formulaire de suggestion
const suggestionForm = ref({
  name: '',
  description: '',
  raison: ''
});

// Données des catégories
const categoryStore = useCategoryStore();

const categories = computed(()=> categoryStore.categories);

// Catégories filtrées
/* const filteredCategories = computed(() => {
  let result = [...categories.value];

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(categorie =>
      categorie.name.toLowerCase().includes(query) ||
      categorie.description.toLowerCase().includes(query) ||
      categorie.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Tri
  switch (sortBy.value) {
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'popularity':
      result.sort((a, b) => b.popularite - a.popularite);
      break;
    case 'places':
      result.sort((a, b) => b.nombreLieux - a.nombreLieux);
      break;
  }

  return result;
}); */

// Catégories populaires
const popularCategories = computed(() => {
  return [...categories.value]
    /* .sort((a, b) => b.popularite - a.popularite)
    .slice(0, 4); */
});

// Soumission du formulaire de suggestion
const submitSuggestion = () => {
  console.log('Suggestion soumise:', suggestionForm.value);

  suggestionForm.value = {
    name: '',
    description: '',
    raison: ''
  };

  showSuggestionModal.value = false;

  alert('Merci pour votre suggestion ! Nous l\'examinerons dans les plus brefs délais.');
};

onMounted(async () => {
  if (!categoryStore.loading){
    await categoryStore.fetchCategories();
  }
});
</script>
