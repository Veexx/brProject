<template>
    <div class="activity-content">
        <p class="component-title fz16 c39">
            <span>最新活动</span>
            <i class="normal_dot"></i>
        </p>
        <img src="../../assets/ban.png" alt="">
    </div>
</template>
<script>
    
</script>
<style lang="scss">
  .activity-content{
      width: 320px;
      display: block;
      background: #fff;
      img{
          width: 320px;
          height: 220px;
          overflow: hidden;
          margin: 14px 0;
      }
      .component-title{
          
          position: relative;
          span{
             padding: 18px 0; 
             position: relative;              
          } 
          span:after{
            content: '';
            width: 100%;
            height: 2px;
            position: absolute;
            bottom: -2px;
            left: 0;
            background: #39B690;
            z-index: 1;
          }
          
      }
      .component-title :after{
          content: '';
          width: 100%;
          height: 2px;
          position: absolute;
          bottom: -20px;
          left: 0;
          background: #F89F56;
      }
  }
</style>

