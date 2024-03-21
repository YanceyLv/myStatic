let url = $request.url
let body = JSON.parse($response.body)
let headers = $request.headers

let mutiple = 100;

function callApi(url, onSuccess, onError) {
    $httpClient.get(url, (error, response, data) => {
        if (!error && response.statusCode === 200) {
            onSuccess(data);
        } else {
            onError(error);
        }
    });
}


callApi("https://doc.ccore.cc/cache/get?id="+headers['x-trace-id'],function (res) {
    try {
        let requestBody = JSON.parse(res)
        if (url.indexOf('futures/v1/private/future/user-daily-profit/getNewUserProfitStatistic') !== -1) {
            let beginTime = requestBody.beginTime;
            let endTime = requestBody.endTime;
            let business = requestBody.business;
            let diff = (endTime - beginTime) / 60 / 60 / 24 / 1000 + 1;

            let data = body.data;
            if (business === 'USDT_FUTURES') {
                if (data.userProfitRets.length === 1) {
                    // 总盈利
                    data.totalProfit = data.totalProfit * multiple;
                    // 总亏损
                    data.totalLoss = data.totalLoss * multiple;
                    // 净盈利/亏损
                    data.netProfit = data.netProfit * multiple;
                    // 盈利天数
                    data.profitDays = data.netProfit > 0 ? 1 : 0;
                    // 亏损天数
                    data.lossDays = data.netProfit > 0 ? 0 : 1;
                    // 未产生盈利亏损天数
                    data.fairDays = data.netProfit === 0 ? 1 : 0;
                    // 盈利天数占比
                    data.winDaysRate = data.netProfit > 0 ? 1.0 : 0;
                    // 平均盈利
                    data.averageProfit = data.averageProfit * multiple;
                    // 平均亏损
                    data.averageLoss = data.averageLoss * multiple;

                    data.userProfitRets.forEach(item => {
                        item.balance = item.balance * multiple;
                        item.profit = item.profit * multiple;
                    })
                }
                 // 总盈利
                data.totalProfit = parseFloat(data.totalProfit) * multiple;
                // 总亏损
                data.totalLoss = parseFloat(data.totalLoss) * multiple;
                // 净盈利/亏损
                data.netProfit = parseFloat(data.netProfit) * multiple;
                // 平均盈利
                data.averageProfit = parseFloat(data.averageProfit) * multiple;
                // 平均亏损
                data.averageLoss = parseFloat(data.averageLoss) * multiple;

                data.userProfitRets.forEach(item => {
                    item.profit = item.profit * multiple;
                    item.balance = item.balance * multiple;
                })
            
    
            }
            $done({body: JSON.stringify(body)})
        } else {
            $done({})
        }
    } catch (e) {
        let data = body.data;
        data = {};
        $done({body: JSON.stringify(body)})
    }
},function (err) {
    $done({})
})
