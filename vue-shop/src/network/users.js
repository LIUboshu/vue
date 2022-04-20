import { request } from "network/request.js";
export function getUserList (pagenum,pagesize,query){
    return request({
        url:'/users',
		params:{
			pagenum,
			pagesize,
			query
		}
    })
}

// 监听用户修改状态
export function putUserState (uId,type){
    return request({
		method:'put',
        url:`users/${uId}/state/${type}`,
		params:{
			uId,
			type
		}
    })
}

// 发起添加用户的网络请求
export function postUser (username,password,email,mobile){
    return request({
		method:'post',
        url:'/users',
		data:{
			username,
			password,
			email,
			mobile
		}
    })
}

// 根据 ID 查询用户信息
export function showEditDialogData(id){
	return request({
		method:'get',
		url:`users/${id}`
	})
}
//编辑用户提交
export function editUserInfoData(id,email,mobile){
	return request({
		method:'put',
		url:`users/${id}`,
		data:{
			email,
			mobile
		}
	})
}
//删除单个用户
export function removeUserByIdData(id){
	return request({
		method:"delete",
		url:`users/${id}`
	})
}
/* //分配用户角色
export function putUserRole(id,rid){
	return request({
		method:"put",
		url:`/users/${id}/role`,
		data:{
			id,
			rid
		}
	})
} */