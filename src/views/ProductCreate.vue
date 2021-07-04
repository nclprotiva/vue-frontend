<template>

  <div class="offset-md-3 col-md-5 cpl">
  
    <div class="card">
      <div class="card-body">
 
        <form @submit.prevent="submit" enctype="multipart/form-data">
          <h4 class="h3 mb-3 fw-normal">AddProduct</h4>

          <div class="form-group mb-2">
            <label for="exampleInputEmail1">Title</label>
            <input v-model="data.title" class="form-control" placeholder="Title" required>
          </div>

          <div class="form-group mb-2">
            <label for="exampleInputEmail1">Price</label>
            <input v-model="data.price" type="number" class="form-control" placeholder="Price" required>
          </div>

          <div class="form-group mb-2">
            <label for="exampleInputEmail1">Description</label>
           <textarea v-model="data.description" type="text" class="form-control" placeholder="Description"></textarea>
          </div>

          <div class="form-group mb-2">
            <input type="file" name="image">
          </div>

          <div class="form-group mb-2">
            <button class="btn btn-primary" type="submit">Save</button>
          </div>
          

          
          
          
          
        </form>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive} from 'vue';
import {useRouter} from "vue-router";
import axios from 'axios';
export default {
  name: "Login",
  setup() {
    const users = JSON.parse(localStorage.getItem('user') || '{}');
    const data = reactive({
      title: '',
      price: '',
      description: '',
      file: '',
    });
    const router = useRouter();

    const submit = async () => {
      await axios.post('http://localhost:8000/api/product',data,{
        headers: {
          'Authorization' : `Bearer ${ users.token }`,
          }
      })
      .then((response) => {
        console.log(response);
        router.push('/products');
      }).catch((error) => {
        console.log(error);
      });


    }

    return {
      data,
      submit
    }
  }
}
</script>