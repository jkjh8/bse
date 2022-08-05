<script setup>
import { useQuasar, useDialogPluginComponent } from 'quasar'

const props = defineProps({
  icon: String,
  iconColor: String,
  btnColor: String,
  title: String,
  caption: String,
  message: String
})
const emit = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin body-font">
      <q-card-section class="row no-wrap q-gutter-sm">
        <q-icon
          style="margin-top: 10px"
          :name="icon"
          :color="iconColor ? iconColor : 'primary'"
          size="1.5rem"
        />
        <div class="name">{{ title }}</div>
      </q-card-section>

      <q-card-section>
        {{ message }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          style="width: 80px"
          label="취소"
          flat
          color="red-10"
          @click="onDialogCancel"
        />
        <q-btn
          style="width: 80px"
          label="확인"
          :color="btnColor ?? 'primary'"
          unelevated
          @click="onDialogOK"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
.confirmDialog {
  width: 400px;
  min-width: 350px;
  border-radius: 0.5rem;
}
</style>
