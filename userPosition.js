let url = $request.url
let body = JSON.parse($response.body)

if (url.indexOf('bapi/futures/v5/private/future/user-data/user-position') !== -1) {
    let dataList = body.data;
    dataList.forEach((item)=>{
        item.positionAmount = item.positionAmount * 100;
    })
    $done({ body: JSON.stringify(body) })
}else {
    $done({})
}

//预估保证金*5倍杠杆/开仓价=持仓数量
//当平仓后，合约盈亏分析中的详情才统计，统计时间为平仓当天，不是开仓时间。
