<template>
  <ion-page>
    <ion-content>
      <ion-button @click="test">Search users</ion-button>
      <ion-list v-if="users.length > 0">
        <ion-item v-for="(user, index) in users" :key="index">
          <ion-label>{{ user.name }}</ion-label>
          <ion-button
            slot="end"
            fill="clear"
            color="danger"
            @click="deleteTest(index)"
            ><ion-icon slot="icon-only" :icon="trashOutline"></ion-icon
          ></ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { trashOutline } from "ionicons/icons";
import * as LoginService from "@/components/login/services/LoginService";
import { reactive } from "vue";

interface User {
  name: string;
  email: string;
}

const users = reactive<User[]>([]);

async function test() {
  const response = await LoginService.test();

  response.forEach((user: any) => {
    users.push({ name: user.firstName, email: user.email });
  });
}

function deleteTest(index: number) {
  users.splice(index, 1);
}
</script>

<style scoped></style>
