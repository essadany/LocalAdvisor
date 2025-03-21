<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Contenu principal -->
    <main class="flex-1 container mx-auto px-4 py-8">
      <!-- Fil d'Ariane -->
      <div class="flex items-center text-sm text-gray-600 mb-6">
        <router-link to="/" class="hover:text-emerald-600 transition-colors">Accueil</router-link>
        <ChevronRightIcon class="h-4 w-4 mx-2" />
        <router-link to="/palces" class="hover:text-emerald-600 transition-colors">Lieux</router-link>
        <ChevronRightIcon class="h-4 w-4 mx-2" />
        <span class="text-gray-800">{{ lieu.nom }}</span>
      </div>

      <!-- Détails du lieu -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <!-- Images du lieu -->
        <div class="relative h-64 md:h-96">
          <img :src="lieu.image" :alt="lieu.nom" class="w-full h-full object-cover" />
          <div class="absolute top-4 right-4 flex space-x-2">
            <button
              @click="toggleFavori"
              class="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              :class="{ 'text-red-500': lieu.favori }"
            >
              <HeartIcon class="h-6 w-6" :class="{ 'fill-current': lieu.favori }" />
            </button>
            <button class="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
              <ShareIcon class="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>

        <!-- Informations principales -->
        <div class="p-6">
          <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ lieu.nom }}</h1>
              <div class="flex items-center mb-2">
                <div class="flex">
                  <StarIcon v-for="n in 5" :key="n" class="h-5 w-5" :class="n <= Math.floor(lieu.note) ? 'text-yellow-500' : 'text-gray-300'" />
                </div>
                <span class="ml-2 text-gray-700">{{ lieu.note }} ({{ lieu.avis.length }} avis)</span>
              </div>
              <p class="text-gray-600">{{ lieu.categorie }}</p>
            </div>
            <div class="mt-4 md:mt-0">
              <button class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
                Ajouter un avis
              </button>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-3">À propos</h2>
            <p class="text-gray-700">{{ lieu.description }}</p>
          </div>

          <!-- Informations pratiques -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-3">Informations pratiques</h2>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <MapPinIcon class="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                  <div>
                    <p class="text-gray-800 font-medium">Adresse</p>
                    <p class="text-gray-600">{{ lieu.adresse }}</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <PhoneIcon class="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                  <div>
                    <p class="text-gray-800 font-medium">Téléphone</p>
                    <p class="text-gray-600">{{ lieu.telephone }}</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <ClockIcon class="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                  <div>
                    <p class="text-gray-800 font-medium">Horaires</p>
                    <p class="text-gray-600">{{ lieu.horaires }}</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <GlobeIcon class="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                  <div>
                    <p class="text-gray-800 font-medium">Site web</p>
                    <a :href="lieu.siteWeb" target="_blank" class="text-emerald-600 hover:underline">{{ lieu.siteWeb }}</a>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Carte -->
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-3">Localisation</h2>
              <div class="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                <MapIcon class="h-12 w-12 text-gray-400" />
                <span class="ml-2 text-gray-600">Carte non disponible</span>
              </div>
            </div>
          </div>

          <!-- Caractéristiques -->
          <div class="mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-3">Caractéristiques</h2>
            <div class="flex flex-wrap gap-2">
              <span v-for="(tag, index) in lieu.tags" :key="index" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Avis et commentaires -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Avis et commentaires</h2>

          <!-- Résumé des avis -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="flex flex-col items-center justify-center">
              <div class="text-5xl font-bold text-gray-800 mb-2">{{ lieu.note }}</div>
              <div class="flex mb-2">
                <StarIcon v-for="n in 5" :key="n" class="h-6 w-6" :class="n <= Math.floor(lieu.note) ? 'text-yellow-500' : 'text-gray-300'" />
              </div>
              <p class="text-gray-600">{{ lieu.avis.length }} avis</p>
            </div>

            <div class="col-span-2">
              <div v-for="i in 5" :key="i" class="flex items-center mb-2">
                <div class="w-12 text-right mr-4">{{ 6 - i }} étoiles</div>
                <div class="flex-1 bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-yellow-500 h-2.5 rounded-full"
                    :style="{ width: `${getPercentageForRating(6 - i)}%` }"
                  ></div>
                </div>
                <div class="w-12 text-left ml-4">{{ getCountForRating(6 - i) }}</div>
              </div>
            </div>
          </div>

          <!-- Formulaire d'avis -->
          <div class="border-t border-gray-200 pt-6 mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Ajouter un avis</h3>
            <form @submit.prevent="submitAvis" class="space-y-4">
              <div>
                <label for="rating" class="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <div class="flex">
                  <button
                    v-for="star in 5"
                    :key="star"
                    type="button"
                    @click="newAvis.note = star"
                    class="focus:outline-none"
                  >
                    <StarIcon
                      class="h-8 w-8"
                      :class="star <= newAvis.note ? 'text-yellow-500' : 'text-gray-300'"
                    />
                  </button>
                </div>
              </div>

              <div>
                <label for="titre" class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  type="text"
                  id="titre"
                  v-model="newAvis.titre"
                  placeholder="Résumez votre expérience en quelques mots"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label for="commentaire" class="block text-sm font-medium text-gray-700 mb-1">Commentaire</label>
                <textarea
                  id="commentaire"
                  v-model="newAvis.commentaire"
                  rows="4"
                  placeholder="Partagez votre expérience avec les autres utilisateurs"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Publier mon avis
                </button>
              </div>
            </form>
          </div>

          <!-- Liste des avis -->
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">{{ lieu.avis.length }} avis</h3>

            <!-- Filtres -->
            <div class="flex flex-wrap gap-2 mb-6">
              <button
                @click="avisFilter = 'all'"
                :class="[
                  'px-3 py-1 rounded-full text-sm',
                  avisFilter === 'all'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                Tous
              </button>
              <button
                v-for="i in 5"
                :key="i"
                @click="avisFilter = i"
                :class="[
                  'px-3 py-1 rounded-full text-sm',
                  avisFilter === i
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ i }} étoile{{ i > 1 ? 's' : '' }}
              </button>
            </div>

            <!-- Avis -->
            <div class="space-y-6">
              <div
                v-for="(avis, index) in filteredAvis"
                :key="index"
                class="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <div class="flex justify-between items-start mb-2">
                  <div class="flex items-start">
                    <img :src="avis.utilisateur.avatar" :alt="avis.utilisateur.nom" class="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <h4 class="font-bold text-gray-800">{{ avis.utilisateur.nom }}</h4>
                      <p class="text-gray-600 text-sm">{{ formatDate(avis.date) }}</p>
                    </div>
                  </div>
                  <div class="flex">
                    <StarIcon v-for="n in 5" :key="n" class="h-4 w-4" :class="n <= avis.note ? 'text-yellow-500' : 'text-gray-300'" />
                  </div>
                </div>
                <h5 class="font-bold text-gray-800 mb-2">{{ avis.titre }}</h5>
                <p class="text-gray-700">{{ avis.commentaire }}</p>

                <!-- Actions sur l'avis -->
                <div class="flex items-center mt-4 space-x-4">
                  <button class="flex items-center text-gray-600 hover:text-emerald-600 transition-colors">
                    <ThumbsUpIcon class="h-4 w-4 mr-1" />
                    <span>Utile ({{ avis.utile }})</span>
                  </button>
                  <button class="flex items-center text-gray-600 hover:text-emerald-600 transition-colors">
                    <MessageSquareIcon class="h-4 w-4 mr-1" />
                    <span>Répondre</span>
                  </button>
                  <button class="flex items-center text-gray-600 hover:text-emerald-600 transition-colors">
                    <FlagIcon class="h-4 w-4 mr-1" />
                    <span>Signaler</span>
                  </button>
                </div>
              </div>
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
      </div>

      <!-- Lieux similaires -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Lieux similaires</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(lieuSimilaire, index) in lieuxSimilaires"
            :key="index"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img :src="lieuSimilaire.image" :alt="lieuSimilaire.nom" class="w-full h-40 object-cover" />
            <div class="p-4">
              <div class="flex justify-between items-start">
                <h3 class="text-lg font-bold text-gray-800">{{ lieuSimilaire.nom }}</h3>
                <div class="flex items-center">
                  <StarIcon class="h-5 w-5 text-yellow-500" />
                  <span class="ml-1 text-gray-700">{{ lieuSimilaire.note }}</span>
                </div>
              </div>
              <p class="text-gray-600 text-sm mt-1">{{ lieuSimilaire.categorie }}</p>
              <p class="text-gray-700 mt-2 line-clamp-2">{{ lieuSimilaire.description }}</p>
              <div class="mt-4 flex justify-between items-center">
                <router-link :to="`/places/${lieuSimilaire.id}`" class="text-emerald-600 hover:underline">Voir détails</router-link>
                <button class="text-gray-400 hover:text-red-500 transition-colors">
                  <HeartIcon class="h-6 w-6" :class="{ 'text-red-500 fill-current': lieuSimilaire.favori }" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  MapPinIcon,
  StarIcon,
  HeartIcon,
  PhoneIcon,
  ChevronRightIcon,
  ShareIcon,
  ClockIcon,
  GlobeIcon,
  MapIcon,
  ThumbsUpIcon,
  MessageSquareIcon,
  FlagIcon
} from 'lucide-vue-next';

// ID du lieu (normalement récupéré depuis la route)

// Données du lieu (simulées)
const lieu = ref({
  id: 1,
  nom: 'Le Petit Bistrot',
  categorie: 'Restaurants',
  note: 4.8,
  description: 'Un charmant bistrot français avec une cuisine authentique et une ambiance conviviale. Situé au cœur de la ville, Le Petit Bistrot propose une carte variée de plats traditionnels français préparés avec des produits frais et locaux. Le chef, formé dans les meilleures écoles de cuisine, apporte une touche moderne aux recettes classiques. La carte des vins est exceptionnelle, avec une sélection de crus français et internationaux. L\'ambiance est chaleureuse et décontractée, parfaite pour un dîner romantique ou un repas entre amis.',
  image: '/placeholder.svg?height=500&width=1000',
  adresse: '15 rue des Lilas, 75001 Paris, France',
  telephone: '+33 1 23 45 67 89',
  horaires: 'Lun-Ven: 12h-14h30, 19h-22h30 | Sam-Dim: 12h-23h',
  siteWeb: 'https://www.lepetitbistrot.fr',
  favori: true,
  tags: ['Cuisine française', 'Terrasse', 'Romantique', 'Vin', 'Fruits de mer', 'Végétarien'],
  avis: [
    {
      id: 1,
      utilisateur: {
        id: 101,
        nom: 'Sophie Martin',
        avatar: '/placeholder.svg?height=100&width=100'
      },
      note: 5,
      titre: 'Une expérience culinaire exceptionnelle',
      commentaire: 'J\'ai passé une soirée merveilleuse au Petit Bistrot. La nourriture était délicieuse, le service attentionné et l\'ambiance chaleureuse. Je recommande particulièrement le magret de canard et la crème brûlée. À essayer absolument !',
      date: '2023-05-15T18:30:00',
      utile: 12
    },
    {
      id: 2,
      utilisateur: {
        id: 102,
        nom: 'Thomas Dubois',
        avatar: '/placeholder.svg?height=100&width=100'
      },
      note: 4,
      titre: 'Très bon restaurant, mais un peu bruyant',
      commentaire: 'La cuisine est excellente et le personnel très sympathique. Seul bémol : le restaurant était assez bruyant le soir de notre visite, ce qui a un peu gâché l\'ambiance. Malgré cela, je recommande pour la qualité des plats.',
      date: '2023-04-22T20:15:00',
      utile: 8
    },
    {
      id: 3,
      utilisateur: {
        id: 103,
        nom: 'Julie Leroy',
        avatar: '/placeholder.svg?height=100&width=100'
      },
      note: 5,
      titre: 'Le meilleur restaurant français de la ville',
      commentaire: 'Après avoir essayé plusieurs restaurants français dans la ville, je peux affirmer que Le Petit Bistrot est le meilleur. Les plats sont authentiques, les portions généreuses et les prix raisonnables. Le chef vient même discuter avec les clients, ce qui est très appréciable.',
      date: '2023-03-10T19:45:00',
      utile: 15
    },
    {
      id: 4,
      utilisateur: {
        id: 104,
        nom: 'Pierre Moreau',
        avatar: '/placeholder.svg?height=100&width=100'
      },
      note: 3,
      titre: 'Service lent mais bonne cuisine',
      commentaire: 'La nourriture était très bonne, mais nous avons attendu près d\'une heure pour être servis. Le restaurant était plein, ce qui explique peut-être ce délai, mais cela reste décevant. J\'y retournerai peut-être en semaine quand il y a moins de monde.',
      date: '2023-02-18T21:00:00',
      utile: 5
    },
    {
      id: 5,
      utilisateur: {
        id: 105,
        nom: 'Emma Bernard',
        avatar: '/placeholder.svg?height=100&width=100'
      },
      note: 5,
      titre: 'Parfait pour un dîner romantique',
      commentaire: 'J\'ai emmené ma compagne pour notre anniversaire et tout était parfait. L\'ambiance, la nourriture, le service... Ils nous ont même offert une coupe de champagne pour célébrer l\'occasion. Je recommande vivement pour les occasions spéciales.',
      date: '2023-01-30T20:30:00',
      utile: 10
    },
    {
      id: 6,
      utilisateur: {
        id: 106,
        nom: 'Lucas Petit',
        avatar: '/placeholder.svg?height=100&width=100'
      },
      note: 4,
      titre: 'Excellente carte des vins',
      commentaire: 'En tant qu\'amateur de vin, j\'ai été impressionné par la sélection proposée. Le sommelier est très compétent et nous a recommandé un vin parfait pour accompagner notre repas. Les plats étaient également délicieux.',
      date: '2022-12-15T19:15:00',
      utile: 7
    }
  ]
});

// Lieux similaires (simulés)
const lieuxSimilaires = ref([
  {
    id: 7,
    nom: 'La Trattoria',
    categorie: 'Restaurants',
    note: 4.4,
    description: 'Un restaurant italien authentique proposant des pizzas, pâtes et autres spécialités italiennes.',
    image: '/placeholder.svg?height=300&width=500',
    favori: false
  },
  {
    id: 12,
    nom: 'Auberge du Vieux Port',
    categorie: 'Restaurants',
    note: 4.6,
    description: 'Une auberge charmante située dans un bâtiment historique avec une ambiance chaleureuse.',
    image: '/placeholder.svg?height=300&width=500',
    favori: false
  },
  {
    id: 15,
    nom: 'Le Bistrot Parisien',
    categorie: 'Restaurants',
    note: 4.5,
    description: 'Un bistrot traditionnel servant des plats français classiques dans une ambiance conviviale.',
    image: '/placeholder.svg?height=300&width=500',
    favori: true
  }
]);

// Pagination des avis
const itemsPerPage = 3;
const currentPage = ref(1);
const avisFilter = ref('all');

// Avis filtrés
const filteredAvis = computed(() => {
  let result = [...lieu.value.avis];

  // Filtre par note
  if (avisFilter.value !== 'all') {
    result = result.filter(avis => avis.note === Number(avisFilter.value));
  }

  // Tri par date (plus récent d'abord)
  result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Pagination
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return result.slice(startIndex, endIndex);
});

// Nombre total de pages
const totalPages = computed(() => {
  let filteredCount = lieu.value.avis.length;

  if (avisFilter.value !== 'all') {
    filteredCount = lieu.value.avis.filter(avis => avis.note === Number(avisFilter.value)).length;
  }

  return Math.ceil(filteredCount / itemsPerPage);
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

// Nouvel avis
const newAvis = ref({
  note: 0,
  titre: '',
  commentaire: ''
});

// Fonction pour soumettre un avis
const submitAvis = () => {
  if (newAvis.value.note === 0) {
    alert('Veuillez attribuer une note');
    return;
  }

  if (!newAvis.value.titre.trim()) {
    alert('Veuillez ajouter un titre à votre avis');
    return;
  }

  if (!newAvis.value.commentaire.trim()) {
    alert('Veuillez ajouter un commentaire');
    return;
  }

  // Dans une application réelle, on enverrait ces données à une API
  const nouvelAvis = {
    id: lieu.value.avis.length + 1,
    utilisateur: {
      id: 999, // ID de l'utilisateur connecté
      nom: 'Utilisateur Connecté', // Nom de l'utilisateur connecté
      avatar: '/placeholder.svg?height=100&width=100'
    },
    note: newAvis.value.note,
    titre: newAvis.value.titre,
    commentaire: newAvis.value.commentaire,
    date: new Date().toISOString(),
    utile: 0
  };

  // Ajouter l'avis à la liste
  lieu.value.avis.unshift(nouvelAvis);

  // Recalculer la note moyenne
  const totalNotes = lieu.value.avis.reduce((sum, avis) => sum + avis.note, 0);
  lieu.value.note = parseFloat((totalNotes / lieu.value.avis.length).toFixed(1));

  // Réinitialiser le formulaire
  newAvis.value = {
    note: 0,
    titre: '',
    commentaire: ''
  };

  // Afficher un message de confirmation
  alert('Votre avis a été publié avec succès !');
};

// Fonction pour formater les dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

// Fonction pour ajouter/retirer des favoris
const toggleFavori = () => {
  lieu.value.favori = !lieu.value.favori;
};

// Fonction pour obtenir le pourcentage d'avis pour chaque note
const getPercentageForRating = (rating: number) => {
  const count = lieu.value.avis.filter(avis => avis.note === rating).length;
  return (count / lieu.value.avis.length) * 100;
};

// Fonction pour obtenir le nombre d'avis pour chaque note
const getCountForRating = (rating: number) => {
  return lieu.value.avis.filter(avis => avis.note === rating).length;
};

// Initialisation
onMounted(() => {
  // Dans une application réelle, on chargerait les données depuis une API
  // fetchLieuDetails(lieuId);
});
</script>
