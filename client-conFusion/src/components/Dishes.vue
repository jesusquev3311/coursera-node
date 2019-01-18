<template>
  <section id="dishes">
    <div class="container">
      <h1>{{this.title}}</h1>
      <div class="row">
        <template v-for="dish in dishes">
          <div class="col-sm-4">
            <div class="dish-item">
                <span class="img-wrapper" > <img :src= "dish.image" alt=""></span>
                <span><b>{{ dish.name }}</b></span><br />
                <span>{{ dish.description }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>

  </section>
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
      const response = await DishesService.Dishes().getAll()
      this.dishes = response.data
    }
  }
}
</script>

<style lang="scss">
  .img-wrapper{
    display: block;
    img{
        height: 240px;
        width: 240px;
        object-fit: contain;
        display: inline-block;
    }
  }
</style>


