let url = $request.url
let body = JSON.parse($response.body)
let headers = $request.headers

let today_data = {
    "userProfitRets": [
        {
            "balance": 1800,
            "profit": 500
        }
    ]
}
// 最近7天的u本位合约盈利以及余额数据，正序排列，时间小的在前面
let data_list_7 = {
    "userProfitRets" : [
        {
            "balance": 4060,
            "profit": 1000
        },
        {
            "balance": 3060,
            "profit": -230
        },
        {
            "balance": 3290,
            "profit": 10
        },
        {
            "balance": 3280,
            "profit": 500
        },
        {
            "balance": 2780,
            "profit": 1000
        },
        {
            "balance": 1780,
            "profit": -20
        },
        {
            "balance": 1800,
            "profit": 500
        }
    ]
}

let data_list_30 = {
    "userProfitRets" : [
        {
            "balance": 4060,
            "profit": 1000
        },
        {
            "balance": 3060,
            "profit": -230
        },
        {
            "balance": 3290,
            "profit": 10
        },
        {
            "balance": 3280,
            "profit": 500
        },
        {
            "balance": 2780,
            "profit": 1000
        },
        {
            "balance": 1780,
            "profit": -20
        },
        {
            "balance": 1800,
            "profit": 500
        },
        {
            "balance": 1700,
            "profit": 10
        },
        {
            "balance": 1600,
            "profit": 10
        },
        {
            "balance": 1500,
            "profit": 10
        },
        {
            "balance": 1400,
            "profit": 10
        },
        {
            "balance": 1300,
            "profit": 10
        },
        {
            "balance": 1200,
            "profit": 10
        },
        {
            "balance": 1100,
            "profit": 10
        },
        {
            "balance": 1000,
            "profit": 10
        },
        {
            "balance": 900,
            "profit": 10
        },
        {
            "balance": 3290,
            "profit": 10
        },
        {
            "balance": 3280,
            "profit": 500
        },
        {
            "balance": 2780,
            "profit": 1000
        },
        {
            "balance": 1780,
            "profit": -20
        },
        {
            "balance": 1800,
            "profit": 500
        },
        {
            "balance": 4060,
            "profit": 1000
        },
        {
            "balance": 3060,
            "profit": -230
        },
        {
            "balance": 3290,
            "profit": 10
        },
        {
            "balance": 3280,
            "profit": 500
        },
        {
            "balance": 2780,
            "profit": 1000
        },
        {
            "balance": 1780,
            "profit": -20
        },
        {
            "balance": 1800,
            "profit": 500
        },
        {
            "balance": 4060,
            "profit": 1000
        },
        {
            "balance": 1800,
            "profit": 500
        }

    ]
}

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
                    data.totalProfit = 500
                    // 总亏损
                    data.totalLoss = 0
                    // 净盈利/亏损
                    data.netProfit = 500
                    // 盈利天数
                    data.profitDays = 1
                    // 亏损天数
                    data.lossDays = 0
                    // 未产生盈利亏损天数
                    data.fairDays = 0
                    // 盈利天数占比
                    data.winDaysRate = 1.0
                    // 平均盈利
                    data.averageProfit = 10
                    // 平均亏损
                    data.averageLoss = 0
        
                    data.userProfitRets = [
                        {
                            "userId": 526310661,
                            "day": 1710547200000,
                            "balance": 1600,
                            "netInflow": 0.00000000,
                            "profit": 500,
                            "debt": null,
                            "transferIn": 0.00000000
                        }
                    ]
                }
                let mock_data = null;
                if (diff === 7) {
                    mock_data = data_list_7;
                }
                if (diff === 30) {
                    mock_data = data_list_30;
                }
                if (mock_data != null) {
                    let profitNum = 0;
                    let fairNum = 0;
                    let totalProfit = 0;
                    let totalLoss = 0;
                    data.userProfitRets.forEach((item, index) => {
                        item.profit = mock_data.userProfitRets[index].profit
                        item.balance = mock_data.userProfitRets[index].balance
                        if(item.profit > 0) {
                            totalProfit += item.profit
                            profitNum++;
                        }else if(item.profit === 0) {
                            fairNum++;
                        }else {
                            totalLoss += item.profit
                        }
                    })
                    data.profitDays = profitNum;
                    //亏损天数
                    data.lossDays = data.userProfitRets.length - profitNum - fairNum;
                    //持平天数
                    data.fairDays = fairNum;
                    //胜率
                    data.winDaysRate = (profitNum * 100 / data.userProfitRets.length).toFixed(2);
                    //总盈利
                    data.totalProfit = totalProfit;
                    //总亏损
                    data.totalLoss = totalLoss * -1;
                    //净盈利/亏损
                    data.netProfit = data.totalProfit - data.totalLoss;
                }
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
