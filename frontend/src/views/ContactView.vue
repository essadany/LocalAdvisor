<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- En-tête de la page -->
    <section class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
          <p class="text-xl">Une question, une suggestion ou un problème ? Notre équipe est là pour vous aider.</p>
        </div>
      </div>
    </section>

    <!-- Contenu principal -->
    <main class="flex-1 container mx-auto px-4 py-12">
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Informations de contact -->
          <div class="md:col-span-1">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-6">Nos coordonnées</h2>

              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="bg-emerald-100 p-3 rounded-full mr-4">
                    <MapPinIcon class="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-800 mb-1">Adresse</h3>
                    <p class="text-gray-600">
                      123 Avenue des Champs-Élysées<br />
                      75008 Paris, France
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-emerald-100 p-3 rounded-full mr-4">
                    <PhoneIcon class="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-800 mb-1">Téléphone</h3>
                    <p class="text-gray-600">+33 1 23 45 67 89</p>
                    <p class="text-gray-500 text-sm">Lun-Ven, 9h-18h</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-emerald-100 p-3 rounded-full mr-4">
                    <MailIcon class="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-800 mb-1">Email</h3>
                    <p class="text-gray-600">contact@guidelocal.fr</p>
                    <p class="text-gray-500 text-sm">Nous répondons sous 24h</p>
                  </div>
                </div>
              </div>

              <div class="mt-8">
                <h3 class="font-medium text-gray-800 mb-3">Suivez-nous</h3>
                <div class="flex space-x-4">
                  <a href="#" class="bg-emerald-100 p-2 rounded-full text-emerald-600 hover:bg-emerald-200 transition-colors">
                    <FacebookIcon class="h-5 w-5" />
                  </a>
                  <a href="#" class="bg-emerald-100 p-2 rounded-full text-emerald-600 hover:bg-emerald-200 transition-colors">
                    <TwitterIcon class="h-5 w-5" />
                  </a>
                  <a href="#" class="bg-emerald-100 p-2 rounded-full text-emerald-600 hover:bg-emerald-200 transition-colors">
                    <InstagramIcon class="h-5 w-5" />
                  </a>
                  <a href="#" class="bg-emerald-100 p-2 rounded-full text-emerald-600 hover:bg-emerald-200 transition-colors">
                    <LinkedinIcon class="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">Horaires d'ouverture</h2>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Lundi - Vendredi</span>
                  <span class="font-medium text-gray-800">9h - 18h</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Samedi</span>
                  <span class="font-medium text-gray-800">10h - 16h</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Dimanche</span>
                  <span class="font-medium text-gray-800">Fermé</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulaire de contact -->
          <div class="md:col-span-2">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-6">Envoyez-nous un message</h2>

              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                    <input
                      type="text"
                      id="firstName"
                      v-model="contactForm.firstName"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                    <input
                      type="text"
                      id="lastName"
                      v-model="contactForm.lastName"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      id="email"
                      v-model="contactForm.email"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      v-model="contactForm.phone"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
                  <select
                    id="subject"
                    v-model="contactForm.subject"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="question">Question générale</option>
                    <option value="support">Support technique</option>
                    <option value="partnership">Partenariat</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    id="message"
                    v-model="contactForm.message"
                    rows="6"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="privacy"
                      type="checkbox"
                      v-model="contactForm.privacy"
                      required
                      class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="privacy" class="text-gray-700">
                      J'accepte que mes données soient traitées conformément à la
                      <a href="#" class="text-emerald-600 hover:underline">politique de confidentialité</a>.
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    class="w-full px-4 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                    :disabled="isSubmitting"
                  >
                    <span v-if="isSubmitting">Envoi en cours...</span>
                    <span v-else>Envoyer le message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- FAQ -->
        <div class="mt-12">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Questions fréquentes</h2>

          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200 last:border-b-0">
              <button
                @click="toggleFaq(index)"
                class="flex justify-between items-center w-full px-6 py-4 text-left"
              >
                <span class="font-medium text-gray-800">{{ faq.question }}</span>
                <ChevronDownIcon
                  class="h-5 w-5 text-gray-500 transition-transform"
                  :class="{ 'transform rotate-180': faq.open }"
                />
              </button>
              <div v-if="faq.open" class="px-6 pb-4">
                <p class="text-gray-600">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Carte -->
        <div class="mt-12">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Nous trouver</h2>

          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="bg-gray-200 h-96 flex items-center justify-center">
              <div class="text-center">
                <MapIcon class="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p class="text-gray-600">Carte interactive non disponible en mode démo</p>
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
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  ChevronDownIcon,
  MapIcon
} from 'lucide-vue-next';

// État du formulaire
interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy: boolean;
}

const contactForm = reactive<ContactForm>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  privacy: false
});

const isSubmitting = ref(false);

// Soumission du formulaire
const submitForm = async () => {
  isSubmitting.value = true;

  try {
    // Simulation d'une requête API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Réinitialiser le formulaire
    Object.keys(contactForm).forEach(key => {
      if (key !== 'privacy') {
        (contactForm[key as keyof ContactForm] as string) = '';
      }
    });
    contactForm.privacy = false;

    // Afficher un message de succès
    alert('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
  } finally {
    isSubmitting.value = false;
  }
};

// FAQ
const faqs = reactive([
  {
    question: 'Comment puis-je ajouter un lieu sur GuideLocal ?',
    answer: 'Pour ajouter un lieu, connectez-vous à votre compte, puis cliquez sur le bouton "Ajouter un lieu" dans le menu principal. Remplissez le formulaire avec les informations du lieu et soumettez-le pour validation.',
    open: false
  },
  {
    question: 'Comment modifier ou supprimer un avis que j\'ai publié ?',
    answer: 'Vous pouvez gérer vos avis depuis votre profil utilisateur. Accédez à l\'onglet "Mes avis", puis cliquez sur "Modifier" ou "Supprimer" à côté de l\'avis concerné.',
    open: false
  },
  {
    question: 'Comment signaler un contenu inapproprié ?',
    answer: 'Si vous trouvez un contenu inapproprié, cliquez sur le bouton "Signaler" à côté du contenu en question. Notre équipe de modération examinera votre signalement dans les plus brefs délais.',
    open: false
  },
  {
    question: 'Comment devenir partenaire de GuideLocal ?',
    answer: 'Pour devenir partenaire, contactez-nous via le formulaire ci-dessus en sélectionnant "Partenariat" comme sujet. Notre équipe commerciale vous recontactera pour discuter des possibilités de collaboration.',
    open: false
  },
  {
    question: 'Les informations sur les lieux sont-elles vérifiées ?',
    answer: 'Oui, notre équipe vérifie régulièrement les informations des lieux référencés. Cependant, certains détails peuvent changer rapidement. Si vous constatez une information incorrecte, n\'hésitez pas à nous le signaler.',
    open: false
  }
]);

// Fonction pour ouvrir/fermer les questions de la FAQ
const toggleFaq = (index: number) => {
  faqs[index].open = !faqs[index].open;
};
</script>
