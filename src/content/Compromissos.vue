<template>
  <a class="fixo button is-large is-danger is-loading" v-show="isLoading">Loading</a>
  <div class="container">
    <h1 class="title">{{title}}</h1>
    <div class="columns">
      <div class="column is-5">
        <p class="control has-addons">
          <input class="input is-expanded" type="text" placeholder="O que você procura?" v-model="search" v-on:keyup.enter="searchCompromissos">
          <a class="button is-info" @click.prevent="searchCompromissos"><i class="fa fa-search"></i></a>
        </p>
      </div>
      
      <div class="column is-1">
        <a class="button is-info" @click.prevent="newCompromissos">Novo</a>
      </div>



    </div>
    <div class="columns">
      <div class="column is-12">
        <table class="table is-narrow is-bordered is-mobile">
              <thead>
                <th>Cód</th>
                <th>Titulo</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>N. Prioridade</th>
                <th>Projeto</th>
                <th>Plataforma</th>
                <th>Usuário</th>
                <th>Ações</th>

            </thead>
            <tbody>
              <tr v-for="compromisso in compromissos">
                <td v-link="{ path: '/cdetalhe' }">{{compromisso.id}}</td>
                <td v-link="{ path: '/cdetalhe' }">{{compromisso.titulo}}</td>
                <td v-link="{ path: '/cdetalhe' }">{{compromisso.tipo}}</td>
                <td v-link="{ path: '/cdetalhe' }">{{compromisso.status}}</td>
                <td v-link="{ path: '/cdetalhe' }">{{compromisso.numPrioridade}}</td>
                <td v-link="{ path: '/cdetalhe' }">{{compromisso.projeto}}</td>
                <td v-link="{ path: '/cdetalhe' }">{{compromisso.plataforma}}</td>
                <td v-link="{ path: '/cdetalhe' }">{{compromisso.usuario}}</td>
                <td class="is-icon">
                  <a href="#" @click.prevent="obsCompr(compromisso)">
                    <i class="fa fa-eye"></i>
                  </a>
                  <a href="#" @click.prevent="editarCompromisso(compromisso)">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a href="#" @click.prevent="removerCompromisso(compromisso)">
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
    
    <!-- novo compromisso -->
    <div id="modal_compromisso" class="modal" :class="{'is-active':showModalNew}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Compromisso: {{selected.id}}</p>
          <button class="delete" @click.prevent="showModalNew=false"></button>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column">
              <label class="label">Data</label>
              <p v-text="currentTime"></p>
            </div>
            <div class="column">
              <label class="label">Tipo</label>
              <div class="select">
                  <select>
                    <option v-for="compromisso in compromissos">{{ compromisso.tipo }}</option>
                  </select>
              </div>
            </div>
            <div class="column">
              <label class="label">Status</label>
              <div class="select">
                  <select>
                    <option v-for="compromisso in compromissos">{{ compromisso.status }}</option>
                  </select>
              </div>
            </div>
          </div>
          <label class="label">Projeto</label>
          <div class="select">
              <select>
                <option v-for="compromisso in compromissos">{{ compromisso.projeto }}</option>
              </select>
          </div><br><br>
          <label class="label">Observação Geral</label>
          <p class="control">
              <textarea class="textarea" type="text" placeholder="Faça as anotações necessárias aqui" rows="10" v-model.trim="selected.obs"></textarea>
          </p>
          

        </section>
        <footer class="modal-card-foot">
          <a class="button is-primary" @click.prevent="salvarCompromisso">Salvar</a>
          <a class="button" @click.prevent="showModalNew=false">Cancelar</a>
        </footer>
      </div>
    </div>
    
    
</template>

<script>
  import axios from 'axios'
  var moment = require('moment');
  require("moment/min/locales.min");
  moment.locale('pt-br');

  export default {
    name: 'Compromissos',
    data () {
      return {
        isLoading: false,
        title: 'Compromissos',
        search: '',
        compromissos: [],
        page: 1,
        total: 0,
        selected: {},
        itensPerPage: 10,
        showModalNew: false,
        showModalForum: false,
        currentTime: moment().format('L')
      }
    },
    methods: {  
      validar() {
        if (this.selected.name==null || this.selected.name=='') {
          swal(
            'Oopa...',
            'Por favor, preencha o nome no cadastro!',
            'error'
          )
          this.selected.name.focus();
          return false
        }
        if (this.selected.email==null || this.selected.email=="" || this.selected.email.indexOf('@')==-1 || this.selected.email.indexOf('.')==-1) {
          swal(
            'Por favor, preencha um email válido!',
            'Um email válido possui um @ e um ponto (.)',
            'error'
          )
          this.selected.email.focus();
          return false
        }
      },
      onChangePage(page){
        this.page = page
        this.loadCompromissos()
      },
      showLoading(){
        this.isLoading=true;
      },
      hideLoading(){
        this.isLoading=false;
      },
      loadCompromissos(){

        let t = this
        this.showLoading()

        let start = (this.page * this.itensPerPage) - (this.itensPerPage)
        let end = this.page * this.itensPerPage
        let qString = "";

        if (this.search){
          qString = `&q=${this.search}`
        }

        this.$http.get(`/compromissos?${qString}`).then(
         response=>{
           t.compromissos = response.json()
           t.total = response.headers['X-Total-Count']
         },
         error=>{
           console.log(error)
         }).finally(function () {
          t.hideLoading();
        })

       },
       searchCompromissos(){
        this.loadCompromissos()
       },
       newDetalhes(){
        this.selected={}
        this.showModalForum = true;
       },
       newCompromissos(){
        this.selected={}
        this.showModalNew = true;
       },
       editarCompromisso(compromisso){
        this.selected=compromisso
        this.showModalNew = true;
       },
       removerCompromisso(compromisso){
        let self = this;
        swal({   title: `Você tem certeza que deseja apagar o  "${compromisso.titulo}"?`,
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
                      self.$http.delete(`/compromissos/${compromisso.id}`).then(
                      result=>{
                        swal(
                            'Deletado!',
                            'Este cadastro foi excluido!',
                            'success'
                        )
                      self.loadCompromissos()
                      })
                    }
                 })
       },
       salvarCompromisso(){
        // this.validar()
        if (this.selected.id!=null){  //EDITAR
          this.$http.put(`/compromissos/${this.selected.id}`,this.selected).then(
            response=>{
              this.$set('selected',{})
              this.$set('showModalNew',false)
            },
            error=>{
              console.error(error)
            }
            ).finally(
              this.loadCompromissos()
            )
          }
          else
          { //NOVO
            this.$http.post(`/compromissos`,this.selected).then(
            response=>{
              this.$set('selected',{})
              this.$set('showModalNew',false)
            },
            error=>{
              console.error(error)
            }
            ).finally(
              this.loadCompromissos()
            )
          }
      },
        
      obsCompr(compromisso) {
        swal({
          title: 'Anotações sobre este compromisso',
          type: 'info',
          html: ' <p style="font-size:20px">' + `${compromisso.obs}` + '</p>',
          showCloseButton: true,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Ok!',
        })
      },
    },
    created(){
      this.loadCompromissos();
    },
  }
</script>
<style>
ul {
  padding: 0;
}

.user {
  height: 30px;
  line-height: 30px;
  padding: 10px;
  border-top: 1px solid #eee;
  overflow: hidden;
  transition: all .25s ease;
}

.user:last-child {
  border-bottom: 1px solid #eee;
}

.v-enter, .v-leave-active {
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-top-width: 0;
  border-bottom-width: 0;
}
.fixo{float: right; margin-right: 10px; margin-top: 0px; z-index: 1000;}
</style>