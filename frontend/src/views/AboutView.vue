<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- En-tête de la page -->
    <section class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">À propos de ce projet</h1>
          <p class="text-xl">Un projet personnel pour approfondir mes compétences en Vue.js et Spring Boot</p>
        </div>
      </div>
    </section>

    <!-- Contenu principal -->
    <main class="flex-1 container mx-auto px-4 py-12">
      <!-- Présentation du projet -->
      <section class="mb-16">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">Présentation du projet</h2>
          <div class="bg-white rounded-lg shadow-md p-8">
            <p class="text-gray-700 mb-4">
              GuideLocal est un projet personnel que j'ai développé pour approfondir mes compétences en développement web,
              particulièrement avec Vue.js pour le frontend et Spring Boot pour le backend.
            </p>
            <p class="text-gray-700 mb-4">
              Cette application permet aux utilisateurs de découvrir, noter et partager leurs avis sur différents lieux
              (restaurants, cafés, boutiques, etc.) dans leur ville. Elle intègre des fonctionnalités comme la recherche,
              le filtrage, l'authentification des utilisateurs et la gestion des avis.
            </p>
            <p class="text-gray-700">
              Ce projet m'a permis d'explorer en profondeur les concepts avancés de Vue.js et Spring Boot,
              ainsi que de mettre en pratique les bonnes pratiques de développement web moderne.
            </p>
          </div>
        </div>
      </section>

      <!-- Technologies utilisées -->
      <section class="mb-16">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">Technologies utilisées</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="flex items-center mb-4">
                <div class="bg-emerald-100 p-3 rounded-full mr-4">
                  <CodeIcon class="h-6 w-6 text-emerald-600" />
                </div>
                <h3 class="text-xl font-bold text-gray-800">Frontend</h3>
              </div>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-center">
                  <CheckCircleIcon class="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Vue.js 3 avec Composition API</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>TypeScript pour un code plus robuste</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Vue Router pour la navigation</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Tailwind CSS pour le styling</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Lucide Icons pour les icônes</span>
                </li>
              </ul>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="flex items-center mb-4">
                <div class="bg-emerald-100 p-3 rounded-full mr-4">
                  <ServerIcon class="h-6 w-6 text-emerald-600" />
                </div>
                <h3 class="text-xl font-bold text-gray-800">Backend</h3>
              </div>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-center">
                  <CheckCircleIcon class="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Spring Boot pour l'API REST</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Spring Security pour l'authentification</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Spring Data JPA pour la persistance</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Base de données MySQL</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Tests unitaires avec JUnit</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Objectifs d'apprentissage -->
      <section class="mb-16">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">Objectifs d'apprentissage</h2>
          <div class="bg-white rounded-lg shadow-md p-8">
            <div class="space-y-4">
              <div class="flex items-start">
                <LightbulbIcon class="h-6 w-6 text-emerald-600 mr-3 mt-0.5" />
                <div>
                  <h3 class="text-lg font-bold text-gray-800 mb-1">Maîtriser Vue.js 3</h3>
                  <p class="text-gray-700">Approfondir ma compréhension de la Composition API, des composables, et des concepts avancés de Vue.js 3.</p>
                </div>
              </div>
              <div class="flex items-start">
                <LightbulbIcon class="h-6 w-6 text-emerald-600 mr-3 mt-0.5" />
                <div>
                  <h3 class="text-lg font-bold text-gray-800 mb-1">Développer avec Spring Boot</h3>
                  <p class="text-gray-700">Créer une API REST robuste et sécurisée avec Spring Boot, en utilisant les bonnes pratiques de développement.</p>
                </div>
              </div>
              <div class="flex items-start">
                <LightbulbIcon class="h-6 w-6 text-emerald-600 mr-3 mt-0.5" />
                <div>
                  <h3 class="text-lg font-bold text-gray-800 mb-1">Intégration frontend-backend</h3>
                  <p class="text-gray-700">Maîtriser l'intégration entre une application Vue.js et une API Spring Boot, y compris l'authentification et la gestion des données.</p>
                </div>
              </div>
              <div class="flex items-start">
                <LightbulbIcon class="h-6 w-6 text-emerald-600 mr-3 mt-0.5" />
                <div>
                  <h3 class="text-lg font-bold text-gray-800 mb-1">UI/UX Design</h3>
                  <p class="text-gray-700">Améliorer mes compétences en design d'interface utilisateur et en expérience utilisateur avec Tailwind CSS.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Fonctionnalités implémentées -->
      <section>
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">Fonctionnalités implémentées</h2>
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6 grid md:grid-cols-2 gap-6">
              <div>
                <ul class="space-y-3">
                  <li class="flex items-center">
                    <CheckIcon class="h-5 w-5 text-emerald-600 mr-2" />
                    <span class="text-gray-700">Authentification des utilisateurs</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-5 w-5 text-emerald-600 mr-2" />
                    <span class="text-gray-700">Recherche et filtrage des lieux</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-5 w-5 text-emerald-600 mr-2" />
                    <span class="text-gray-700">Ajout et modification de lieux</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-5 w-5 text-emerald-600 mr-2" />
                    <span class="text-gray-700">Publication d'avis et de notes</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul class="space-y-3">
                  <li class="flex items-center">
                    <CheckIcon class="h-5 w-5 text-emerald-600 mr-2" />
                    <span class="text-gray-700">Gestion des favoris</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-5 w-5 text-emerald-600 mr-2" />
                    <span class="text-gray-700">Profil utilisateur personnalisable</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-5 w-5 text-emerald-600 mr-2" />
                    <span class="text-gray-700">Catégorisation des lieux</span>
                  </li>
                  <li class="flex items-center">
                    <CheckIcon class="h-5 w-5 text-emerald-600 mr-2" />
                    <span class="text-gray-700">Interface responsive</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  CodeIcon,
  ServerIcon,
  CheckCircleIcon,
  LightbulbIcon,
  CheckIcon
} from 'lucide-vue-next';
</script>
