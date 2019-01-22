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
                <span class="d-block">Price: {{ dish.price}}</span>
                <div class="comments">
                  <template v-for="comment in dish.comments">
                    <span class="comment">
                      <span>{{  comment.rating }}</span>
                      <span>{{  comment.author }}</span>
                      <span>{{  comment.description }}</span>
                    </span>
                  </template>
                </div>
            </div>
          </div>
        </template>
      </div>

      <div class="row">
         <div class="col-sm-12">
            <div class="create-dish">
              <h3>Add a New Dish</h3>
              <form @submit="addDish" class="form">
                <div class="form-group">
                  <input type="text" v-model="dish.name" class="form-control" placeholder="Dish Name">
                </div>
                <div class="form-group">
                  <input type="text" v-model="dish.description" class="form-control" placeholder="Dish Description">  
                </div>

                <input type="text" v-model="dish.price" class="form-control" placeholder="Dish Price">  
                <input type="text" v-model="dish.image" class="form-control" placeholder="Dish Image URL">  
                <input type="text" v-model="dish.category" class="form-control" placeholder="Dish Category">  
                <button type="submit">send</button>
              </form>
              

            </div>
        </div>
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
        dish:{
          name:'',
          description:'',
          price: '',
          image: '',
          category: ''
        },
        title: 'Dishes'
      }
  },
  mounted () {
    this.getDishes()
  },
  computed: {
    dishesUp(){
      return this.getDishes().dishes;
    }
  },
  methods: {
    async getDishes () {
      const response = await DishesService.Dishes().getAll()
      this.dishes = response.data
    },
    async addDish () {
      event.preventDefault();
      
      await DishesService.Dishes().createOne({
        name: this.dish.name,
        description: this.dish.description,
        price: this.dish.price,
        category: this.dish.category,
        image: this.dish.image
      }).then((response) => {
          console.log('dish created: ', response)
          this.$nextTick(function () {
            this.dishesUp;
          })
      }).catch(err => console.log('there was an error: ', err))

      this.$router.push({name: 'Dishes'})

      console.log('result:', this.dish)
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


