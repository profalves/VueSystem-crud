<template>
  <a class="fixo button is-large is-danger is-loading" v-show="isLoading">Loading</a>
  <div class="container">
    <h1 class="title">{{title}}</h1>
    <div class="columns">
      <div class="column is-5">
        <p class="control has-addons">
          <input class="input is-expanded" type="text" placeholder="Procure pelo nome" v-model="search" v-on:keyup.enter="searchClientes">
          <a class="button is-info" @click.prevent="searchClientes">Search</a>
        </p>
      </div>
      
      <div class="column is-1">
        <a class="button is-info" @click.prevent="newClientes">Novo</a>
      </div>



    </div>
    <div class="columns">
      <div class="column is-10">
        <table class="table is-narrow is-bordered">
          <thead>
            <th>Nome</th>
            <th>Telefone</th>
            <th>email</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes">
            <td>{{cliente.name}}</td>
            <td>{{cliente.fone}}</td>
            <td>{{cliente.email}}</td>
            <td>{{cliente.datanasc}}</td>
            <td class="is-icon">

              <a href="#" @click.prevent="editarCliente(cliente)">
                <i class="fa fa-edit"></i>
              </a>
              <a href="#" @click.prevent="removerCliente(cliente)">
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

    <div id="modal_cliente" class="modal" :class="{'is-active':showModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Cliente: {{selected.name}}</p>
          <button class="delete" @click.prevent="showModal=false"></button>
        </header>
        <section class="modal-card-body">
          <label class="label">Nome</label>
          <p class="control">
            <input class="input" type="text" placeholder="Nome" v-model="selected.name">
          </p>
          <label class="label">E-mail</label>
          <p class="control">
            <input class="input" type="text" placeholder="Email" v-model="selected.email">
          </p>

          <div class="columns">
            <div class="column">  
              <label class="label">Fone</label>
              <p class="control">
                <input class="input" placeholder="Fixo/Celular" v-model="selected.fone">
              </p>
            </div>
            <div class="column">   
              <label class="label">Data de Nascimento</label>
              <p class="control">
                <input class="input" type="text" placeholder="dd/mm/yyyy" v-model="selected.datanasc">
              </p>
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <a class="button is-primary" @click.prevent="salvarCliente">Salvar</a>
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
        title: 'Clientes',
        search: '',
        clientes: [],
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
      validateAll: function () {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.$refs.clientes.submit()
        }
      },  
      onChangePage(page){
        this.page = page
        this.loadClientes()
      },
      showLoading(){
        this.isLoading=true;
      },
      hideLoading(){
        this.isLoading=false;
      },
      loadClientes(){

        let t = this
        this.showLoading()

        let start = (this.page * this.itensPerPage) - (this.itensPerPage)
        let end = this.page * this.itensPerPage
        let qString = "";

        if (this.search){
          qString = `&q=${this.search}`
        }

        this.$http.get(`/clientes?${qString}`).then(
         response=>{
           t.clientes = response.json()
           t.total = response.headers['X-Total-Count']
         },
         error=>{
           console.log(error)
         }).finally(function () {
          t.hideLoading();
        })

       },
       searchClientes(){
        this.loadClientes()
       },
       newClientes(){
        this.selected={}
        this.showModal = true;
       },
       editarCliente(cliente){
        this.selected=cliente
        this.showModal = true;
       },
       removerCliente(cliente){
        let self = this;
        swal({   title: `Você tem certeza que deseja apagar "${cliente.name}"?`,
                 text: `Esta ação é irreversível!`,   
                 type: "warning",   
                 showCancelButton: true,   
                 confirmButtonColor: "#DD6B55",   
                 cancelButtonText: "Cancelar",
                 confirmButtonText: "Sim, pode apagar!", 
                 showLoaderOnConfirm: true,  
                 closeOnConfirm: false }, 
                function(){ 
                  self.$http.delete(`/clientes/${cliente.id}`).then(
                    result=>{
                      swal("Cliente Removido!")
                      self.loadClientes()
                    })
        });
       },
       salvarCliente(){
        if (this.selected.id!=null){  //EDITAR
          this.$http.put(`/clientes/${this.selected.id}`,this.selected).then(
            response=>{
              this.$set('selected',{})
              this.$set('showModal',false)
            },
            error=>{
              console.error(error)
            }
            ).finally(
              this.loadClientes()
            )
          }
          else
          { //NOVO
            this.$http.post(`/clientes`,this.selected).then(
            response=>{
              this.$set('selected',{})
              this.$set('showModal',false)
            },
            error=>{
              console.error(error)
            }
            ).finally(
              this.loadClientes()
            )
          }
       }
     },
     created(){
      this.loadClientes();
    },
  }
</script>
<style>
  .fixo{float: right; margin-right: 10px; margin-top: 0px; z-index: 1000;}
</style>