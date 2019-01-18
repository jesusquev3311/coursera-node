import Api from '@/services/Api'

export default {
  fetchDishes () {
    return Api().get('dishes')
  }
}
