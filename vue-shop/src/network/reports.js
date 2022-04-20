import { request } from "network/request.js"

//基于时间统计的折线图
export function getReports(){
    return request({
        url:`reports/type/1`
    })
}