<template>

  <div class="offset-md-3 col-md-5 cpl">
  
  <div class="card">
    <div class="card-body">
      <h2 v-if="loading">Loading</h2>
      
      
      <form v-else @submit.prevent="submit" enctype="multipart/form-data">

        <h1 class="h3 mb-3 fw-normal">Product List</h1>
        <div class="form-group mb-2">
          <label for="exampleInputEmail1">Title</label>
        <input v-model="fetchedProduct.title" class="form-control" name="title" placeholder="Title" required>
        </div>

        <div class="form-group mb-2">
          <label for="exampleInputEmail1">Price</label>
        <input v-model="fetchedProduct.price" type="number" name="price" class="form-control" placeholder="Price" required>
        </div>

        <div class="form-group mb-2">
          <label for="exampleInputEmail1">Description</label>
        <textarea v-model="fetchedProduct.description" type="text" name="description" class="form-control" placeholder="Description"></textarea>
        </div>

        <div class="form-group mb-2">
          <label for="exampleInputEmail1">Image</label>
          <input type="file" name="image">
        </div>

        <div class="form-group text-center">
          <button class="btn btn-primary" type="submit">Edit</button>
        </div>
        
      </form>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import {onMounted, ref, computed ,reactive, toRef  } from 'vue';
import {useRouter} from "vue-router";
import axios from 'axios';

export default {
  name: "Login",
  // props: ['id'],
  
  setup() {
    
    const data = reactive({

    });
    const router = useRouter();

    const prodId= router.currentRoute.value.params.id
    const users = JSON.parse(localStorage.getItem('user') || '{}');
    
    let product =  {
      title: '',
      price: '',
      description: '',
      file: '',
    } as  any;

    const loading = ref(true);

    const fetchedProduct = computed(() => product);

    function fetchData() {
      loading.value = true;
      axios.get(`http://localhost:8000/api/products/${prodId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
          'Authorization' : `Bearer ${ users.token }`,
          }
      })
      .then(function (response) {
        product =  response.data
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


    const submit = async () => {


      axios.post(`http://localhost:8000/api/product-update/${prodId}`,product, {
        headers: {
          // "Access-Control-Allow-Origin": "*",
          // 'Content-Type': 'application/json',
          // 'Accept' : 'application/json',
          'Authorization' : `Bearer ${ users.token }`,
          },
          // credentials: 'include',
          // body: 
      })
      .then(function (response) {
        console.log(response)
        router.push('/products');
      })
      .catch(function (error) {
        console.log(error);
      })



      // await fetch(`http://localhost:8000/api/product/${prodId}`, {
      //   method: 'PUT',
      //   headers: {"Access-Control-Allow-Origin": "*",
      //           'Content-Type': 'application/json',
      //           'Accept' : 'application/json',
      //           'Authorization' : 'Bearer'
      //           },
      //   credentials: 'include',
      //   body: JSON.stringify(product)
      // });

      // await router.push('/');
    }

    return {
      fetchedProduct,
      loading,
      submit
    }
  }
}
</script>