<template>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center mb-4">
              <img src="" alt="" class="w-12 h-12 rounded-full mr-4">
              <div>
                <h4 class="font-semibold">{{ review.user.name }}</h4>
                <p class="text-sm text-gray-500">à propos de <span class="font-medium text-emerald-600">{{ review.place.name }}</span></p>
              </div>
            </div>
            <div class="flex text-yellow-400 mb-2">
              <Star v-for="i in 5" :key="i" class="h-4 w-4" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'" />
            </div>
            <p class="text-gray-600 italic">"{{ review.content }}"</p>
            <p class="text-sm text-gray-500 mt-4">{{ review.createdAt }}</p>
          </div>
        </div>
</template>

<script setup lang="ts">
import type { Review } from '@/api/reviewApi';
import { Star } from 'lucide-vue-next';
import { defineProps } from 'vue';

defineProps<{ review: Review }>()

</script>
