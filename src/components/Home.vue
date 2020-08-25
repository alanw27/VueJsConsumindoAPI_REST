<template>
  <div class="container">
    
    <h1>Realizar Operação</h1>
   
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Agência</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" v-model="agencia" placeholder="Agência">
      </div>
    </div>
    
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Número da Conta</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" v-model="conta" v-on:blur="onBlur()" placeholder="Número da Conta">
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Tipo de Operação</label>
      <div class="col-sm-10">
        <select class="form-control" @change="onChange($event)">
          <option :value="itens.id" v-for="itens in tiposOperacoes" :key="itens.id">{{itens.descricao}}</option>
        </select>
      </div>
    </div>

    <div v-show="tipoOperacao < 3" class="form-group row">
      <label class="col-sm-2 col-form-label">Valor</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" v-model="valor" placeholder="Digite o valor a ser deposita ou sacado">
      </div>
    </div>

    <div class="form-group row">
      <div class="col-sm-12">
        <button class="btn btn-success" v-on:click="salvar" >Confirmar Operação</button>
      </div>
    </div>

    <hr/>
    
    <div class="form-check">
      <router-link to="conta" ><label class="form-check-label">Criar um conta</label></router-link>
    </div>
   
    <router-view></router-view>
  </div>  
</template>

<script>
  
  import axios from 'axios'

  export default {

    name: 'Home',
    props: {
      msg: String
    },
    data(){
      return {
        operacao: {
          TipoOperacoes_id: '',
          contas_id: '',
          valor: '',
        },
        agencia: '',
        conta: '',
        valor: '',
        tipoOperacao: 1,
        id_conta: '',
        tiposOperacoes: null,
      }
    },
    methods: {
      salvar(){
        event.prevent
        const http = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/'
        })

        this.operacao.TipoOperacoes_id = this.tipoOperacao
        this.operacao.valor = this.valor
        
        http.post('operacao', this.operacao).then(resposta => {
            this.agencia = ''
            this.conta = ''
            this.valor = ''
            this.tipoOperacao = ''
            this.id_conta = ''
          if(this.operacao.TipoOperacoes_id == 3)
          {
            alert('Seu saldo bancário é de ' + resposta.data.msg)
          }
          else
          {
            alert(resposta.data.msg)
          }
        })
      },
      onBlur(){

        axios.get('http://127.0.0.1:8000/api/conta/'+ this.agencia +'/'+ this.conta).then(resposta => {
          this.operacao.contas_id = resposta.data[0].id;
        })

      },
      onChange(event) {
          this.tipoOperacao = event.target.value;
      }
    },
    mounted(){
      const http = axios.create({
          baseURL: 'http://127.0.0.1:8000/api/'
      })
      
      http.get('tipo_operacao').then(resposta => {
        this.tiposOperacoes = resposta.data
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
