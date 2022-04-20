export default{
    
	state:{
		name:'张三'
	},
	mutations:{
		updateNamex(state,payload){
			state.name = payload;
		}
	},
	getters:{
		fullname(state){
			return state.name + 1111
		},
		fullname2(state,getters){
			return getters.fullname + 2222
		},
		// 这里的第三个参数rootState,(根的状态)是为了 拿到对象里面的state里面的num
		fullname3(state,getters,rootState){
			return getters.fullname2 + rootState.num
		}
	},
	actions:{
		aUpdateName(context){
			// 在模块里面才有根的概念
			console.log(context);
			setTimeout(()=>{
				context.commit('updateNamex','wangwu')
			},1000)
		}
	}
}