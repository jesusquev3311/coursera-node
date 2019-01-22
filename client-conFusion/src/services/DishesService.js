import Api from '@/services/Api'

export default {
  Dishes (url = 'dishes') {
    return {
      getAll: () => Api().get(url),
      createOne: (dish) => Api().post(url, dish)
    } 
  }
}
