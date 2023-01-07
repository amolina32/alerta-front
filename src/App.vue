<template>
  <ion-app>
    <ion-menu content-id="main-content" v-if="onSession">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu Content</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">This is the menu content.</ion-content>
    </ion-menu>
    <ion-page id="main-content">
      <ion-header v-if="onSession">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-button fill="clear" slot="end" @click="logOut">
            <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
          </ion-button>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        Tap the button in the toolbar to open the menu.
        <ion-router-outlet />
      </ion-content>
    </ion-page>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonRouterOutlet,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { logOutOutline } from "ionicons/icons";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { SHARED_CONSTANTS } from "@/components/shared/constants/shared.constant";

const router = useRouter();
const store = useStore();

function logOut() {
  router.push("/login");
  localStorage.removeItem(SHARED_CONSTANTS.STORAGE_KEYS.TOKEN);
  store.commit("changeSession", false);
}

const onSession = computed((): boolean => store.state.onSession);
</script>
