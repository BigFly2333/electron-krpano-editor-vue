const state = {
  krpano: '',
  sceneList: [],
  activeSceneName: ''
}

const mutations = {
  SET_KRPANO (state, krpano) {
    if (krpano && typeof krpano === 'object') state.krpano = krpano
  },
  SET_SCENELIST (state, sceneList) {
    if (sceneList && typeof sceneList === 'object' && sceneList instanceof Array && sceneList.length) state.sceneList = sceneList
  },
  SET_ACTIVE_SCENE_NAME (state, activeSceneName) {
    state.activeSceneName = activeSceneName
  }
}

const actions = {
  setKrpano ({ commit }, krpano) {
    commit('SET_KRPANO', krpano)
  },
  setSceneList ({ commit }, sceneList) {
    commit('SET_SCENELIST', sceneList)
  },
  setActiveSceneName ({ commit }, activeSceneName) {
    commit('SET_ACTIVE_SCENE_NAME', activeSceneName)
  },
  krpanoInit ({ commit }, krpano) {
    const sceneList = krpano.get('scene').getArray()
    const activeSceneName = krpano.get('scene[get(xml.scene)]').name
    sceneList.forEach(scene => {
      scene.oldIndex = scene.index
    })
    commit('SET_KRPANO', krpano)
    commit('SET_SCENELIST', sceneList)
    commit('SET_ACTIVE_SCENE_NAME', activeSceneName)
  }
}

export default {
  state,
  mutations,
  actions
}
