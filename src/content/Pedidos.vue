<template>
  <a class="fixo button is-large is-danger is-loading" v-show="isLoading">Loading</a>
  <div class="container">
    <h1 class="title">{{title}}</h1>
    <div class="columns">
      <div class="column is-5">
        <p class="control has-addons">
          <input class="input is-expanded" type="text" placeholder="O que você procura?" v-model="search" v-on:keyup.enter="searchPedidos">
          <a class="button is-info" @click.prevent="searchPedidos"><i class="fa fa-search"></i></a>
        </p>
      </div>
      
      <div class="column is-1">
        <a class="button is-info" @click.prevent="newPedidos">Novo</a>
      </div>



    </div>
    <div class="columns">
      <div class="column is-10">
        <table class="table is-narrow is-bordered is-mobile">
            <thead>
                <th>Cliente</th>
                <th>Vendedor</th>
                <th>Total de Produtos</th>
                <th>Total do Pedido</th>
                <th>Ações</th>

            </thead>
            <tbody>
              <tr v-for="pedido in pedidos">
                <td>{{pedido.nameCliente}}</td>
                <td>{{pedido.nameVendedor}}</td>
                <td>{{pedido.totalQte}}</td>
                <td>{{pedido.totalValor}}</td>
                <td class="is-icon">
                  <a href="#" @click.prevent="editarPedido(pedido)">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a href="#" @click.prevent="removerPedido(pedido)">
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
<!-- CADASTRAR PEDIDO-->
    <div id="modal_pedido" class="modal" :class="{'is-active':showModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Pedido: {{selected.id}}</p>
          <button class="delete" @click.prevent="showModal=false"></button>
        </header>
        <section class="modal-card-body">
          
          <label class="label">Cliente</label>
          <div class="select">
              <select>
                <option>Selecione um cliente...</option>
                <option>With options</option>
              </select>
          </div>
          <!-- p class="control has-addons">
          <input class="input is-expanded" type="text" placeholder="O que você procura?" v-model="search" v-on:keyup.enter="searchClientes">
              <a class="button is-info" @click.prevent="searchClientes"><i class="fa fa-search"></i></a>
          </p>
          <span class="message is-primary">{{cliente.name}}</span>-->
          <hr>
          
          <label class="label">Produto</label>
          <div class="select">
              <select>
                <option>Selecione um produto...</option>
                <option>With options</option>
              </select>
          </div>
          <!--<p class="control has-addons">
          <input class="input is-expanded" type="text" placeholder="O que você procura?" v-model="search" v-on:keyup.enter="searchClientes">
              <a class="button is-info" @click.prevent="searchClientes"><i class="fa fa-search"></i></a>
          </p>
          <span class="message is-primary">{{produto.name}}</span>-->

          <div class="columns">
            <div class="column">  
              <label class="label">Preço Unitário</label>
              <p class="control">
                <input class="input" v-model="selected.fone">
              </p>
            </div>
            <div class="column">   
              <label class="label">Quantidade</label>
              <p class="control">
                <input class="input" type="number" v-model="selected.datanasc">
              </p>
            </div>
            <div class="column">
              <label>&nbsp</label>
              <p>
                <a class="button is-info" @click.prevent="">Incluir</a>
              </p>
            </div>
          </div>
            <hr>
        <div class="columns">
          <div class="column is-10">
            <table class="table is-narrow is-bordered is-mobile">
                  <thead>
                    <th>Cód.</th>
                    <th>Produto</th>
                    <th>Preço Un.</th>
                    <th>Total</th>
                    <th>Ações</th>

                </thead>
                <tbody>
                  <tr v-for="cliente in clientes">
                    <td>{{cliente.name}}</td>
                    <td>{{cliente.fone}}</td>
                    <td>{{cliente.email}}</td>
                    <td>{{cliente.datanasc}}</td>
                    <td class="is-icon">
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
        <hr>
        <a class="button is-info">Finalizar Pedido</a>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-primary" @click.prevent="salvarPedido">Salvar</a>
          <a class="button" @click.prevent="showModal=false">Cancelar</a>
        </footer>
      </div>
    </div>
</template>

<script>
  import Pagination from './Pagination.vue'
  

  export default {
    name: 'Pedidos',
    data () {
      return {
        isLoading: false,
        title: 'Pedidos',
        search: '',
        clientes: [],
        produtos: [],
        pedidos: [],
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
        //paginação
      onChangePage(page){
        this.page = page
        this.loadPedidos()
      },
        //load da página atual
      showLoading(){
        this.isLoading=true;
      },
      hideLoading(){
        this.isLoading=false;
      },
        //métodos de pedidos
      loadPedidos(){

        let t = this
        this.showLoading()

        let start = (this.page * this.itensPerPage) - (this.itensPerPage)
        let end = this.page * this.itensPerPage
        let qString = "";

        if (this.search){
          qString = `&q=${this.search}`
        }

        this.$http.get(`/pedidos?${qString}`).then(
         response=>{
           t.pedidos = response.json()
           t.total = response.headers['X-Total-Count']
         },
         error=>{
           console.log(error)
         }).finally(function () {
          t.hideLoading();
        })

       },
       searchPedidos(){
        this.loadPedidos()
       },
       newPedidos(){
        this.selected={}
        this.showModal = true;
       },
       editarPedido(pedido){
        this.selected=pedido
        this.showModal = true;
       },
       removerPedido(pedido){
        let self = this;
        swal({   title: `Você tem certeza que deseja apagar "${pedido.name}"?`,
                 text: `Esta ação é irreversível!`,   
                 type: "warning",   
                 showCancelButton: true,   
                 confirmButtonColor: "#DD6B55",   
                 cancelButtonText: "Cancelar",
                 confirmButtonText: "Sim, pode apagar!", 
                 showLoaderOnConfirm: true,  
                 closeOnCancel: true }).then( 
                 function (value) {
                     if (value === false) {
                         return false; 
                     }
                      else{
                      self.$http.delete(`/pedidos/${pedido.id}`).then(
                      result=>{
                        swal(
                            'Deletado!',
                            'Este cadastro foi excluido!',
                            'success'
                        )
                      self.loadPedidos()
                      })
                    }
                 })
       },
       salvarPedido(){
        if (this.selected.id!=null){  //EDITAR
          this.$http.put(`/pedidos/${this.selected.id}`,this.selected).then(
            response=>{
              this.$set('selected',{})
              this.$set('showModal',false)
            },
            error=>{
              console.error(error)
            }
            ).finally(
              this.loadPedidos()
            )
          }
          else
          { //NOVO
            this.$http.post(`/pedidos`,this.selected).then(
            response=>{
              this.$set('selected',{})
              this.$set('showModal',false)
            },
            error=>{
              console.error(error)
            }
            ).finally(
              this.loadPedidos()
            )
          }
       },
        //métodos de clientes
     },
     created(){
      this.loadPedidos();
    },
  }
</script>
<style>
  .fixo{float: right; margin-right: 10px; margin-top: 0px; z-index: 1000;}
</style>