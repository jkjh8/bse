import moment from 'moment'

export const ISOToDate = (time) => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss a')
}
