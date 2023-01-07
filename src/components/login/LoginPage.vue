<template>
  <ion-page>
    <ion-content class="ion-text-center ion-padding">
      <ion-grid fixed>
        <ion-row class="ion-align-items-center" fixed>
          <ion-col>
            <ion-item ref="emailItem">
              <ion-label position="floating">Username</ion-label>
              <ion-input
                v-model="username"
                placeholder="Enter a Username"
                type="email"
                @ionInput="onTypeEmail"
              >
              </ion-input>
              <ion-note slot="error">Invalid email</ion-note>
            </ion-item>
            <ion-item class="center">
              <ion-label position="floating">Password</ion-label>
              <ion-input
                v-model="password"
                placeholder="Enter a Password"
                :type="passwordType"
              >
              </ion-input>
              <ion-button
                fill="clear"
                slot="end"
                @click="showPassword = !showPassword"
              >
                <ion-icon
                  size="small"
                  slot="icon-only"
                  :icon="iconPassword"
                ></ion-icon>
              </ion-button>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button shape="round" @click="login"> Login </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonInputCustomEvent } from "@ionic/core";
import {
  IonContent,
  IonPage,
  IonGrid,
  IonItem,
  IonInput,
  IonLabel,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonNote,
  alertController,
  loadingController,
} from "@ionic/vue";
import { eye, eyeOff } from "ionicons/icons";
import { onMounted, ref, watch } from "vue";
import * as LoginService from "./services/LoginService";
import { useRouter } from "vue-router";
import { LOGIN_CONSTANTS } from "./constants/login.constant";
import { SHARED_CONSTANTS } from "../shared/constants/shared.constant";
import { useStore } from "vuex";

const showPassword = ref(false);
const username = ref("anthyjosemolina4@gmail.com");
const password = ref("1234");
const iconPassword = ref(eye);
const passwordType = ref(SHARED_CONSTANTS.VALUE_TYPES.PASSWORD);
const emailItem = ref();
const router = useRouter();
const store = useStore();

onMounted(() => {
  localStorage.removeItem(SHARED_CONSTANTS.STORAGE_KEYS.TOKEN);
});

watch(showPassword, () => {
  if (!showPassword.value) {
    iconPassword.value = eye;
    passwordType.value = SHARED_CONSTANTS.VALUE_TYPES.PASSWORD;
  } else {
    iconPassword.value = eyeOff;
    passwordType.value = SHARED_CONSTANTS.VALUE_TYPES.TEXT;
  }
});

function onTypeEmail(event: IonInputCustomEvent<InputEvent>) {
  const email = event.target.value as string;
  validateEmail(email);
}

function validateEmail(email: string) {
  const regex = LOGIN_CONSTANTS.EMAIL_REGEXP;
  if (!email) return;

  emailItem.value.$el.classList.remove("ion-valid");
  emailItem.value.$el.classList.remove("ion-invalid");

  regex.test(email)
    ? emailItem.value.$el.classList.add("ion-valid")
    : emailItem.value.$el.classList.add("ion-invalid");
}

async function login() {
  const loading = await loadingController.create({
    message: "Iniciando sesion",
  });
  loading.present();
  const nextUrl = router.currentRoute.value.query.nextUrl as string;

  const response = await LoginService.login(username.value, password.value);
  loading.dismiss();
  if (response.code != 200) {
    const alert = await alertController.create({
      header: response.message,
      buttons: ["OK"],
    });
    await alert.present();

    return;
  }

  localStorage.setItem(
    SHARED_CONSTANTS.STORAGE_KEYS.TOKEN,
    response.data.token
  );

  store.commit("changeSession", true);

  if (nextUrl) {
    router.push(nextUrl);
  } else {
    router.push("/");
  }
}
</script>

<style scoped>
ion-col {
  text-align: center;
}
ion-img {
  border-radius: 100px;
}
ion-item {
  /* border-radius: 20px; */
  margin-top: 1%;
}
</style>
