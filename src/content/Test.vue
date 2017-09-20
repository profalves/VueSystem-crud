<template>
    
  <h1>Teste Select</h1>
  <ol>
    <li v-for="tipo in tipos">
      <p>{{tipo.nome}}</p>
    </li>
  </ol>
    
    <br><br><br>
    
    <select v-model="selected">
      <option v-for="tipo in tipos">
        {{ tipo.nome }}
      </option>
    </select>
    <br><br>
    <span>Selecionado: {{ selected }}</span>
    
    <hr>
    

    <!-- CONTINUE ACIMA  antes da tag <hr>-->
</template>

<script>
import axios from 'axios'
const ENDPOINT = 'http://192.168.0.200/helpdesk/api/comp/obterCompTipo'

export default {
  data: () => ({
    selected: '',
    tipos: [],
    
  }),
  // Fetches posts when the component is created.
  created() {
    axios.get(ENDPOINT)
    .then(response => {
      // JSON responses are automatically parsed.
      this.tipos = response.data
      console.log()
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>