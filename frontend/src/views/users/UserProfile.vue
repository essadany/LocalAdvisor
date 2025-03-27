<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Contenu principal -->
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- En-tête du profil -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div class="bg-gradient-to-r from-emerald-500 to-teal-600 h-32 relative">
            <button class="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors">
              <CameraIcon class="h-5 w-5" />
            </button>
          </div>
          <div class="px-6 pb-6 relative">
            <div class="flex flex-col md:flex-row md:items-end">
              <div class="absolute -top-16 left-6 md:relative md:left-0 md:-top-10">
                <div class="relative">
                  <img :src="user.avatar" :alt="user.nom" class="w-32 h-32 rounded-full border-4 border-white object-cover" />
                  <button class="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-2 transition-colors">
                    <CameraIcon class="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div class="mt-16 md:mt-0 md:ml-4 flex-1">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 class="text-2xl font-bold text-gray-800">{{ user.nom }}</h1>
                    <p class="text-gray-600">Membre depuis {{ formatDate(user.dateInscription) }}</p>
                  </div>
                  <div class="mt-4 md:mt-0">
                    <button class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
                      Modifier le profil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Onglets -->
        <div class="mb-6">
          <div class="border-b border-gray-200">
            <nav class="flex -mb-px">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                <component :is="tab.icon" class="h-5 w-5 inline-block mr-2" />
                {{ tab.name }}
              </button>
            </nav>
          </div>
        </div>

        <!-- Contenu des onglets -->
        <!-- Profil -->
        <div v-if="activeTab === 'profile'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">Informations personnelles</h2>
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    <input
                      type="text"
                      id="firstName"
                      v-model="profileForm.prenom"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      id="lastName"
                      v-model="profileForm.nom"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="profileForm.email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">Biographie</label>
                  <textarea
                    id="bio"
                    v-model="profileForm.bio"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  ></textarea>
                </div>
                <div>
                  <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                  <input
                    type="text"
                    id="location"
                    v-model="profileForm.localisation"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div class="flex justify-end">
                  <button class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">Sécurité</h2>
              <div class="space-y-4">
                <div>
                  <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                  <input
                    type="password"
                    id="currentPassword"
                    v-model="passwordForm.current"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                  <input
                    type="password"
                    id="newPassword"
                    v-model="passwordForm.new"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    v-model="passwordForm.confirm"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div class="flex justify-end">
                  <button class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
                    Changer le mot de passe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">Préférences de notification</h2>
              <div class="space-y-4">
                <div v-for="(pref, index) in notificationPreferences" :key="index" class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium text-gray-800">{{ pref.title }}</h3>
                    <p class="text-sm text-gray-600">{{ pref.description }}</p>
                  </div>
                  <div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="pref.enabled" class="sr-only peer" />
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                </div>
                <div class="flex justify-end">
                  <button class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
                    Enregistrer les préférences
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Avis -->
        <div v-if="activeTab === 'reviews'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">Mes avis ({{ user.avis.length }})</h2>

              <div v-if="user.avis.length === 0" class="text-center py-8">
                <MessageSquareIcon class="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <h3 class="text-lg font-medium text-gray-800 mb-1">Vous n'avez pas encore publié d'avis</h3>
                <p class="text-gray-600 mb-4">Partagez votre expérience sur les lieux que vous avez visités</p>
                <router-link to="/places" class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors inline-block">
                  Explorer les lieux
                </router-link>
              </div>

              <div v-else class="space-y-6">
                <div v-for="(avis, index) in user.avis" :key="index" class="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <router-link :to="`/places/${avis.lieuId}`" class="text-lg font-bold text-emerald-600 hover:underline">
                        {{ avis.lieuNom }}
                      </router-link>
                      <p class="text-gray-600 text-sm">{{ formatDate(avis.date) }}</p>
                    </div>
                    <div class="flex">
                      <StarIcon v-for="n in 5" :key="n" class="h-5 w-5" :class="n <= avis.note ? 'text-yellow-500' : 'text-gray-300'" />
                    </div>
                  </div>
                  <h3 class="font-bold text-gray-800 mb-2">{{ avis.titre }}</h3>
                  <p class="text-gray-700 mb-4">{{ avis.commentaire }}</p>
                  <div class="flex space-x-4">
                    <button class="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center">
                      <PencilIcon class="h-4 w-4 mr-1" />
                      Modifier
                    </button>
                    <button class="text-red-600 hover:text-red-700 text-sm font-medium flex items-center">
                      <TrashIcon class="h-4 w-4 mr-1" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Favoris -->
        <div v-if="activeTab === 'favorites'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">Mes lieux favoris ({{ user.favoris.length }})</h2>

              <div v-if="user.favoris.length === 0" class="text-center py-8">
                <HeartIcon class="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <h3 class="text-lg font-medium text-gray-800 mb-1">Vous n'avez pas encore de favoris</h3>
                <p class="text-gray-600 mb-4">Ajoutez des lieux à vos favoris pour les retrouver facilement</p>
                <router-link to="/places" class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors inline-block">
                  Explorer les lieux
                </router-link>
              </div>

              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="(lieu, index) in user.favoris" :key="index" class="bg-gray-50 rounded-lg overflow-hidden flex">
                  <img :src="lieu.image" :alt="lieu.nom" class="w-24 h-24 object-cover" />
                  <div class="p-4 flex-1">
                    <div class="flex justify-between items-start">
                      <div>
                        <router-link :to="`/places/${lieu.id}`" class="font-bold text-gray-800 hover:text-emerald-600">
                          {{ lieu.nom }}
                        </router-link>
                        <p class="text-gray-600 text-sm">{{ lieu.categorie }}</p>
                      </div>
                      <div class="flex items-center">
                        <StarIcon class="h-4 w-4 text-yellow-500" />
                        <span class="ml-1 text-sm text-gray-700">{{ lieu.note }}</span>
                      </div>
                    </div>
                    <div class="mt-2 flex justify-between items-center">
                      <span class="text-xs text-gray-500">{{ lieu.adresse }}</span>
                      <button @click="removeFavorite(lieu.id)" class="text-red-500 hover:text-red-600">
                        <HeartIcon class="h-5 w-5 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activité -->
        <div v-if="activeTab === 'activity'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">Mon activité récente</h2>

              <div class="relative">
                <div class="absolute left-4 h-full w-0.5 bg-gray-200"></div>

                <div v-for="(activity, index) in user.activites" :key="index" class="relative pl-10 pb-8 last:pb-0">
                  <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <component :is="getActivityIcon(activity.type)" class="h-4 w-4 text-emerald-600" />
                  </div>

                  <div>
                    <p class="text-gray-600 text-sm mb-1">{{ formatDate(activity.date) }}</p>
                    <p class="text-gray-800" v-html="formatActivity(activity)"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {
  CameraIcon,
  UserIcon,
  StarIcon,
  HeartIcon,
  ClockIcon,
  MessageSquareIcon,
  PencilIcon,
  TrashIcon,
} from 'lucide-vue-next';

// Onglets
const tabs = [
  { id: 'profile', name: 'Profil', icon: UserIcon },
  { id: 'reviews', name: 'Mes avis', icon: StarIcon },
  { id: 'favorites', name: 'Favoris', icon: HeartIcon },
  { id: 'activity', name: 'Activité', icon: ClockIcon }
];

const activeTab = ref('profile');

// Données utilisateur (simulées)
const user = ref({
  id: 1,
  nom: 'Marie Dupont',
  email: 'marie.dupont@example.com',
  avatar: '/placeholder.svg?height=200&width=200',
  dateInscription: '2022-03-15T10:30:00',
  bio: 'Passionnée de gastronomie et de voyages. J\'adore découvrir de nouveaux restaurants et cafés dans ma ville et partager mes expériences.',
  localisation: 'Paris, France',
  avis: [
    {
      id: 101,
      lieuId: 1,
      lieuNom: 'Le Petit Bistrot',
      note: 5,
      titre: 'Une expérience culinaire exceptionnelle',
      commentaire: 'J\'ai passé une soirée merveilleuse au Petit Bistrot. La nourriture était délicieuse, le service attentionné et l\'ambiance chaleureuse. Je recommande particulièrement le magret de canard et la crème brûlée. À essayer absolument !',
      date: '2023-05-15T18:30:00',
      utile: 12
    },
    {
      id: 102,
      lieuId: 3,
      lieuNom: 'Musée d\'Art Moderne',
      note: 4,
      titre: 'Une belle collection mais un peu cher',
      commentaire: 'Le musée propose une collection impressionnante d\'œuvres contemporaines. Les expositions temporaires sont particulièrement intéressantes. Seul bémol : le prix d\'entrée un peu élevé. Prévoyez au moins 2 heures pour tout voir.',
      date: '2023-04-10T14:15:00',
      utile: 5
    }
  ],
  favoris: [
    {
      id: 1,
      nom: 'Le Petit Bistrot',
      categorie: 'Restaurants',
      note: 4.8,
      adresse: '15 rue des Lilas, 75001 Paris',
      image: '/placeholder.svg?height=100&width=100'
    },
    {
      id: 9,
      nom: 'Boulangerie Artisanale',
      categorie: 'Cafés',
      note: 4.9,
      adresse: '8 avenue des Fleurs, 75002 Paris',
      image: '/placeholder.svg?height=100&width=100'
    },
    {
      id: 5,
      nom: 'Musée d\'Art Moderne',
      categorie: 'Culture',
      note: 4.6,
      adresse: '11 boulevard des Arts, 75004 Paris',
      image: '/placeholder.svg?height=100&width=100'
    }
  ],
  activites: [
    {
      type: 'avis',
      date: '2023-05-15T18:30:00',
      lieuId: 1,
      lieuNom: 'Le Petit Bistrot',
      note: 5
    },
    {
      type: 'favori',
      date: '2023-05-10T12:45:00',
      lieuId: 9,
      lieuNom: 'Boulangerie Artisanale'
    },
    {
      type: 'avis',
      date: '2023-04-10T14:15:00',
      lieuId: 3,
      lieuNom: 'Musée d\'Art Moderne',
      note: 4
    },
    {
      type: 'favori',
      date: '2023-04-05T09:20:00',
      lieuId: 5,
      lieuNom: 'Musée d\'Art Moderne'
    },
    {
      type: 'inscription',
      date: '2022-03-15T10:30:00'
    }
  ]
});

// Formulaires
const profileForm = reactive({
  prenom: 'Marie',
  nom: 'Dupont',
  email: 'marie.dupont@example.com',
  bio: 'Passionnée de gastronomie et de voyages. J\'adore découvrir de nouveaux restaurants et cafés dans ma ville et partager mes expériences.',
  localisation: 'Paris, France'
});

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
});

const notificationPreferences = reactive([
  {
    title: 'Réponses à mes avis',
    description: 'Recevoir des notifications lorsque quelqu\'un répond à mes avis',
    enabled: true
  },
  {
    title: 'Nouveaux lieux à proximité',
    description: 'Être informé des nouveaux lieux ajoutés près de chez moi',
    enabled: true
  },
  {
    title: 'Promotions et événements',
    description: 'Recevoir des informations sur les promotions et événements des lieux que je suis',
    enabled: false
  },
  {
    title: 'Mises à jour de l\'application',
    description: 'Être informé des nouvelles fonctionnalités et mises à jour',
    enabled: true
  }
]);

// Fonctions utilitaires
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

const removeFavorite = (id: number) => {
  user.value.favoris = user.value.favoris.filter(lieu => lieu.id !== id);
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'avis':
      return StarIcon;
    case 'favori':
      return HeartIcon;
    case 'inscription':
      return UserIcon;
    default:
      return ClockIcon;
  }
};

interface Activity {
  type: string;
  date: string;
  lieuId?: number;
  lieuNom?: string;
  note?: number;
}

const formatActivity = (activity: Activity) => {
  switch (activity.type) {
    case 'avis':
      return `Vous avez publié un avis <span class="font-medium">${activity.note} étoiles</span> sur <a href="/places/${activity.lieuId}" class="text-emerald-600 hover:underline">${activity.lieuNom}</a>`;
    case 'favori':
      return `Vous avez ajouté <a href="/places/${activity.lieuId}" class="text-emerald-600 hover:underline">${activity.lieuNom}</a> à vos favoris`;
    case 'inscription':
      return `Vous avez rejoint GuideLocal`;
    default:
      return '';
  }
};
</script>
