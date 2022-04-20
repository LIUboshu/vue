import { request } from "network/request.js"

// 参数列表
export function getCategoriesAttributes(id,activeName){
    return request({
        url:`categories/${id}/attributes`,
        method:'get',
        params:{
            sel:activeName
        }
    })
}
// 添加动态参数或者静态属性
export function postCategoriesAttributes(id,attr_name,attr_sel){
    return request({
        method:'post',
        url:`categories/${id}/attributes`,
        data:{
            attr_name,
            attr_sel
        }
    })
}
// 根据 ID 查询参数
export function getCategoriesIdAttributes(id,attrId,attr_sel,attr_vals){
    return request({
        url:`/categories/${id}/attributes/${attrId}`,
        params:{
            attr_sel,
            attr_vals
        }
    })
}
// 编辑提交参数
export function putCategoriesIdAttributes(id,attrId,attr_name,attr_sel,attr_vals){
    return request({
        url:`categories/${id}/attributes/${attrId}`,
        method:"put",
        data:{
            attr_name,
            attr_sel,
            attr_vals
        }
    })
}
// 删除参数
export function deleteCategoriesIdAttributes(id,attrid){
    return request({
        method:"delete",
        url:` categories/${id}/attributes/${attrid}`
    })
}