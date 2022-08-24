<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header row justify-between items-center">
      <q-toolbar class="q-gutter-x-md">
        <!-- <q-btn flat round icon="menu" size="md" /> -->
        <div
          class="logo row no-wrap items-center q-gutter-x-sm pointer"
          @click="router.push('/')"
        >
          <q-img src="logo.png" style="width: 1.5rem; height: 1.5rem" />
          <div class="header-font q-mt-xs">Media Server</div>
        </div>
      </q-toolbar>
      <!-- <Menu /> -->
    </q-header>

    <q-page-container class="page">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.header {
  background: #fff;
  height: 3.5rem;
  color: #333;
  /* padding: 0 5% 0 5%; */
}
.header-font {
  font-family: 다음체;
  font-weight: 400;
  font-size: 1.5rem;
}
.logo {
  position: absolute;
  left: 2rem;
  height: 3rem;
}
</style>
