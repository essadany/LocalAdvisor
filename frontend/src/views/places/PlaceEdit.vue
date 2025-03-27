<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Contenu principal -->
    <main class="flex-1 container mx-auto px-4 py-8">
      <!-- Fil d'Ariane -->
      <div class="flex items-center text-sm text-gray-600 mb-6">
        <router-link to="/" class="hover:text-emerald-600 transition-colors">Accueil</router-link>
        <ChevronRightIcon class="h-4 w-4 mx-2" />
        <router-link to="/places" class="hover:text-emerald-600 transition-colors">Lieux</router-link>
        <ChevronRightIcon class="h-4 w-4 mx-2" />
        <span class="text-gray-800">{{ isEditMode ? 'Modifier un lieu' : 'Ajouter un lieu' }}</span>
      </div>

      <!-- Titre de la page -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">{{ isEditMode ? 'Modifier un lieu' : 'Ajouter un nouveau lieu' }}</h1>
        <p class="text-gray-600 mt-2">{{ isEditMode ? 'Mettez à jour les informations de ce lieu' : 'Partagez un nouveau lieu avec la communauté' }}</p>
      </div>

      <!-- Formulaire -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Informations de base -->
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4">Informations de base</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom du lieu *</label>
                  <input
                    type="text"
                    id="nom"
                    v-model="formData.nom"
                    placeholder="Ex: Le Petit Café"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="categorie" class="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                  <select
                    id="categorie"
                    v-model="formData.categorie"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option v-for="categorie in categories" :key="categorie.id" :value="categorie.nom">
                      {{ categorie.nom }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                id="description"
                v-model="formData.description"
                rows="4"
                placeholder="Décrivez ce lieu en détail..."
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              ></textarea>
            </div>

            <!-- Adresse et contact -->
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4">Adresse et contact</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="adresse" class="block text-sm font-medium text-gray-700 mb-1">Adresse *</label>
                  <input
                    type="text"
                    id="adresse"
                    v-model="formData.adresse"
                    placeholder="Ex: 15 rue des Lilas"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="ville" class="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                  <input
                    type="text"
                    id="ville"
                    v-model="formData.ville"
                    placeholder="Ex: Paris"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="codePostal" class="block text-sm font-medium text-gray-700 mb-1">Code postal *</label>
                  <input
                    type="text"
                    id="codePostal"
                    v-model="formData.codePostal"
                    placeholder="Ex: 75001"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="pays" class="block text-sm font-medium text-gray-700 mb-1">Pays *</label>
                  <input
                    type="text"
                    id="pays"
                    v-model="formData.pays"
                    placeholder="Ex: France"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="telephone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    id="telephone"
                    v-model="formData.telephone"
                    placeholder="Ex: +33 1 23 45 67 89"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="siteWeb" class="block text-sm font-medium text-gray-700 mb-1">Site web</label>
                  <input
                    type="url"
                    id="siteWeb"
                    v-model="formData.siteWeb"
                    placeholder="Ex: https://www.example.com"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <!-- Horaires -->
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4">Horaires</h2>
              <div class="space-y-4">
                <div v-for="(jour, index) in jours" :key="index" class="flex flex-col md:flex-row md:items-center gap-4">
                  <div class="w-full md:w-1/6">
                    <span class="font-medium text-gray-700">{{ jour }}</span>
                  </div>
                  <div class="w-full md:w-1/3">
                    <select
                      v-model="formData.horaires[index].statut"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="ouvert">Ouvert</option>
                      <option value="ferme">Fermé</option>
                    </select>
                  </div>
                  <div v-if="formData.horaires[index].statut === 'ouvert'" class="w-full md:w-1/2 flex items-center gap-2">
                    <input
                      type="time"
                      v-model="formData.horaires[index].ouverture"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <span>à</span>
                    <input
                      type="time"
                      v-model="formData.horaires[index].fermeture"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Caractéristiques -->
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4">Caractéristiques</h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="(tag, index) in availableTags" :key="index" class="flex items-center">
                  <input
                    type="checkbox"
                    :id="`tag-${index}`"
                    :value="tag"
                    v-model="formData.tags"
                    class="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                  />
                  <label :for="`tag-${index}`" class="ml-2 text-gray-700">{{ tag }}</label>
                </div>
              </div>
            </div>

            <!-- Photos -->
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4">Photos</h2>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div v-if="formData.photos.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div v-for="(photo, index) in formData.photos" :key="index" class="relative">
                    <img :src="photo" :alt="'Photo ' + (index + 1)" class="w-full h-32 object-cover rounded-md" />
                    <button
                      @click="removePhoto(index)"
                      type="button"
                      class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <XIcon class="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <label for="photos" class="cursor-pointer block">
                  <UploadCloudIcon class="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <span class="text-gray-600">Glissez-déposez vos photos ici ou cliquez pour parcourir</span>
                  <input
                    type="file"
                    id="photos"
                    multiple
                    accept="image/*"
                    @change="handlePhotoUpload"
                    class="hidden"
                  />
                </label>
                <p class="text-xs text-gray-500 mt-2">Formats acceptés: JPG, PNG. Taille maximale: 5 MB</p>
              </div>
            </div>

            <!-- Boutons d'action -->
            <div class="flex justify-end space-x-4 border-t pt-6">
              <button
                type="button"
                @click="$router.go(-1)"
                class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                {{ isEditMode ? 'Mettre à jour' : 'Ajouter ce lieu' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  ChevronRightIcon,
  XIcon,
  UploadCloudIcon
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

// Détermine si on est en mode édition ou création
const isEditMode = computed(() => route.name === 'edit-place');

// Catégories disponibles
const categories = ref([
  { id: 1, nom: 'Restaurants' },
  { id: 2, nom: 'Cafés & Bars' },
  { id: 3, nom: 'Shopping' },
  { id: 4, nom: 'Beauté & Bien-être' },
  { id: 5, nom: 'Culture' },
  { id: 6, nom: 'Divertissement' },
  { id: 7, nom: 'Hôtels' },
  { id: 8, nom: 'Services' }
]);

// Tags disponibles
const availableTags = ref([
  'Terrasse',
  'Wi-Fi gratuit',
  'Accessible PMR',
  'Animaux acceptés',
  'Parking',
  'Climatisation',
  'Végétarien',
  'Vegan',
  'Sans gluten',
  'Bio',
  'Livraison',
  'À emporter',
  'Réservation conseillée',
  'Romantique',
  'Familial',
  'Vue panoramique',
  'Historique',
  'Tendance'
]);

// Jours de la semaine
const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

// Données du formulaire
interface FormData {
  nom: string;
  categorie: string;
  description: string;
  adresse: string;
  ville: string;
  codePostal: string;
  pays: string;
  telephone: string;
  siteWeb: string;
  horaires: { statut: string; ouverture: string; fermeture: string; }[];
  tags: string[];
  photos: string[];
}

const formData = ref<FormData>({
  nom: '',
  categorie: '',
  description: '',
  adresse: '',
  ville: '',
  codePostal: '',
  pays: '',
  telephone: '',
  siteWeb: '',
  horaires: jours.map(() => ({
    statut: 'ouvert',
    ouverture: '09:00',
    fermeture: '18:00'
  })),
  tags: [],
  photos: []
});

// Chargement des données en mode édition
onMounted(async () => {
  if (isEditMode.value) {
    try {
      // Dans une application réelle, on chargerait les données depuis une API
      // const response = await fetch(`/api/places/${lieuId.value}`);
      // const data = await response.json();

      // Simulation de données pour l'exemple
      const data = {
        nom: 'Le Petit Bistrot',
        categorie: 'Restaurants',
        description: 'Un charmant bistrot français avec une cuisine authentique et une ambiance conviviale.',
        adresse: '15 rue des Lilas',
        ville: 'Paris',
        codePostal: '75001',
        pays: 'France',
        telephone: '+33 1 23 45 67 89',
        siteWeb: 'https://www.lepetitbistrot.fr',
        horaires: jours.map((_, index) => ({
          statut: index < 5 ? 'ouvert' : 'ferme',
          ouverture: '12:00',
          fermeture: '22:00'
        })),
        tags: ['Terrasse', 'Romantique', 'Réservation conseillée'],
        photos: ['/placeholder.svg?height=300&width=500']
      };

      // Mise à jour du formulaire avec les données récupérées
      formData.value = { ...data };
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      // Gérer l'erreur (redirection, message d'erreur, etc.)
    }
  }
});

// Gestion de l'upload des photos
const handlePhotoUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const files = Array.from(input.files);

    // Dans une application réelle, on enverrait ces fichiers à un serveur
    // Pour l'exemple, on simule des URLs locales
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          formData.value.photos.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }
};

// Suppression d'une photo
const removePhoto = (index: number) => {
  formData.value.photos.splice(index, 1);
};

// Soumission du formulaire
const handleSubmit = async () => {
  try {
    // Dans une application réelle, on enverrait ces données à une API
    console.log('Données du formulaire:', formData.value);

    // Simulation d'une requête API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Redirection après succès
    router.push('/places');

    // Afficher un message de succès
    alert(isEditMode.value ? 'Lieu mis à jour avec succès!' : 'Nouveau lieu ajouté avec succès!');
  } catch (error) {
    console.error('Erreur lors de la soumission:', error);
    alert('Une erreur est survenue. Veuillez réessayer.');
  }
};
</script>
