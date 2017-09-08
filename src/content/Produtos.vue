<template>
  <a class="fixo button is-large is-danger is-loading" v-show="isLoading">Loading</a>
  <div class="container">
    <h1 class="title">{{title}}</h1>
    <div class="columns">
      <div class="column is-5">
        <p class="control has-addons">
          <input class="input is-expanded" type="text" placeholder="O que você procura?" v-model="search" v-on:keyup.enter="searchProdutos">
          <a class="button is-info" @click.prevent="searchProdutos">Search</a>
        </p>
      </div>
      
      <div class="column is-7">
        <a class="button is-info" @click.prevent="newProdutos">Novo</a>
      </div>



    </div>
    <div class="columns">
      <div class="column is-10">
        <table class="table is-narrow is-bordered">
          <thead>
            <th>Nome</th>
            <th>Preço</th>
            <th>Data de Validade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto in produtos">
            <td>{{produto.name}}</td>
            <td>{{produto.preco}}</td>
            <td>{{produto.datavali}}</td>
            <td class="is-icon">

              <a href="#" @click.prevent="editarProduto(produto)">
                <i class="fa fa-edit"></i>
              </a>
              <a href="#" @click.prevent="removerProduto(produto)">
                <i class="fa fa-trash"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Paginação -- 
      <Pagination :total="total" :page="page" :itens-per-page="itensPerPage" @change-page="onChangePage"></Pagination> -->
    </div>
  </div>
</div>

<div id="modal_produto" class="modal" :class="{'is-active':showModal}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Produto: {{selected.name}}</p>
      <button class="delete" @click.prevent="showModal=false"></button>
    </header>
    <section class="modal-card-body">
      <label class="label">Nome</label>
      <p class="control">
        <input class="input" type="text" placeholder="Nome" v-model="selected.name">
      </p>
     
      <div class="columns">
        <div class="column">  
          <label class="label">Data de Validade</label>
          <p class="control">
            <input class="input" placeholder="Fixo/Celular" v-model="selected.datavali">
          </p>
        </div>
        <div class="column">   
          <label class="label">Preço</label>
          <p class="control">
            <input class="input" type="text" placeholder="dd/mm/yyyy" v-model="selected.preco">
          </p>
        </div>
      </div>
      <label class="label">Detalhes do Produto</label>
      <p class="control">
        <input class="input" type="text" placeholder="Email" v-model="selected.descricao">
      </p>  

        
    </section>
    <footer class="modal-card-foot">
      <a class="button is-primary" @click.prevent="salvarProduto">Salvar</a>
      <a class="button" @click.prevent="showModal=false">Cancelar</a>
    </footer>
  </div>
</div>
</template>

<script>
  import Pagination from './Pagination.vue'
  

  export default {
    data () {
      return {
        isLoading: false,
        title: 'Produtos',
        search: '',
        produtos: [],
        page: 1,
        total: 0,
        selected: {},
        itensPerPage: 10,
        showModal:false
      }
    },
    components: {
      Pagination
    },
    methods: {
      onChangePage(page){
        this.page = page
        this.loadProdutos()
      },
      showLoading(){
        this.isLoading=true;
      },
      hideLoading(){
        this.isLoading=false;
      },
      loadProdutos(){

        let t = this
        this.showLoading()

        let start = (this.page * this.itensPerPage) - (this.itensPerPage)
        let end = this.page * this.itensPerPage
        let qString = "";

        if (this.search){
          qString = `&q=${this.search}`
        }

        this.$http.get(`/produtos?${qString}`).then(
         response=>{
           t.produtos = response.json()
           t.total = response.headers['X-Total-Count']
         },
         error=>{
           console.log(error)
         }).finally(function () {
          t.hideLoading();
        })

       },
       searchProdutos(){
        this.loadProdutos()
       },
       newProdutos(){
        this.selected={}
        this.showModal = true;
       },
       editarProduto(produto){
        this.selected=produto
        this.showModal = true;
       },
       removerProduto(produto){
        let self = this;
        swal({  title: "Você tem certeza?",
                 text: `Deseja apagar "${produto.name}"`,   
                 type: "warning",   
                 showCancelButton: true,   
                 confirmButtonColor: "#DD6B55",   
                 cancelButtonText: "Cancelar",
                 confirmButtonText: "Sim, pode apagar!", 
                 showLoaderOnConfirm: true,  
                 closeOnConfirm: false }, function(){   
                  
                  self.$http.delete(`/produtos/${produto.id}`).then(
                    result=>{
                      swal("Produto Removido!")
                      self.loadProdutos()
                    })
        });

       },
       salvarProduto(){
        if (this.selected.id!=null){  //EDITAR
          this.$http.put(`/produtos/${this.selected.id}`,this.selected).then(
            response=>{
              this.$set('selected',{})
              this.$set('showModal',false)
            },
            error=>{
              console.error(error)
            }
            ).finally(
              this.loadProdutos()
            )
          }
          else
          { //NOVO
            this.$http.post(`/produtos`,this.selected).then(
            response=>{
              this.$set('selected',{})
              this.$set('showModal',false)
            },
            error=>{
              console.error(error)
            }
            ).finally(
              this.loadProdutos()
            )
          }
       }
     },
     created(){
      this.loadProdutos();
    },
  }
</script>
<style>
  .fixo{float: right; margin-right: 10px; margin-top: 0px; z-index: 1000;}
</style>