<template>
   <div class="normal-item">
       <div class="item-head">
           <div class="item-head-content">
               <ul class="item-nav-ul">
                       <li class="nav_item_child" v-for="(item,index) in $router.options.routes[4].children[0].children"  :key="index">                          
                           <router-link :to='item.path' >
                               {{item.name}}
                            </router-link> 
                       </li>
                </ul> 
                
                <div class="search-content">
                      <i class="search_dot"></i>
                      <el-input v-model="input" placeholder="比特币、以太坊"></el-input>
                </div>
           </div>
         
       </div>

              <router-view></router-view>
       
   </div>
    
</template>
<script>
    export default {
        data(){
            return{
               input:''
            }
        },
        mounted:function(){
            console.log(this.$router.options.routes[3].children[0].children);
        }
    }
</script>
<style lang="scss">

.item-head{
    width: 100%;
    height: 63px;
    background: #F8FAFF;
    position: fixed;
    top:105px;
    left: 0;
    z-index: 3;
      box-shadow:2px 0px 4px rgba(23,102,193,0.2);    
    .item-head-content{
         width: 1200px;
         margin: 0 auto;
         display: flex;
    justify-content:space-between;


    .item-nav-ul{
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        .nav_item_child{
                float: left;
                font-size: 14px;
                color: #4F4F4F;
                height: 20px;
                line-height: 20px;
                position: relative;
                font-weight: 500;
                margin: 24px 0;
                padding: 0 20px;
                // border-right:1px solid #4F4F4F; 
                a{
                color: #4F4F4F;

                }
                .router-link-active{
                    color: #39B690;
                }
                .monneyview{
                    padding: 0 10px;
                    // width: 150px;
                    height: 30px;
                    line-height: 30px;
                    border: none;
                    background: #39B690;
                    color: #fff;
                    border-radius:2px;
                    vertical-align: middle; 
                        margin-top: -4px;
                        font-size: 13px;

                    span{
                        display: inline;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: space-between;
                        i{
                            vertical-align: middle;
                            line-height: 30px;
                        }
                    }
                }
                // border-right: 1px solid #999;
            }
            .nav_item_child::after{
                content: '';
                width: 1px;
                height: 12px;
                background: #4F4F4F;
                position: absolute;
                right: 0;
                top:5px;
            }
            .nav_item_child:first-child{
                 padding-left:0 ;
            }
            .nav_item_child:last-child::after{
                display: none;
            }
    }

    .search-content{
        margin: 13px 0;
        width:290px;
        height:35px;
        background:rgba(255,255,255,1);
        position: relative;
        // border: 1px solid #e9e9e9;
        i{
            width: 17px;
            height: 17px;
            background: url('../../assets/search.png') no-repeat;
            background-size:cover;
            position: absolute; 
            right: 14px;
            top:10px;
            z-index: 1;
        }
    }
    }
}

</style>

