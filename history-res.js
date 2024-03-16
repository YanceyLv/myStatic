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
            if (balanceList.length >= 7) {
                let profitNum = 0;
                let fairNum = 1;
                let totalProfit = 0;
                let totalLoss = 0;
                userProfitRets.forEach((item, index) => {
                    item.profit = profitList[index];
                    if (index > 0) {
                        //当日余额等于上日余额 + 当日盈利
                        item.balance = userProfitRets[index-1].balance + item
                        if (profitList[index] > 0) {
                            //记录盈利天数
                            profitNum = profitNum + 1;
                            //记录累计盈利金额
                            totalProfit = totalProfit + profitList[index];
                        } else if (profitList[index] === 0) {
                            //记录持平天数
                            fairNum = fairNum + 1;
                        } else {
                            //记录累计亏损金额
                            totalLoss = totalLoss + profitList[index];
                        }
                    }
                });

                //盈利天数
                data.profitDays = profitNum;
                //亏损天数
                data.lossDays = profitList.length - profitNum - fairNum;
                //持平天数
                data.fairDays = fairNum;
                //胜率
                data.winDaysRate = (profitNum * 100 / profitList.length).toFixed(2);
                //总盈利
                data.totalProfit = totalProfit;
                //总亏损
                data.totalLoss = totalLoss * -1;
                //净盈利/亏损
                data.netProfit = data.totalProfit - data.totalLoss;
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
