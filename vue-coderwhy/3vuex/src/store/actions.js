export default{
    // 做异步操作
    // 编程把context翻译成:上下文
	  // 默认属性context
	  // 这里的异步操作,通过context.commit 提交一个 mutation,通过mutations修改state数据
	  
	  /*
	  aUpdateInfo(context,payload){
		  setTimeout(function(){
			  context.commit('updateInfox');
			  console.log(payload)
		  },1000)
	  }
	  */
	 
	 /*
	  aUpdateInfo(context,payload){
		  setTimeout(function(){
			  context.commit('updateInfox');
			  // 当commit就说明成功,不成功就报错了.成功之后回调
			  console.log(payload.msg);
			  payload.success();
		  },1000)
	  }
	  */
	 
	aUpdateInfo(context,payload){
        return new Promise((resolve,reject)=>{
            setTimeout(function(){
                context.commit('updateInfox');
                console.log(payload);
                resolve('11111');
            },1000)
        })	  
    }
}