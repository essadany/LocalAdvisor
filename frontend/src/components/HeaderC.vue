<template>
  <header class="bg-white shadow-sm">
        <div class="container mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <MapPin class="h-6 w-6 text-emerald-600 mr-2" />
              <span class="text-xl font-bold text-gray-900">GuideLocal</span>
            </div>
            <nav class="hidden md:flex space-x-8">
              <a href="/" class="text-gray-700 hover:text-emerald-600 font-medium">Accueil</a>
              <a href="/places" class="text-gray-700 hover:text-emerald-600 font-medium">Explorer</a>
              <a href="/categories" class="text-gray-700 hover:text-emerald-600 font-medium">Catégories</a>
              <a href="/about" class="text-gray-700 hover:text-emerald-600 font-medium">À propos</a>
              <a href="/contact" class="text-gray-700 hover:text-emerald-600 font-medium">Contact</a>
            </nav>
            <div class="flex items-center space-x-4">
              <a href="/login" class="hidden md:block px-4 py-2 text-emerald-600 border border-emerald-600 rounded-md hover:bg-emerald-50 transition">
                Connexion
              </a>
              <a href="/register" class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition">
                S'inscrire
              </a>
              <button class="md:hidden" @click="toggleMobileMenu">
                <Menu class="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>

          <!-- Menu Mobile -->
          <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4">
            <nav class="flex flex-col space-y-4">
              <a href="#" class="text-gray-700 hover:text-emerald-600 font-medium">Accueil</a>
              <a href="#" class="text-gray-700 hover:text-emerald-600 font-medium">Explorer</a>
              <a href="#" class="text-gray-700 hover:text-emerald-600 font-medium">Catégories</a>
              <a href="#" class="text-gray-700 hover:text-emerald-600 font-medium">À propos</a>
              <a href="#" class="text-gray-700 hover:text-emerald-600 font-medium">Contact</a>
              <a href="/connexion" class="text-gray-700 hover:text-emerald-600 font-medium">Connexion</a>
            </nav>
          </div>
        </div>
      </header>
  </template>

  <script lang="ts" setup>
import { ref } from 'vue'
import {
  MapPin,
  Menu,
} from 'lucide-vue-next'

const mobileMenuOpen = ref(false)


const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
  </script>
