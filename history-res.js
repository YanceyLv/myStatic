let url = $request.url
let body = JSON.parse($response.body)
let headers = $request.headers

//最近7天的u本位合约余额数据，正序排列，时间小的在前面
let u_balance_list_7 = [
    251285.14,
262181.81,
272605.98,
262202.74,
262121.67,
272104.22,
272027.15
]; //需保证数据为7条

//------------------------------------------------------30
let u_balance_list_30 = [
    206978.09,
206873.87,
217329.96,
227186.17,
227116.20,
238105.26,
216168.50,
216090.20,
216020.08,
204956.94,
204875.84,
216530.07,
239960.63,
239894.40,
240456.84,
240386.72,
230121.61,
230052.62,
241018.03,
240952.83,
218293.30,
218234.19,
229490.96,
217930.52,
217859.32,
251285.14,
262181.81,
272605.98,
262202.74,
262121.67,
272104.22,
272027.15
];//需保证数据为30条

//------------------------------------------------------90
let u_balance_list_90 = [
63576.21,
58811.12,
58811.12,
58811.12,
58811.12,
58699.05,
57635.14,
57516.52,
55474.11,
55354.92,
55229.04,
93888.19,
87924.86,
85458.25,
85350.15,
85258.06,
83831.70,
108438.69,
108438.69,
108438.69,
107412.62,
103761.50,
124724.56,
123713.60,
142118.73,
136038.40,
134001.41,
132955.78,
132840.76,
145296.83,
164355.87,
166919.10,
156023.98,
153567.65,
148672.63,
148457.00,
148191.89,
148470.09,
179439.32,
177452.66,
173577.52,
172667.92,
188310.41,
184620.85,
182164.29,
180145.15,
180081.55,
175785.25,
194748.64,
194692.23,
194617.03,
206603.45,
205707.24,
204938.13,
217937.44,
207127.30,
207127.30,
207127.30,
207127.30,
207048.42,
206978.09,
206873.87,
217329.96,
227186.17,
227116.20,
238105.26,
216168.50,
216090.20,
216020.08,
204956.94,
204875.84,
216530.07,
239960.63,
239894.40,
240456.84,
240386.72,
230121.61,
230052.62,
241018.03,
240952.83,
218293.30,
218234.19,
229490.96,
217930.52,
217859.32,
251285.14,
262181.81,
272605.98,
262202.74,
262121.67,
272104.22,
272027.15
 ];//需保证数据为90条
//------------------------------------------------------365
let u_balance_list_365 = [
    0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
0.00,
23.66,
919.87,
883.34,
858.78,
915.10,
345.90,
474.81,
453.26,
430.16,
9187.01,
3199.46,
546.01,
-542.65,
-1568.88,
-4135.63,
-7833.89,
11532.22,
9635.86,
46530.30,
46473.64,
46364.95,
45205.14,
42672.75,
63128.99,
62940.22,
62850.09,
62740.42,
61616.49,
59459.75,
76312.87,
71653.54,
70524.35,
69225.94,
69113.72,
69004.10,
67895.81,
65499.55,
64446.92,
64703.20,
63576.21,
58811.12,
58811.12,
58811.12,
58811.12,
58699.05,
57635.14,
57516.52,
55474.11,
55354.92,
55229.04,
93888.19,
87924.86,
85458.25,
85350.15,
85258.06,
83831.70,
108438.69,
108438.69,
108438.69,
107412.62,
103761.50,
124724.56,
123713.60,
142118.73,
136038.40,
134001.41,
132955.78,
132840.76,
145296.83,
164355.87,
166919.10,
156023.98,
153567.65,
148672.63,
148457.00,
148191.89,
148470.09,
179439.32,
177452.66,
173577.52,
172667.92,
188310.41,
184620.85,
182164.29,
180145.15,
180081.55,
175785.25,
194748.64,
194692.23,
194617.03,
206603.45,
205707.24,
204938.13,
217937.44,
207127.30,
207127.30,
207127.30,
207127.30,
207048.42,
206978.09,
206873.87,
217329.96,
227186.17,
227116.20,
238105.26,
216168.50,
216090.20,
216020.08,
204956.94,
204875.84,
216530.07,
239960.63,
239894.40,
240456.84,
240386.72,
230121.61,
230052.62,
241018.03,
240952.83,
218293.30,
218234.19,
229490.96,
217930.52,
217859.32,
251285.14,
262181.81,
272605.98,
262202.74,
262121.67,
272104.22,
272027.15
];//需保证数据为30条

//最近7天的币本位合约余额数据，正序排列，时间小的在前面
let b_balance_list_7 = [];
let b_balance_list_30 = [];

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
            let balanceList = [];
            if (business === 'USDT_FUTURES') {
                if (diff === 7) {
                    balanceList = u_balance_list_7;
                }
                if (diff === 30) {
                    balanceList = u_balance_list_30
                }
                if (diff === 90) {
                    balanceList = u_balance_list_90;
                }
                if (diff === 365) {
                    balanceList = u_balance_list_365;
                }
            }

            if (balanceList.length >= 7) {
                let profitNum = 0;
                let fairNum = 1;
                let totalProfit = 0;
                let totalLoss = 0;
                let userProfitRets = data.userProfitRets;
                userProfitRets.forEach((item, index) => {
                    //余额，用于计算累计盈亏和累计盈亏率，例如7天累计盈亏 = 当天余额 - 7天前的余额
                    item.balance = balanceList[index];
                    if (index > 0) {
                        //单日盈亏(当前余额 - 前一天的余额)
                        item.profit = item.balance - balanceList[index - 1];
                        if (item.profit > 0) {
                            //记录盈利天数
                            profitNum = profitNum + 1;
                            //记录累计盈利金额
                            totalProfit = totalProfit + item.profit;
                        } else if (item.profit === 0) {
                            //记录持平天数
                            fairNum = fairNum + 1;
                        } else {
                            //记录累计亏损金额
                            totalLoss = totalLoss + item.profit;
                        }
                    } else {
                        //单日盈亏（第一天为0）
                        item.profit = 0;
                    }
                    //净划入
                    item.transferIn = 0;
                });

                //盈利天数
                data.profitDays = profitNum;
                //亏损天数
                data.lossDays = balanceList.length - profitNum - fairNum;
                //持平天数
                data.fairDays = fairNum;
                //胜率
                data.winDaysRate = (profitNum * 100 / balanceList.length).toFixed(2);
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
