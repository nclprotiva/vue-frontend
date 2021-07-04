<template>
  <form @submit.prevent="submit" class="form-signin">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <input v-model="data.email" type="email" class="form-control" placeholder="Email" required>

    <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
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
      email: '',
      password: ''
    });
    const router = useRouter();

    const submit = async () => {


      await axios.post('http://localhost:8000/api/login',data)
      .then((response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.data));
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