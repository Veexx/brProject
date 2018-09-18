<template>
           <!-- <div class="direction"> -->
  <highcharts   class="stock" :constructor-type="'stockChart'" :options="stockOptions" :updateArgs="[true,false]"></highcharts>
                    
           <!-- </div> -->
</template>

<script>

import {Chart} from 'highcharts-vue'
  export default {
    data() {
        return{
                stockOptions: {

                rangeSelector: {
                    buttonTheme : {
                        width:50,
                        padding:5,
                        r:4,
                        states : {
                            select : {
                                fill : "#39B690",
                                style: {
                                color: '#fff'
                            }
                                // "fill-width" : 300
                            },
                            // hover : {
                            //     stroke : "gray",
                            //     "stroke-width" : 35,
                            // }
                        },
                        style : {
                            color : "#171515",
                            "stroke-width" :1
                        }
                    },
                    buttons: [
                        {
                        type: 'day',
                        count: 1,
                        text: '1天'
                    }
                        ,{
                        type: 'day',
                        count: 7,
                        text: '7天'
                    }, {
                        type: 'month',
                        count: 1,
                        text: '1个月'
                    }, {
                        type: 'month',
                        count: 3,
                        text: '3个月'
                    },{
                        type: 'month',
                        count: 12,
                        text: '1年'
                    }, {
                        type: 'all',
                        text: '所有'
                    }]
                },
                title: {
                // text: 'AAPL Stock Price'
                },
                xAxis: {
                        dateTimeLabelFormats: {
                            millisecond: '%H:%M:%S.%L',
                            second: '%H:%M:%S',
                            minute: '%H:%M',
                            hour: '%H:%M',
                            day: '%m-%d',
                            week: '%m-%d',
                            month: '%y-%m',
                            year: '%Y'
                        }
                    },
                yAxis: [
                    
                    {
                         opposite: false,
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        height: '65%',
                        resize: {
                            enabled: true
                        },
                        lineWidth: 2
                    }, {
                        opposite: false,
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: '成交量'
                        },
                        top: '65%',
                        height: '35%',
                        offset: 0,
                        lineWidth: 2
                    }],
                series: [{
                        type: 'spline',
                        name: '流通市值',
                        color: 'green',
                        lineColor: 'green',
                        upColor: 'red',
                        upLineColor: 'red',
                        tooltip: {
                        },
                        data: [],
                        dataGrouping: {
                            units: [[
                        'day',                         // unit name
                        [1]                             // allowed multiples
                    ]]
                        },
                        id: 'sz'
                    },{
                        type: 'column',
                        name: '成交额',
                        data: [],
                        yAxis: 1,
                        dataGrouping: {
                            units: [[
                        'day',                         // unit name
                        [1]                             // allowed multiples
                    ]]
                        }
                    }]
            }
           }
    
    },
    props:['data'],
    methods: {
 
        },
    components: {
        highcharts: Chart 
        },

    mounted:function(){

    },
    beforeMount:function(){
        
        let that=this;

        var ohlc = [],
        volume = [],
        data1=that.data.market_cap_by_available_supply;
        var data4 = that.data.vol_usd;
        for (let i=0; i < data1.length; i ++) {
                    ohlc.push([
                        data1[i][0], // the date
                        data1[i][1] // open
                    ]);
                    volume.push([
                        data4[i][0], // the date
                        data4[i][1] // the volume
                    ]);
            }
        that.stockOptions.series[0].data=ohlc;  
        that.stockOptions.series[1].data=volume; 
        
       }, 
         
    }

</script>

<style>


</style>