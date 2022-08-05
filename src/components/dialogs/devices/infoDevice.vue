<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { api } from 'src/composables/useAxios'

import DetailInfoQSys from './details/infoQSys.vue'
import DetailInfoBarix from './details/infoBarix.vue'

const props = defineProps({ item: Object })
const emit = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK, onDialogHide, onDialogCancel } =
  useDialogPluginComponent()

const $q = useQuasar()
const info = ref(null)

onMounted(async () => {
  try {
    $q.loading.show()
    const r = await api.get(
      `/device/getDetail?ipaddress=${props.item.ipaddress}`
    )
    info.value = r.data
    $q.loading.hide()
  } catch (err) {
    $q.loading.hide()
    console.error(err)
  }
})
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin body-font">
      <q-card-section class="row no-wrap q-gutter-sm">
        <q-icon
          style="margin-top: 10px"
          name="svguse:icons.svg#serverColorInfo"
          size="1.5rem"
        />
        <div class="name">하드웨어 상세정보</div>
      </q-card-section>

      <q-card-section>
        <DetailInfoQSys
          v-if="item.deviceType === 'Q-Sys'"
          :item="item"
          :status="info"
        />
        <DetailInfoBarix
          v-else-if="item.deviceType === 'Barix'"
          :item="item"
          :status="info"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          unelevated
          color="primary"
          label="확인"
          @click="onDialogOK"
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
