<template>
  <div class="login-view layout-padding">
     <q-card class="bg-white card" inline>
      <q-card-title>
        <h3>Login</h3>
        <span slot="subtitle"></span>
      </q-card-title>
      <q-card-main>
        <form @submit.prevent="authenticate">
          <q-input v-model="form.username" stack-label="Email" />
          <q-input v-model="form.password" stack-label="Password" />
          <q-btn type="submit" big class="bg-primary text-white">Login</q-btn>
        </form>
      </q-card-main>
    </q-card>
  </div>
</template>
<script>
  import { QInput, QBtn, QCard, QCardTitle, QCardMain, Toast } from 'quasar'
  export default
  {
    data(){
      return {
        form : {
          username : null,
          password : null,
        }
      }
    },
    mounted(){
      console.log("Login view Loaded!")
    },
    methods : {
      loginError(){
        Toast.create({
          html: 'Email or password incorrect',
          icon: 'lock',
          timeout: 2500,
          color: 'white',
          bgColor: '#da291c'
        })
      },
      async authenticate(){
        let username = this.form.username
        let password = this.form.password
        try{
          let authentication = await this.$oauth.login(username, password) 
          //User logged

          //This code is not in the medium post but it's cool

          let redirection = '/' //Default route
          if(this.$route.query.redirect){ //If query has a prop redirect
            redirection = this.$route.query.redirect
          }else{
            //Otherwise redirect to default route
          }

          this.$router.replace('/');
        }
        catch(error){
          //Error in Login
          this.loginError();

        }
      }
    },
    components : {
      QInput,
      QBtn,
      QCard,
      QCardTitle,
      QCardMain
    }
  }
</script>
<style lang="scss">
.login-view{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #898989;
  .card{
    padding: 24px;
    min-width: 300px;
  }
  form{
    max-width: 420px;
  }
}
</style>

