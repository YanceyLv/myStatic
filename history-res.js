let url = $request.url
let body = JSON.parse($response.body)
let headers = $request.headers

// 当天u本位合约盈利
let today_profit = 1000;

// 最近7天的u本位合约盈利数据，正序排列，时间小的在前面
let u_profit_list_7 = [
    1000,
    2000,
    3000,
    4000,
    5000,
    6000,
    7000
];

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
            let profitList = [];
            if (business === 'USDT_FUTURES') {
                 if (diff === 1) {
                    profitList = [today_profit];
                }
                if (diff === 7) {
                    profitList = u_profit_list_7;
                }
            }
            let userProfitRets = data.userProfitRets;
            if (profitList.length === 1) {
               userProfitRets[0].balance = userProfitRets[0].balance - userProfitRets[0].profit + today_profit;
               userProfitRets[0].profit = today_profit;
               data.totalProfit = data.averageProfit =  today_profit > 0 ? today_profit : 0;
               data.totalLoss = data.averageLoss = today_profit < 0 ? today_profit : 0;
               data.fairDays = 0;
               data.netProfit = today_profit;
               data.profitDays = today_profit > 0 ? 1 : 0;
               data.lossDays = today_profit > 0 ? 0 : 1;
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
