<template lang="pug">
div.d-flex.flex-row.align-center.px-2.bg-secondary(style="z-index:150;")
  router-link.mr-3(to="/admin/pages" target="_self" )
    v-btn(icon="mdi-arrow-left" variant="text" color="white")
  p.ma-0 {{pageTitle}}
  v-spacer
  v-btn( @click="toggleAddBtn" variant="outlined" size="small")
    .d-flex.flex-row.align-center(style="gap:4px")
      v-icon(v-if="showAdd" ) mdi-eye-outline
      v-icon(v-else) mdi-eye-off-outline
      p Add Button
    
  //- v-btn(icon="mdi-download" @click="downloadJSON" variant="plain" color="white")
  //- v-btn(icon="mdi-upload" @click="dialog=true" variant="plain" color="white")
  //- router-link(:to="`/pagebuilder/preview/${pageID}`" target="_blank" )
  //-   v-tooltip(bottom)
  //-     template( v-slot:activator="{ on, attrs }" )
  //-       v-btn(icon v-bind="attrs" v-on="on")
  //-         v-icon mdi-eye-outline
  //-     span Preview Layout
  //- router-link(to="/mypagebuilder/preview" target="_blank" )
  //-   v-tooltip(bottom)
  //-     template( v-slot:activator="{ on, attrs }" )
  //-       v-btn(icon  v-bind="attrs" v-on="on")
  //-         v-icon mdi-eye-outline
  //-     span Preview Layout
  v-dialog( v-model="dialog" max-width="500px" )
    v-card(  )
      v-card-title
        h5 Upload Layout File
      v-card-text()
        v-container(  )
          v-row
            v-col(cols="12")
              v-file-input(label="Choose Layout File" filled rounded hide-details="auto" accept="application/json" v-model="importedFile" )
      v-card-actions
        v-spacer
        v-btn( text @click="dialog=false") Close
        v-btn(text @click="readFile") Upload
</template>
<script setup>
import { useDisplay } from 'vuetify'

const { width } = useDisplay()
</script>
<script>
export default {
  name: 'MenuBar',
  props:{
    pageID:{
      type: String
    },
    pageTitle:{
      type: String
    }
  },
  data:()=>({
    dialog: false,
    importedFile: null,
    userComponents: null,
    showAdd: true
  }),
  mounted(){
    const userPages = JSON.parse(window.localStorage.getItem('userPages'))
    if (userPages){
      setTimeout(() => {
        userPages.forEach(item => {
        if (item.id === this.pageID) {
          // console.log(item);
          this.userComponents = item.components
        }
      });
      }, 1);
    }
  },
  methods:{
    downloadJSON(){
      const data =  JSON.stringify(this.userComponents)
      const blob = new Blob([data], {type: 'application/json'})
      const d = new Date()
      const date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
      const e = new MouseEvent('click',{
        bubbles: true,
        cancelable: false,
        view: window,
        detail: 1,
        screenX: 0, //The coordinates within the entire page
        screenY: 0,
        clientX: 0, //The coordinates within the viewport
        clientY: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
        button: 0, //0 = left, 1 = middle, 2 = right
        relatedTarget: null,
      }),
      a = document.createElement('a');
      a.download = this.pageID+"-"+date+".json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['application/json', a.download, a.href].join(':');
      // e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },
    readFile() {
      let reader = new FileReader();
      reader.onload = e => {
        this.$emit('import',e.target.result)
      };
      reader.readAsText(this.importedFile);
      this.importedFile = null
      this.dialog = false
    },
    toggleAddBtn() {
      this.showAdd = !this.showAdd
      this.$emit('toggleAdd', this.showAdd)
    }
  }
}
</script>
<style scoped>
a{
  text-decoration: none;
}
:deep(.v-text-field--filled > .v-input__control > .v-input__slot){
  background: #F7F7F7 !important;
  border: 1px solid #eaeaea !important;
  border-radius: 4px;
  max-height: 48px;
  min-height: 48px;
  padding-left: 16px;
  overflow: hidden;
}
:deep(.v-text-field.v-input--has-state > .v-input__control > .v-input__slot){
  border: 1px solid red !important;
}
:deep(.v-text-field--filled:not(.v-text-field--single-line) input){
  margin-top: 14px;
}
:deep(.v-text-field--filled .v-label){
  top: 14px !important;
  color: #C1C1C1;
}
:deep(.v-text-field--filled .v-label--active){
  transform: translateY(-10px) scale(0.75);
  color: #C1C1C1 ;
}
:deep(.theme--light.v-input input, .theme--light.v-input textarea){
  color: #2B2525 ;
  font-weight: 600 !important;
  font-size: 15px !important;
  line-height: 24px !important;
}
:deep(.v-input--has-state.error--text){
  color: red;
}
</style>
