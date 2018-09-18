import axios from 'axios';

let  http = 'http://test.higgses.com:12340';
// let  http = '/api';

// let  testurl='/api';
// let  http = testurl;


//登录
export const requestLogin = params => { 
    return axios.post(''+http+'/index.php/api/token/blogin',{
        mobile:params.username,
        password:params.password,
    });
};


//获取验证码
export const getCode = params => {
    return axios.post(''+http+'/index.php/api/sms/captcha',{
        mobile:params
    });   
};

//注册
export const register = params => {
    return axios.post(''+http+'/index.php/api/sms/register',{
        mobile:params.mobile,
     password:params.password,
     verfication_code:params.verfication_code
    });   
};

//找回密码

export const retrieve = params => {
    return axios.post(''+http+'/index.php/api/sms/resetpassword',{
        mobile:params.mobile,
     password:params.password,
     verfication_code:params.verfication_code
    });   
};

//所有币种

export const getAllData = params=>{

     return axios.get(''+http+'/index.php/api/currency/getallcoinlist?page='+params.page+
     '&h24_turnover_start='+params.input24b+'&h24_turnover_end='+params.input24f+
     '&circulation_market_value_start='+params.inputvalueb+
     '&circulation_market_value_end='+params.inputvaluef+'&price_start='+params.inputpriceb+
     '&price_end='+params.inputpricef+'&exchange_count_start='+params.inputnumb+
     '&exchange_count_end='+params.inputnumf+'&coin_code='+params.code+'');
}
//自由选币
export const freeSelect = params=>{

    return axios.get(''+http+'/index.php/api/currency/freechoicecoin?page='+params.page+
    '&h24_turnover_start='+params.input24b+'&h24_turnover_end='+params.input24f+
    '&circulation_market_value_start='+params.inputvalueb+
    '&circulation_market_value_end='+params.inputvaluef+'&price_start='+params.inputpriceb+
    '&price_end='+params.inputpricef+'&exchange_count_start='+params.inputnumb+
    '&exchange_count_end='+params.inputnumf+'&coin_code='+params.code+'');
}


//月度牛币

export const monthCoin = params=>{

    return axios.get(''+http+'/index.php/api/currency/getcoinformouth?page='+params.page+
    '&circulation_market_value_start='+params.inputvalueb+
    '&circulation_market_value_end='+params.inputvaluef+'&day_avg_volume_start='+params.inputavgb+
    '&day_avg_volume_end='+params.inputavgf+'&day_min_volume_start='+params.inputminb+
    '&day_min_volume_end='+params.inputminf+'&date='+params.month+'&exchange_count_start='+params.inputnumb+'&exchange_count_end='+params.inputnumf+'');
}
//涨跌幅榜
export const riseandFall = params=>{

    return axios.get(''+http+'/index.php/api/currency/riseandfall?is_rise='+params+'');
}

//最新上市
export const newList = params=>{

    return axios.get(''+http+'/index.php/api/currency/getrecentlylisted');
}

//币种详情

export const coinDetaild = params=>{
    return axios.get(''+http+'/index.php/api/currency/coininfo?coin_id='+params+'')
}

//币种详情（交易平台）
export const exchangedetail = params=>{
    return axios.get(''+http+'/index.php/api/currency/coinexchangelist?coin_id='+params+'')
}


//币种详情（市场行情）
export const marketDetail = params=>{
    return axios.get(''+http+'/index.php/api/currency/coinmarketlist?coin_id='+params.id+'&page='+params.page+'')
}
//币种详情(市场行情右侧)
export const marketRight = params=>{
    return axios.get(''+http+'/index.php/api/currency/coinMarketListRight?coin_id='+params+'')
}

//自选
export const getSelection = params=>{
    return axios.get(''+http+'/index.php/api/UserFollow/getallcoinfollowme?page='+params.page+
    '&h24_turnover_start='+params.input24b+'&h24_turnover_end='+params.input24f+
    '&circulation_market_value_start='+params.inputvalueb+
    '&circulation_market_value_end='+params.inputvaluef+'&price_start='+params.inputpriceb+
    '&price_end='+params.inputpricef+'&exchange_count_start='+params.inputnumb+
    '&exchange_count_end='+params.inputnumf+'&coin_code='+params.code+'')
}

//添加自选
export const addcoin = params => {
    return axios.post(''+http+'/index.php/api/UserFollow/addfollowuser',{
        coin_id:params
    });   
};

//删除自选

export const removecoin = params => {
    return axios.post(''+http+'/index.php/api/UserFollow/delfollowuser',{
        user_follow_id:params
    });   
};

//排行榜
export const getRankList = params=>{
    return axios.get(''+http+'/index.php/api/currency/getcoinrankinglist?type='+params.type+'&is_rise='+params.is_rise+
    '&24h_turnover_start='+params.input24b+'&24h_turnover_end='+params.input24f+
    '&circulation_market_value_start='+params.inputvalueb+
    '&circulation_market_value_end='+params.inputvaluef+'&price_start='+params.inputpriceb+
    '&price_end='+params.inputpricef+'&exchange_count_start='+params.inputnumb+
    '&exchange_count_end='+params.inputnumf+'&coin_code='+params.code+'')
}


//新币上市
export const newUp = params=>{
    return axios.get(''+http+'/index.php/api/currency/getnewcoinlist')
}

//市值趋势(总体)
export const getValue = params=>{
    return axios.get(''+http+'/index.php/api/currency/getmarketvaluetrend1?type=2')
}

//市值趋势占比
export const getMarketTrend= params=>{
    return axios.get(''+http+'/index.php/api/currency/getmarketvaluetrend2?type='+params+'')
}


//搜索
export const searchinfo = params=>{
    return axios.get(''+http+'/index.php/api/currency/searchcoinexchange?search_name='+params.name+'&page_coin='+params.coinpage+'&page_exchange='+params.exchangepage+'')
}

//所有平台
export const getStation = params=>{
    return axios.get(''+http+'/index.php/api/exchange/getexchangelist?page='+params.page+'&country_id='+params.country+'&type_id='+params.type+'')
}

//推荐平台

export const recommendStation = params=>{
    return axios.get(''+http+'/index.php/api/exchange/getrecommendplateform')
}

//平台详情
export const stationDetail = params=>{
    return axios.get(''+http+'/index.php/api/exchange/getexchangeinfo?exchange_id='+params+'')
}

//获取币种详情k线数据
export const getKline = params=>{
    return axios.get(''+http+'/index.php/api/currency/coininfokline?coin_id='+params+'&type=1')
}



