<template>
    <div id="app">
        <nav class="nav">
            <div class="nav-left">
                <img src="assets/logo.png.ico">
            </div>
            <span class="nav-item">
                <a v-link="{ path: '/' }" class="button is-primary">
                    <span class="icon">
                    <i class="fa fa-home"></i>
                    </span>
                    <span>Principal</span>
                </a>
                <a v-link="{ path: '/ccliente' }" class="button is-primary">
                    <span class="icon">
                    <i class="fa fa-link"></i>
                    </span>
                    <span>Clientes</span>
                </a>
                <a v-link="{ path: '/cproduto' }" class="button is-primary">
                    <span class="icon">
                    <i class="fa fa-bolt"></i>
                    </span>
                    <span>Produtos</span>
                </a>
                <a v-link="{ path: '/cpedido' }" class="button is-primary">
                    <span class="icon">
                    <i class="fa fa-bolt"></i>
                    </span>
                    <span>Pedidos</span>
                </a>
            </span>
        </nav>
 
        <div class="container" style="margin: 20px;">
            <center>
                <router-view></router-view>
            </center>
        </div>

        <footer>
            @ 2017. <a href="http://rodrigoalves.hol.es" target="_blank" class="link">Rodrigo Alves</a>
        </footer>

        
            
    </div>
</template>
<script>
import store from './vuex/store'

export default {
  data () {
    return {
    }
  },
  store
}
</script>

<style>
    body {
        font-family: Helvetica, sans-serif;
    }
    h1 {
        font-size: 50px;
    }
    footer {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 1rem;
        background-color: lightseagreen;
        text-align: center;
        z-index: 5;
    }
</style>