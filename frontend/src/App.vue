<template>
  <div class="min-h-screen bg-gray-50">
    <HeaderC />
    <main class="flex-grow">
      <RouterView />
    </main>
    <FooterC />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import HeaderC from '@/components/HeaderC.vue';
import FooterC from '@/components/FooterC.vue';
</script>

<style>
/* Ajoutez ici des styles globaux si nécessaire */
</style>
