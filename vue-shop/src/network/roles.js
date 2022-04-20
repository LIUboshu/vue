import { request } from "network/request.js"

export function getRolesListData(){
    return request({
        url:'/roles'
    })
}

// 添加角色
export function postRoles(roleName,roleDesc){
    return request({
        url:"/roles",
        method:'post',
        data:{
            roleName,
            roleDesc
        }
    })
}
// 根据 ID 查询角色
export function getRolesId(id){
    return request({
        url:`/roles/${id}`
    })
}
// 编辑提交角色
export function putEditRoles(id,roleName,roleDesc){
    return request({
        method:"put",
        url:`/roles/${id}`,
        data:{
            roleName,
            roleDesc
        }
    })
}
// 删除角色
export function deleteRoles (id){
    return request({
        method:"delete",
        url:`/roles/${id}`
    })
}
// 删除角色指定权限(角色id,权限id)
export function delRolesJurisdiction(roleId,rightId){
    return request({
        method:"delete",
        url:`roles/${roleId}/rights/${rightId}`
    })
}

//所有权限列表  树形结构tree
export function getRightsTree(){
    return request({
        url:'rights/tree'
    })
}

// 角色授权
export function postRolesAuthorize(roleId,rids){
    return request({
        method:"post",
        url:`roles/${roleId}/rights`,
        data:{
            roleId,
            rids
        }
    })
}