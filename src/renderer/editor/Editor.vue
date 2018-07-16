<template>
  <div id="editor" class="editor-container">
    <div class="aside">
      <Slider />
    </div>
    <div class="footer">
      
    </div>
  </div>
</template>

<script>
  import Slider from './components/Slider'
  import '../../public/styles/base.scss'
  import '../../public/styles/my_element_ui.scss'

  export default {
    name: 'krpano-editor',
    data () {
      return {
        krpano: document.querySelector('#krpanoSWFObject')
      }
    },
    components: {
      Slider
    },
    methods: {
      onready () {
        // todo 生产环境
        // const { ipcRenderer } = require('electron')
        // let krpano = null

        const that = this

        this.$store.dispatch('krpanoInit', this.krpano)

        this.panoInit()
        this.editorInit()
      },
      panoInit () {
        const krpano = this.krpano
        // 隐藏下方自带控制条
        krpano.call('set(layer[skin_layer].visible, false);')
        // 添加onnewpano事件
        this.krpano.get('events').createItem('onnewpano')
        this.krpano.set('events[onnewpano].keep', true)
        this.krpano.set('events[onnewpano].onnewpano', 'js(sceneListener(get(scene[get(xml.scene)].name)))')
      },
      editorInit () {

      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss" scoped>
  .editor-container {
    .aside {
      position: absolute;
      top: 10vh;
      left: 20px;
      height: 70vh;
      min-height: 600px;
      width: 200px;
      background: rgba(36, 36, 36, 0.6);
      z-index: 999;
      border-radius: 5px;
    }
    .footer {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
      height: 50px;
      width: 60%;
      max-width: 1140px;
      background: rgba(36, 36, 36, 0.6);
      z-index: 999;
      border-radius: 5px 5px 0 0;
    }
  }
</style>
