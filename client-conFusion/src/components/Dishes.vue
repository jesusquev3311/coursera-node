<template>
    <div>
        <h1>{{this.title}}</h1>

        <div v-for="dish in dishes">
            <div class="dish-item">
                <span class="img-wrapper" > <img :src= "dish.image" alt=""></span>
                <span><b>{{ dish.name }}</b></span><br />
                <span>{{ dish.description }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import DishesService from '@/services/DishesService'

export default {
    name: 'Dishes',
     data () {
    return {
      dishes: [],
      title: 'Dishes'
    }
  },
  mounted () {
    this.getDishes()
  },
  methods: {
    async getDishes () {
      const response = await DishesService.fetchDishes()
      this.dishes = response.data
    }
  }
}
</script>

<style lang="scss">
    .img-wrapper{
        img{
            height: 240px;
            width: 240px;
            object-fit: contain;
            display: inline-block;
        }
    }
</style>


