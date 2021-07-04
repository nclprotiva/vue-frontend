<template>
<div class="offset-md-3 col-md-5 cpl">
  <div class="card">
      <div class="card-body">
        <h2 v-if="loading">Loading</h2>
        <form @submit.prevent="submit">
          <h1 class="h3 mb-3 fw-normal">Please register</h1>
          <div class="form-group mb-2">
            <label for="">Title</label>
            <input v-model="data.name" class="form-control" placeholder="Name" required>
          </div>

          <div class="form-group mb-2">
            <label for="">Email</label>
            <input v-model="data.email" type="email" class="form-control" placeholder="Email" required>
          </div>

          <div class="form-group mb-2">
            <label for="">Password</label>
            <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>
          </div>

          <div class="form-group mb-2 text-center">
            <button class=" btn btn-primary my-2" type="submit">Submit</button>
          </div>
          
        </form>
      </div>
  </div>
</div>
</template>

<script lang="ts">
import {reactive} from 'vue';
import {useRouter} from "vue-router";

export default {
  name: "Register",
  setup() {
    const data = reactive({
      name: '',
      email: '',
      password: ''
    });
    const router = useRouter();

    const submit = async () => {
      await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      await router.push('/login');
    }

    return {
      data,
      submit
    }
  }
}
</script>