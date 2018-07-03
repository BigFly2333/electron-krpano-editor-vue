<template>
  <div id="editor">
  </div>
</template>

<script>
  export default {
    name: 'krpano-editor',
    data () {
      return {
        krpano: ''
      }
    },
    methods: {
      onready () {
        // todo 生产环境
        // const { ipcRenderer } = require('electron')
        // let krpano = null

        const that = this

        embedpano({
          xml: 'panos/test/tour.xml',
          swf: 'panos/test/tour.swf',
          target: 'pano',
          html5: 'auto',
          mobilescale: 1.0,
          passQueryParameters: true,
          onready: krpanoOnreadyCallback
        })

        function krpanoOnreadyCallback (krpanoInterface) {
          that.krpano = krpanoInterface
          that.panoInit()
          // todo 生产环境
          // krpano = krpanoInterface
          // ipcRenderer.on('openXml', (event, path) => {
          //   console.log(path)
          //   krpano.call('loadpano(File://' + path + ', null, MERGE, BLEND(0.5));')
          //   that.panoInit()
          // })
        }
      },
      panoInit () {
        const krpano = this.krpano
        krpano.call('skin_hideskin("instant")')
      }
    },
    mounted () {
      this.onready()
    }
  }
</script>

<style>
  /* CSS */
</style>
