let url = $request.url
let body = JSON.parse($response.body)

//合约USDT余额
let balance = '720937.12';
//现货USDT数量
let uBalance = '452300.256896';
//现货BTC数量
let btcBalance = '13.52162012';
//现货ETH数量
let ethBalance = '100.5843';
//现货BNB数量
let bnbBalance = '300.125481';
//btc价格
let btcPrice = '67497';
//eth价格
let ethPrice = '3806.6';
//bnb价格
let bnbPrice = '408.9';
//合约btc数量
let btcNum = Number(balance)/Number(btcPrice);
let multiple = 100;
//现货btc数量
let spotBtcNum = (Number(uBalance) + Number(btcBalance)*Number(btcPrice) + Number(ethBalance)*Number(ethPrice) + Number(bnbBalance)*Number(bnbPrice))/Number(btcPrice);
if (url.indexOf('futures/v5/private/future/user-data/user-balance') !== -1) {
  let dataList = body.data;
  dataList.forEach((item)=>{
    if(item.asset === 'USDT'){
      //合约钱包最大可划转金额
      item.maxWithdrawAmount = item.maxWithdrawAmount * multiple;
      //合约钱包余额
      item.walletBalance = item.walletBalance * multiple;
      //逐仓合约钱包余额
      item.crossWalletBalance = item.crossWalletBalance * multiple;
      //钱包可用余额
      item.availableBalance = item.availableBalance * multiple;
      //保证金余额
      item.marginBalance = item.marginBalance * multiple;
    }
  })
  $done({ body: JSON.stringify(body) })

}else if(url.indexOf('asset/v2/private/asset-service/wallet/balance') !== -1){
  let dataList = body.data;
  dataList.forEach((item)=>{
    item.balance = item.balance * multiple;
  })
  $done({ body: JSON.stringify(body) })
}else if(url.indexOf('asset/v2/private/asset-service/wallet/asset?') !== -1){
  let dataList = body.data;
  dataList.forEach((item)=>{
    item.amount = item.amount * multiple;
  })
  $done({ body: JSON.stringify(body) })
}else if(url.indexOf('asset/v2/private/asset-service/wallet/asset-detail?') !== -1){
  let dataList = body.data;
  dataList.forEach((item)=>{
    if(item.asset === 'USDT') {
      let assetDetailsList = item.assetDetails;
      if (assetDetailsList) {
        console.log(assetDetailsList);
        assetDetailsList.forEach((assetItem) => {
          assetItem.amount = assetItem.amount * multiple;
        })
        console.log(assetDetailsList);
      }
    }
  })
  $done({ body: JSON.stringify(body) })
}else if(url.indexOf('asset/v3/private/asset-service/asset/get-user-asset') !==-1){
  let dataList = body.data;
  dataList.forEach((item)=>{
    item.free = item.free * multiple
  })
  $done({ body: JSON.stringify(body) })

}else {
  $done({})
}
