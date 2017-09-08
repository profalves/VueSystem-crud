import MainContent from './content/MainContent.vue'
//import ResourceContent from './content/ResourceContent.vue'
//import VuexContent from './content/VuexContent.vue'
import Clientes from './content/Clientes.vue'
import Produtos from './content/Produtos.vue'
import Pedidos from './content/Pedidos.vue'


const RouterConfig = {
    '/': {
        component: MainContent
    },
    '/ccliente': {
        component: Clientes
    },
    '/cproduto': {
        component: Produtos
    },
    '/cpedido': {
        component: Pedidos
    }
}

export default RouterConfig;