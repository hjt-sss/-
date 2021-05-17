const state = {
  name : localStorage.getItem('name') || '',
  isAdmin: localStorage.getItem('isAdmin') || false,
  userHeader: ''
};

const actions = {

};

const mutations = {
  USER_NAME(state , payload){
    state.name = payload.name;
    state.isAdmin = payload.isAdmin;
    state.userHeader = payload.userHeader
  }
};

export default {
  namespaced : true,
  state,
  actions,
  mutations
}