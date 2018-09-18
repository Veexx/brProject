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
                        title: {
                            text: '市值占比(%)'
                        },
                        height: '100%',
                        resize: {
                            enabled: true
                        },
                        lineWidth: 2
                    }],
                series: [{
                        type: 'line',
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

        var valueall = [];
        let colorarry=['rgba(247, 147, 26,.1)','rgba(69, 74, 117,.1)','rgba(67, 141, 44,.1)','rgba(131, 131, 131,.1)',
        'rgba(11, 162, 219,.1)','rgba(0, 116, 182,.1)','rgba(250, 190, 0,.1)','rgba(255, 102, 0,.1)','rgba(0,0,0,.1)',
        'rgba(168, 216, 16,.1)'  
        ];
        let linecolorarry=['rgb(247, 147, 26)','rgb(69, 74, 117)','rgb(67, 141, 44)','rgb(131, 131, 131)',
        'rgb(11, 162, 219)','rgb(0, 116, 182)','rgb(250, 190, 0)','rgb(255, 102, 0)','rgb(0,0,0)',
        'rgb(168, 216, 16)'];
        for(let i=0;i<that.data.length;i++){
            let itemlength=that.data[i].timestamp.length;
            let itemvalue=[];
            for(let a=0;a<itemlength;a++){
                 let dataobj=[that.data[i].timestamp[a],Number(Number(that.data[i].ratio[a]*100).toFixed(2))]
                 itemvalue.push(dataobj);
            }
            let seriesobj={
                        type: 'area',
                        name: that.data[i].coin_name_en,
                        color: colorarry[i],
                        lineColor: linecolorarry[i],
                        upColor: 'red',
                        upLineColor: 'red',
                        tooltip: {
                        },
                        data: itemvalue,
                        dataGrouping: {
                            units: [[
                        'day',                         // unit name
                        [1]                             // allowed multiples
                    ]]
                        },
                        id: 'sz'
            }
            valueall.push(seriesobj);
        }
        console.log(valueall);
        // data1=that.data.market_cap_by_available_supply;
        // var data4 = that.data.vol_usd;
        // for (let i=0; i < data1.length; i ++) {
        //             ohlc.push([
        //                 data1[i][0], // the date
        //                 data1[i][1] // open
        //             ]);
        //             volume.push([
        //                 data4[i][0], // the date
        //                 data4[i][1] // the volume
        //             ]);
        //     }
        that.stockOptions.series=valueall;  
        // that.stockOptions.series[1].data=volume; 

        // console.log(ohlc)
        // console.log(volume)
        
       }, 
         
    }

</script>

<style>


</style>