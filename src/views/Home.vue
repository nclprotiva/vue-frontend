<template>
  {{ message }}
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
import axios from 'axios';


export default {
  name: "Home",
  props: ["token"],
  setup() {
    const message = ref('You are not logged in!');
    const store = useStore();
    const users = JSON.parse(localStorage.getItem('user') || '{}');
    // const token = users.token
    // users.token = ''
  // console.log(token)
    onMounted(()=>{

      
      
      axios.get('http://localhost:8000/api/user', {
          headers: {
               "Access-Control-Allow-Origin": "*",
               'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${ JSON.parse(localStorage.getItem('user') || '{}') }`,
                
               }
      })
      .then(function (response) {
        
        console.log(response)
        const content =  response.data;
        message.value = `Hi ${content.name}`;
        store.dispatch('setAuth', true);
      })
      .catch(function (error) {
        console.log(error);
      })
    }
      
    //   async () => {
    //   axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //     try {
            
    //     const response = await axios.get('http://localhost:8000/api/user')
    //     const content = await response.data;
    //     console.log(response)
        
    //     message.value = `Hi ${content.name}`;

    //     await store.dispatch('setAuth', true);
    //   } catch (e) {
    //     await store.dispatch('setAuth', false);
    //   }

      
    // }
    
    )





    // onMounted(async () => {
    //   try {
    //     const response = await fetch('http://localhost:8000/api/user', {
    //       headers: {'Content-Type': 'application/json'},
    //       credentials: 'include'
    //     });

    //     const content = await response.json();

    //     message.value = `Hi ${content.name}`;

    //     await store.dispatch('setAuth', true);
    //   } catch (e) {
    //     await store.dispatch('setAuth', false);
    //   }
    // });

    return {
      message
    }
  }
}
</script>
