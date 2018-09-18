// import Login from './views/Login.vue'

import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import DataDetail from './views/Detail.vue'
import StationDetail from './views/stationdetail.vue'
import About from './views/about.vue'
import Disclaimer from './views/disclaimer.vue'
import Search from './views/search.vue'

import Typedata from './views/nav/Typedata.vue'
import Class from './views/nav/Class.vue'
import History from './views/nav/History.vue'
import News from './views/nav/News.vue'
import Presentation from './views/nav/Presentation.vue'
import Selection from './views/nav/Selection.vue'
import Social from './views/nav/Social.vue'
import Trading from './views/nav/Trading.vue'


import Alldata from './views/nav/childnav1/alldata.vue'
import Newup from './views/nav/childnav1/newup.vue'
import Ranklist from './views/nav/childnav1/ranklist.vue'
import Value from './views/nav/childnav1/value.vue'
import Selfse from './views/nav/childnav1/selfselection.vue'

import allPlatform from './views/nav/childnav2/allplatform.vue'
import Recommend from './views/nav/childnav2/recommend.vue'

import Free from './views/nav/childnav3/free.vue'
import Intelligence from './views/nav/childnav3/intelligence.vue'
import Technology from './views/nav/childnav3/technology.vue'

import Monthdata from './views/nav/childnav4/monthdata.vue'







let routes = [
    {
        path:'/',
        redirect:'/typedata/alldata',
        hidden: true
    },
    
    {
        path: '/',
        component: Home,
        children: [
            { 
                path: '/typedata', 
                redirect:'/typedata/alldata',
                component: Typedata, 
                name: '币种数据',
                children: [
                    {
                        path: '/typedata/alldata', 
                        component: Alldata, 
                        name: '全部币种',                        
                    },
                    {
                        path: '/typedata/selfselection', 
                        component: Selfse, 
                        name: '自选',                        
                    },
                    {
                        path: '/typedata/ranklist', 
                        component: Ranklist, 
                        name: '排行榜',                        
                    },
                    {
                        path: '/typedata/newup', 
                        component: Newup, 
                        name: '新币上市',                        
                    },
                    {
                        path: '/typedata/value', 
                        component: Value, 
                        name: '市值趋势',                        
                    }
 
                ]
            }
        ]
    },
    {
        path: '/',
        component: Home,
        children: [
            { 
                path: '/trading', 
                redirect:'/trading/platform',
                component: Trading, 
                name: '交易平台',
                children: [
                    {
                        path: '/trading/platform', 
                        component: allPlatform, 
                        name: '所有平台',                        
                    },
                    {
                        path: '/trading/recommend', 
                        component: Recommend, 
                        name: '推荐平台',                        
                    }
 
                ]
            }
        ]
    },
    {
        path: '/',
        component: Home,
        children: [
            { 
                path: '/selection', 
                redirect:'/selection/free',
                component: Selection, 
                name: '选币',
                children: [
                    {
                        path: '/selection/free', 
                        component: Free, 
                        name: '自由选币',  

                    },
                    {
                        path: '/selection/intelligence', 
                        component: Intelligence, 
                        name: '智能选币',  
                disable:true,

                    },
                    {
                        path: '/selection/technology', 
                        component: Technology, 
                        name: '技术选币',  
                disable:true,

                    }
 
                ]
            }
        ]
    },
    {
        path: '/',
        component: Home,
        children: [
            { 
                path: '/history', 
                redirect:'/history/monthdata',
                component: History, 
                name: '历史牛币',
                children: [
                    {
                        path: '/history/monthdata', 
                        component: Monthdata, 
                        name: '月度牛币',                        
                    }
 
                ]
            }
        ]
    },
    {
        path: '/',
        component: Home,
        children: [
            { 
                path: '/social', 
                component: Social, 
                name: '币圈社群',
                disable:true,

                // children: [
                //     {
                //         path: '/social/alldata', 
                //         component: Alldata, 
                //         name: '全部币种',                        
                //     }
 
                // ]
            }
        ]
    },
    {
        path: '/',
        component: Home,
        children: [
            { 
                path: '/class', 
                component: Class, 
                name: '公开课',
                disable:true,
                // children: [
                //     {
                //         path: '/class/alldata', 
                //         component: Alldata, 
                //         name: '全部币种',                        
                //     }
 
                // ]
            }
        ]
    },
    {
        path: '/',
        component: Home,
        children: [
            { 
                path: '/news', 
                component: News, 
                name: '新闻',
                disable:true,
                // children: [
                //     {
                //         path: '/news/alldata', 
                //         component: Alldata, 
                //         name: '全部币种',                        
                //     }
 
                // ]
            }
        ]
    },
    {
        path: '/',
        component: Home,
        children: [
            { 
                path: '/presentation', 
                component: Presentation, 
                name: '行业报告',
                disable:true,
                // children: [
                //     {
                //         path: '/presentation/alldata', 
                //         component: Alldata, 
                //         name: '全部币种',                        
                //     }
 
                // ]
            }
        ]
    },
    
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path:'/datadetail/:coin_id',
        hidden: true,
        component:DataDetail
    },
    {
        path:'/stationdetail/:stationid',
        hidden: true,
        component:StationDetail
    },
    {
        path:'/about',
        hidden: true,
        component:About
    },
    {   name:'Search',
        path:'/search',
        hidden: true,
        component:Search
    },
    
    {
        path:'/disclaimer',
        hidden: true,
        component:Disclaimer
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;