<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div class="relative h-48">
      <img :src="categorie.icon" :alt="categorie.name" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
        <div class="p-6 w-full">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white">{{ categorie.name }}</h2>
            <div class="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
              {{ categorie.categoryId }} lieux
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-6">
      <p class="text-gray-600 mb-4"> categorie.tags </p>
      <!-- <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="(tag, index) in categorie.description"
          :key="index"
          class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
        >
          {{ tag }}
        </span>
      </div> -->
      <div class="flex justify-between items-center">
        <router-link
          :to="`/places?category=${categorie.categoryId}`"
          class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
        >
          Voir tous les lieux
          <ArrowRightIcon class="h-4 w-4 ml-1" />
        </router-link>
        <span class="text-gray-500 text-sm"> categorie.nombreAvis  avis</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/api/categoryApi';
import { ArrowRightIcon } from 'lucide-vue-next';
import { defineProps } from 'vue';

defineProps<{ categorie: Category }>()

</script>
