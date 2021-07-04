<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Are you sure? You delete this item?</h1>

    <input v-model="data.id" type="hidden">

    <button class="w-100 btn btn-lg btn-primary" type="submit">Comfirm</button>
  </form>
</template>

<script lang="ts">
import {reactive} from 'vue';
import {useRouter} from "vue-router";
import axios from 'axios';
export default {
  name: "Login",
  setup() {
    const data = reactive({
      id: ''
    });
    const router = useRouter();

    const users = JSON.parse(localStorage.getItem('user') || '{}');
    const prodId= router.currentRoute.value.params.id
    const submit = async () => {

      axios.delete(`http://localhost:8000/api/products/${prodId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
          'Authorization' : `Bearer ${ users.token }`,
          }
      })
      .then(function (response) {
        // products.push(response.data);
        
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      })


      // await fetch('http://localhost:8000/api/products/{id}', {
      //   method: 'Delete',
      //   headers: {"Access-Control-Allow-Origin": "*",
      //           'Content-Type': 'application/json',
      //           'Accept' : 'application/json',
      //           'Authorization' : 'Bearer'
      //           },
      //   credentials: 'include',
      //   body: JSON.stringify(data)
      // });

      // await router.push('/');
    }

    return {
      data,
      submit
    }
  }
}
</script>