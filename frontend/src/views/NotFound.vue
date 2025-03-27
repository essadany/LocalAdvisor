<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Contenu principal -->
    <main class="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
      <div class="text-center max-w-lg">
        <!-- Illustration 404 -->
        <div class="mb-8">
          <div class="relative">
            <div class="text-9xl font-bold text-emerald-600 opacity-10">404</div>
            <div class="absolute inset-0 flex items-center justify-center">
              <MapPinIcon class="h-24 w-24 text-emerald-600" />
            </div>
          </div>
        </div>

        <h1 class="text-4xl font-bold text-gray-800 mb-4">Page introuvable</h1>
        <p class="text-xl text-gray-600 mb-8">
          Oups ! Il semble que vous vous soyez perdu. La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div class="space-y-4">
          <router-link to="/"
            class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
            Retour à l'accueil
          </router-link>
        </div>
      </div>
  </main>
  </div>
</template>

<script setup lang="ts">
import {
  MapPinIcon,
} from 'lucide-vue-next';



</script>
