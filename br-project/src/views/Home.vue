<template>
   <div class="main">
     <login-view ></login-view>
     <register-view ></register-view>
     <retrieve-view ></retrieve-view>
     <head-view ></head-view>
        <transition name="fade" mode="out-in">
              <router-view></router-view>
        </transition> 
     <foot-view></foot-view>
     
   </div>
</template>

<script>
import HeadView from './public/head'
import FootView from './public/foot'
import LoginView from './public/login'
import Registerview from './public/register'
import Retrieveview from './public/retrieve'
export default {
  name: 'home',
  data () {
    return {

    }
    
  },
  components:{
      'head-view':HeadView,
      'foot-view':FootView,
      'login-view':LoginView,
      'register-view':Registerview,
      'retrieve-view':Retrieveview
  },
  methods:{


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
