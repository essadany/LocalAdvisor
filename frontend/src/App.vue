<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <HeaderC />
    <main class="flex-1 flex flex-col">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <template #default>
              <keep-alive>
                <component :is="Component" class="flex-1" />
              </keep-alive>
            </template>
            <template #fallback>
              <div class="flex-1 flex items-center justify-center">
                <LoaderC />
              </div>
            </template>
          </Suspense>
        </template>
        <template v-else>
          <div class="flex-1 flex items-center justify-center">
            <LoaderC />
          </div>
        </template>
      </router-view>
    </main>
    <FooterC />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import HeaderC from '@/components/HeaderC.vue';
import FooterC from '@/components/FooterC.vue';
import LoaderC from '@/components/LoaderC.vue';
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
