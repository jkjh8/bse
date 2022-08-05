import { useQuasar } from 'quasar'

export default () => {
  const $q = useQuasar()

  return {
    info: (msg, caption) => {
      $q.notify({
        icon: 'info',
        message: msg,
        caption: caption ?? '',
        position: 'top',
        color: 'positive',
        actions: [
          {
            icon: 'close',
            round: true,
            size: 'sm',
            color: 'white',
            handler: () => {}
          }
        ]
      })
    },
    warn: (msg, caption) => {
      $q.notify({
        icon: 'warning',
        message: msg,
        caption: caption ?? '',
        position: 'top',
        color: 'orange',
        actions: [
          {
            icon: 'close',
            round: true,
            size: 'sm',
            color: 'white',
            handler: () => {}
          }
        ]
      })
    },
    error: (msg, caption) => {
      $q.notify({
        icon: 'error',
        message: msg,
        caption: caption
          ? caption
          : '잠시후에 다시 시도해주세요. 문제가 계속 되면 관리자에게 문의해 주세요',
        position: 'top',
        color: 'negative',
        textColor: 'white',
        actions: [
          {
            icon: 'close',
            round: true,
            size: 'sm',
            color: 'white',
            handler: () => {}
          }
        ]
      })
    }
  }
}
