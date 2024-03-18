
let url = $request.url
let body = JSON.parse($response.body)

let multiple = 1000;
if (url.indexOf('bapi/composite/v1/private/bigdata/finance/futures/query-position-history') !== -1) {
    let data = body.data;
    if (data.positionHistoryItemList != null) {
        data.positionHistoryItemList.forEach(item => {
            item.closed_volume = item.closed_volume * multiple;
            item.closing_pnl = item.closing_pnl * multiple;
            item.max_open_interest = item.max_open_interest * multiple;
        })
    }

    $done({ body: JSON.stringify(body) })
}else if (url.indexOf('bapi/futures/v1/private/future/user-data/trade-history') !== -1) {
    body.data.forEach(item => {
            item.fee = 10000;
            item.qty = item.qty * multiple;
            item.totalQuota = item.totalQuota * multiple;
        })
    
    $done({ body: JSON.stringify(body) })
}else if (url.indexOf('bapi/futures/v1/private/future/user-data/transaction-history') !== -1) {
    let data = body.data;
    if (data != null) {
        data.forEach(item => {
            item.balanceDelta = item.balanceDelta * multiple;
            item.balanceDeltaStr = item.balanceDelta + "";
        })
    }
    $done({ body: JSON.stringify(body) })
}else if (url.indexOf('bapi/futures/v1/private/future/order/order-history') !== -1) {
    let data = body.data;
    if (data != null) {
        data.forEach(item => {
            item.delegateMoney = item.delegateMoney * multiple;
        })
    }
    $done({ body: JSON.stringify(body) })
}else{
    $done({})
}
