import MainContent from './content/MainContent.vue'
//import ResourceContent from './content/ResourceContent.vue'
//import VuexContent from './content/VuexContent.vue'
import Compromissos from './content/Compromissos.vue'
import Detalhes from './content/Detalhes.vue'
import Testes from './content/Test.vue'



const RouterConfig = {
    '/': {
        component: MainContent
    },
    '/ccompromissos': {
        component: Compromissos
    },
    '/cdetalhe': {
        component: Detalhes
    },
    '/testes': {
        component: Testes
    }
}

export default RouterConfig;