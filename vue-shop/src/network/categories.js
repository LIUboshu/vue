import { request } from "network/request.js"

export function getCategories(type,pagenum,pagesize){
    return request({
        url:"/categories",
        params:{
            type,   // 获取级别的分类
            pagenum,//当前页码值
            pagesize    // 每页显示多少条数据
        }
    })
}
// 添加分类
export function postClassify(cat_pid,cat_name,cat_level){
    return request({
        url:'/categories',
        method:'post',
        data:{
            cat_pid,
            cat_name,
            cat_level
        }
        
    })
}

//  根据 id 查询分类
export function getQueryClassify(id){
    return request({
        url:`/categories/${id}`
    })
}
// 编辑提交分类
export function putCategories(id,cat_name){
    return request({
        method:'put',
        url:`/categories/${id}`,
        data:{
            cat_name
        }
    })
}
//  删除分类
export function deleteCategories(id){
    return request({
        url:`categories/${id}`,
        method:"delete"
    })
}
