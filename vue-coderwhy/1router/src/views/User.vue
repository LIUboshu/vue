<template>
  <div>
      <h2>我是用户页面</h2>
      <p>我是用户内容,嘿嘿嘿</p>
      <p>用户名称:{{userID}}</p>
      <p>将url后面user参数拿到(和上面用户名称方法一样):{{$route.params.userid}}</p>

      <button @click="btnclick">按钮</button>
  </div>
</template>

<script>

/* 
    传递参数的方式
        传递参数的方式有两种类型:params和query
        params的类型
            配置路由格式: /router/:id
            传递的方式:在path后面跟上对应的值
            传递后形成的路径:/router/123     /router/abc    /router/id
        query的类型
            配置路由格式:/router,也就是普通配置
            传递的方式:对象中使用query的key作为传递方式
            传递后形成的路径:/router?id=123   /router?id=abc


*/
export default {
    name:"User",
    created () {
        console.log('user create 创建');
    },
    destroyed () {
        console.log('user destroyed 销毁');
    },
    computed: {
        userID(){
            // 这里的$route(不带r)  当前是谁处于活跃状态拿到的就是谁
            return this.$route.params.userid
        }
    },
    methods: {
        btnclick(){
            // 所有的组件都继承自vue的原型
            console.log(this.$router);// new VueRouter()
            console.log(this.$route);//路由本身  当前路由处于活跃
        }
    },
    ///////组件内的守卫
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建

        next();
    },
    beforeRouteUpdate(to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`

        next();
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        next();
    }
}
</script>

<style>

</style>