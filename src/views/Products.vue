<template>
    <router-link to="/productcreate"  class="btn btn-primary mb-5" >Add New Product</router-link> 
    <p v-if="loading">
      Still loading..
      </p>
      <div class="table-responsive">
        <table class="table table-hover product-table table-bordered"  v-if="!loading">
          <thead class="thead-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            <tr  v-for="product in products[0]" :key="product.id">
              <td><img :src="product.image" alt="image"></td>
              <td>{{product.title}}</td>
              <td>{{product.description}}</td>
              <td>{{product.price}}</td>
              <td>
                  <router-link :to="{ path: '/productedit/'+ product.id , params: { id: product.id }}"  class="btn btn-primary">Edit</router-link> 
                  <form @submit.prevent ref="form" class="inline-block mx-2">
                    <input type="hidden" name="id"  :value="product.id">
                    <button @click="deleteProduct(product.id, $event)" type="submit" class="btn btn-danger">Delete</button>
                  </form>
                  
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    
</template>

<script lang="ts">
import {onMounted, ref, computed  } from 'vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import axios from 'axios';
export default {
  data() {
    return {
      
    }
  },
  name: "Products",

  setup() {
    
    const message = ('You are not logged in!');
    const router = useRouter();
    const users = JSON.parse(localStorage.getItem('user') || '{}');
    const products =  [] as  any
    const loading = ref(true);
    const prodId = ref(null);

    const fetchedprodId = computed(() => prodId);
    function fetchData() {
      loading.value = true;
      
      axios.get('http://localhost:8000/api/products', {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
          'Authorization' : `Bearer ${ users.token }`,
          }
      })
      .then(function (response) {
        products.push(response.data);
        
        console.log(products)
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(() => {
        loading.value = false;
      });
    }
    onMounted( () => {
      fetchData();
    });


    function deleteProduct(prodId=ref(null) as any){
      loading.value = true;
      axios.delete(`http://localhost:8000/api/products/${prodId}`,
      {
        headers: {
          'Authorization' : `Bearer ${ users.token }`,
          }
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(() => {
        loading.value = false;
        
      });

      
      
    }
    

    return {
      message,
      products,
      deleteProduct,
      fetchedprodId,
      loading
    }
  },

  

}
</script>

<style>
form.inline-block {
    display: inline-block;
}
</style>