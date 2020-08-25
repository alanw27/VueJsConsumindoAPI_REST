<template>
  <div class="container">
    
    <h1>Criar uma Conta</h1>

    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Agência</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" v-model="conta.agencia" placeholder="Agência">
      </div>
    </div>
    
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Número da Conta</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" v-model="conta.conta" placeholder="Número da Conta">
      </div>
    </div>

    <hr/>

    <div class="form-group row">
      <div class="col-sm-12">
        <button class="btn btn-primary" v-on:click="salvar(conta)" >Cadastrar Conta</button>
        <button class="btn btn-danger" v-on:click="voltar" >Voltar</button>
      </div>
    </div>

    <router-view></router-view>

  </div> 
</template>

<script>

  import axios from 'axios'

  export default {
      name: 'Conta',
      props: {
        msg: String
      },
    data(){
      return {
        conta: {
          agencia: '',
          conta: '',
        },
      }
    },
    methods: {
      salvar(conta){
        const http = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/'
        })
        
        http.post('conta', conta).then(resposta => {
          alert(resposta.data.msg)
          conta.agencia = '';
          conta.conta = '';
        })
      },
      voltar(){
        this.$router.go(-1);
      }
    }
  }
</script>


<style scoped>

</style>
