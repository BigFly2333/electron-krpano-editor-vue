<template>
  <div class="scenes-container">
    <input type="text" id="sceneId" ref="scene_input" style="display: none" />
    <ul class="nav-scene-wrap">
      <el-scrollbar style="height: 100%;">
        <li class="scene-item" :class="{active: (activeSceneName === scene.name)}" v-for="scene in sceneList" :key="scene.index">
          <p class="scene-item-title">{{ scene.name }}</p>
          <img :src="scene.thumburl" alt=""  @click="changeScene(scene.name)">
        </li>
      </el-scrollbar>
    </ul>
    <div class="operations-wrap">
      <el-row>
        <el-button icon="el-icon-sort" type="primary" circle @click="sortDialog = true"></el-button>
      </el-row>
    </div>

    <el-dialog title="场景排序" :visible.sync="sortDialog" :modal-append-to-body="false" width="600px">
      <div class="clearfix">
        <draggable class="clearfix drag-wrap"  v-model="orderedSceneList" @move="checkMove" @end="endDrag" @start="startDrag" :options="dragOptions">
          <li class="drag-item" v-for="scene in orderedSceneList" :key="scene.index" :class="{'target': scene.index === targetElement, 'ok': !canDrag}">
            <img style="width: 100%" :src="scene.thumburl" alt="">
            <el-input type="text" v-model="scene.name" placeholder="请输入场景名称"></el-input>
          </li>
        </draggable>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sortCancel">取 消</el-button>
        <el-button type="primary" @click="sortSave">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapState, install } from 'vuex'

export default {
  data () {
    return {
      sortDialog: false,
      orderedSceneList: [],
      dragOptions: {
        group: {
          name: 'scene'
        },
        animation: 600
      },
      dragging: false,
      targetElement: null,
      canDrag: null,
      futureIndex: null
    }
  },
  components: {
    draggable
  },
  methods: {
    changeScene (name) {
      if (name === this.activeSceneName) return
      this.krpano.call('loadscene(' + name + ')')
    },
    // sort () {
    //   this.$set(this.sceneList[0], 'index', 1)
    //   this.$set(this.sceneList[1], 'index', 0)
    //   this.activeSceneIndex = this.sceneList[this.activeSceneIndex].index
    //   this.sceneList = (_.orderBy(this.sceneList, 'index')).concat([])
    // },
    privateCheckMove (e) {
      this.targetElement = e.relatedContext.targetElement
      return true
    },
    checkMove (e) {
      res = this.privateCheckMove(e)
      this.canDrag = res
      this.futureIndex = e.draggedContext.futureIndex
      return res
    },
    endDrag () {
      this.canDrag = null
      this.targetElement = null
      this.futureIndex = null
    },
    startDrag (e) {},
    sortCancel () {
      this.sortDialog = false
      this.resetOrderedSceneList()
    },
    sortSave () {
      this.sortDialog = false

      this.orderedSceneList.forEach((scene, index) => {
        scene.index = index
      })

      this.$store.dispatch('setSceneList', this.orderedSceneList.concat([]))

      this.krpano.get('scene').getArray().forEach((scene, index) => {
        let newName = ''
        const oldName = scene.name
        for (let i in this.orderedSceneList) {
          let scene2 = this.orderedSceneList[i]
          if (scene2.oldIndex === index) {
            newName = scene2.name
            break
          }
        }
        if (this.activeSceneName === oldName) this.$store.dispatch('setActiveSceneName', newName)
        this.krpano.get('scene').renameItem(oldName, newName)
      })
    },
    changeSceneName () {
      this.sceneList[0].name = 'hello word!'
    },
    resetOrderedSceneList () {
      this.orderedSceneList = []
      this.sceneList.forEach(scene => {
        this.orderedSceneList.push(Object.assign({}, scene))
      })
    }
  },
  computed: {
    ...mapState({
      krpano: state => state.Editor.krpano,
      sceneList: state => state.Editor.sceneList,
      activeSceneName: state => state.Editor.activeSceneName
    })
  },
  watch: {
    sceneList () {
      this.resetOrderedSceneList()
    }
  },
  mounted () {
    const that = this

    // 给监听scene变化的input元素初始化一个onchange事件，用来接收scene name，并传递给vue对象
    that.$refs.scene_input.addEventListener('onchange', function () {
      that.$store.dispatch('setActiveSceneName', this.value)
    })
  }
}
</script>

<style lang="scss" scoped>
  .scenes-container {
    .nav-scene-wrap {
      padding: 10px 0;
      height: 512px;
      overflow: hidden;
    }
    .scene-item {
      width: 100%;
      display: block;
      margin: 20px auto;
      &:first-child {
        margin-top: 0;
      }
      img {
        display: block;
        margin: auto;
        width: 120px;
        height: 120px;
        cursor: pointer;
      }
      &.active img {
        border: 3px solid rgb(245, 148, 3)
        // border: 3px solid rgb(255, 255, 255)
      }
      .scene-item-title {
        width: 120px;
        margin: auto;
        text-align: center;
        line-height: 24px;
        color: #fff;
        font-size: 14px;
        cursor: url("~public@/images/edit.svg");
      }
    }
    .operations-wrap {
      padding: 0 20px;
    }
    .drag-wrap {
      display: flex;
      flex-direction: row; 
      flex-wrap: wrap;
      justify-content: flex-start;
      .drag-item {
        margin: 10px 10px;
        float: left;
        width: 120px;
        cursor: move;
      }
    }

  }
</style>

