
let url = $request.url
let body = JSON.parse($response.body)

if (url.indexOf('bapi/composite/v1/private/bigdata/finance/futures/query-position-history') !== -1) {
    let data = body.data;
    if (data.positionHistoryItemList != null) {
       data.positionHistoryItemList.forEach(item => {
           item.closed_volume = item.closed_volume * 1000;
           item.closing_pnl = item.closing_pnl * 1000;
           item.max_open_interest = item.max_open_interest * 1000;
       })
    }
    
    $done({ body: JSON.stringify(body) })
}else {
  $done({})
}
