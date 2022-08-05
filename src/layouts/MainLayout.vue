<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header row justify-between items-center">
      <q-toolbar class="q-gutter-x-md">
        <!-- <q-btn flat round icon="menu" size="md" /> -->
        <div class="row pointer" @click="router.push('/')">
          <q-icon
            style="margin-top: 3px"
            name="svguse:icons.svg#logo"
            size="1.8rem"
          />
          <div class="header-font">Media Server</div>
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
  font-family: NanumSquare;
  font-weight: 800;
  font-size: 1.5rem;
}
</style>
