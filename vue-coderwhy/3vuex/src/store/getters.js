export default{
    // 好比组件里面的计算属性
    powerCounter(state){
        return state.counter * state.counter
    },
    more20stu(state){
        // 把大于20岁的筛选出来
        return state.students.filter(a => a.age >= 20);
    },
    more20stuLength(state,getters){// 这里的getters是vuex里面的getters   这里getters的名字可以自定义   
        return getters.more20stu.length;
    },
    // 输出不是固定的年龄的数据   getters传参
    moreAgestu(state){
        // 这里要传参  必须写函数
        return function(age){
            return state.students.filter(s => s.age >= age)
        }
    }
}