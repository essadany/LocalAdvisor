<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img :src="getPlaceImage" :alt="lieu.name" class="w-full h-48 object-cover" />
    <div class="p-4">
      <div class="flex justify-between items-start">
        <h2 class="text-lg font-bold text-gray-800">{{ lieu.name }}</h2>
        <div class="flex items-center">
          <StarIcon class="h-5 w-5 text-yellow-500" />
          <span class="ml-1 text-gray-700">{{ lieu.rating }}</span>
        </div>
      </div>
      <p class="text-gray-600 text-sm mt-1">{{ lieu.address }}</p>
      <p class="text-gray-700 mt-2 line-clamp-2">{{ lieu.description }}</p>
      <div class="mt-4 flex justify-between items-center">
        <router-link :to="`/places/${lieu.placeId}`" class="text-emerald-600 hover:underline">Voir détails</router-link>
        <button @click="toggleFavorite" class="text-gray-400 hover:text-red-500 transition-colors">
            <HeartIcon class="h-6 w-6" :class="{ 'text-red-500 fill-current': isFavorite }" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue'
import { StarIcon, HeartIcon } from 'lucide-vue-next'
import { useUserStore } from '@/stores/useUserStore';
import type { Place } from '@/api/placeApi';
import { useImageStore } from '@/stores/useImageStore';

const userStore = useUserStore()
const imageStore = useImageStore()
const props = defineProps<{ lieu: Place }>()

// get the image URL from the image store
const getPlaceImage = ref('')
imageStore.getPlaceImages(props.lieu.placeId).then((images) => {
  if (images && images.length > 0) {
    getPlaceImage.value = images[0].url;
  } else {
    getPlaceImage.value = 'src/assets/logo.png';
  }
});

const isFavorite = computed(() => userStore.isFavorite(props.lieu.placeId))
const toggleFavorite = () => {
  if (isFavorite.value) {
    userStore.removePlaceFromFavorites(props.lieu.placeId)
  } else {
    userStore.addPlaceToFavorites(props.lieu.placeId)
  }
}

</script>
