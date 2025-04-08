<template>
  <div class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer">
    <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
      <img :src="categorie.icon" class="h-8 w-8 text-emerald-600" />
    </div>
    <h3 class="text-lg font-semibold mb-2">{{ categorie.name }}</h3>
    <p class="text-gray-600 text-sm">{{ categorie.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/api/categoryApi';
import { defineProps } from 'vue';

defineProps<{ categorie: Category }>()

</script>
