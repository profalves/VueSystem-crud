<template>
    <div id="app">
        <span class="nav-item">
            <a v-link="{ path: '/' }" class="button is-dark">
                <span class="icon">
                <i class="fa fa-home"></i>
                </span>
                <span>Início</span>
            </a>
            <a v-link="{ path: '/ccompromissos' }" class="button is-dark">
                <span class="icon">
                <i class="fa fa-user"></i>
                </span>
                <span>Agenda</span>
            </a>
            <a v-link="{ path: '/testes' }" class="button is-primary">
                <span class="icon">
                <i class="fa fa-bolt"></i>
                </span>
                <span>Test</span>
            </a>
            <a v-link="{ path: '/cpedido' }" class="button is-dark" disabled>
                <span class="icon">
                <i class="fa fa-barcode"></i>
                </span>
                <span>Content</span>
            </a>
        </span>
        
 
        <div class="container">
            <div style="margin: 10px;">
            <router-view></router-view>
            </div>
        </div>

        <footer>
            @ 2017. <a href="http://www.7virtual.com.br/" target="_blank" class="link">7Virtual</a>
        </footer>

        
            
    </div>
</template>
<script>
import store from './vuex/store'

export default {
  name:'VueSystem',
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
        background-color: lightslategray;
        text-align: center;
        z-index: 5;
        width: 100%;
        color: aliceblue;
    }
</style>