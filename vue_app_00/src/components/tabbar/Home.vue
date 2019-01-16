<template>
    <div class="app-home" style="background-color:#fff;">
    <!--1.顶部导航栏-->
       
    <!--2.轮播图-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in list" :key="item.id">
                <img :src="item.img_url">
            </mt-swipe-item>
        </mt-swipe>
    <!--3.两张图片-->
        <div>
            <ul class="my_Home_img" >
                <li v-for="item in list1" :key="item.id"><img :src="item.img_url"></li>
            </ul>
        </div>
<!--滑动块-->
    <!--4.鲜花订阅-->
        <div class="my_p">
            <p class="my_font1">鲜花订阅</p>
            <p>全部></p>
        </div>
        <div class="my_p1">
            <p>| Nature 自然系列</p>
            <p>每周一花的小幸福，新用户送花瓶</p>
        </div>
        <div class="mui-card">
				<div class="mui-card-header mui-card-media" style="height:50vw;width:100%;">
                   <a href=""><img  style="width:100%; height:100%;" src="../../assets/1532507668368031.jpeg"></a>
                </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p style="">Posted on January 18, 2016</p>
						<p style="color: #333;margin:0;">简单易打理，新手收花必备</p>
					</div>
				</div>
		</div>
        
    <!--5.4个商品-->
        <div>
            <ul class="my_goodslist" >
                <li v-for="item in list2" :key="item.id">
                    <router-link :to="`/GoodsInfo?id=`+item.id"><img :src="item.img_url"></router-link>
                    <div>
                        <span>{{item.title}}</span>
                        <p>{{item.subtitle}}</p>
                        <p style="font-size:15px;color:red;padding:4px 0;">{{item.price}}/4支</p>
                    </div>
                </li>
                <!--li>
                    <router-link to="/GoodsInfo"><img src="../../assets/1497878047307953.png"></router-link>
                    <div>
                        <span>Nature自然系列 | Pro系列</span>
                        <p>品质升级，花量翻倍</p>
                        <p style="font-size:15px;color:red;padding:4px 0;">169/4支</p>
                    </div>
                </li-->
            </ul>
            <ul class="my_goodslist">
                <li v-for="item in list2" :key="item.id">
                     <router-link :to="`/GoodsInfo?id=`+item.id"><img :src="item.img_url"></router-link>
                    <div>
                        <span>{{item.title}}</span>
                        <p>{{item.subtitle}}</p>
                        <p style="font-size:15px;color:red;padding:4px 0;">{{item.price}}/4支</p>
                    </div>
                </li>
                
            </ul>
        </div>
     <!--4.鲜花订阅-->
        <div class="my_p1">
            <p>| Story 主题系列</p>
            <p>有故事的主题花，含进口花材</p>
        </div>
        <div class="mui-card">
				<div class="mui-card-header mui-card-media" style="height:50vw;width:100%;">
                   <a href=""><img  style="over-flow:hidden;width:100%; height:100%;" src="../../assets/5add296118f414f63c08b1803fabff1feaa15c93.png"></a>
                </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>本周主题花  |「想你」</p>
						<p style="color: #333;margin:0;">表达思念的蓝色花束，带上它去见想见的人吧！</p>
					</div>
				</div>
		</div>
         <div>
            <ul class="my_goodslist" >
                <li v-for="item in list2" :key="item.id">
                    <router-link :to="`/GoodsInfo?id=`+item.id"><img :src="item.img_url"></router-link>
                    <div>
                        <span>{{item.title}}</span>
                        <p>{{item.subtitle}}</p>
                        <p style="font-size:15px;color:red;padding:4px 0;">{{item.price}}/4支</p>
                    </div>
                </li>
            </ul>
        </div>  
    <!--4.tabbar-->
    <!--5.shipin-->
    <div>
        <video src="../../assets/x.mp4" style="width:95%;height:300px;margin:10px;" controls></video>
    </div>
    </div>
</template>
<script>
    // //1:获取所有元素
    // var container = document.querySelector(".container");
    // var ctrl = document.querySelector(".ctrl");
    // var v3 = document.getElementById("v3");
    // var img = document.querySelector(".ctrl img");
    // //2:为容器绑定鼠标移入和移出操作
    // container.onmouseenter = function(){
    //    ctrl.style.display = "block";
    // }
    // container.onmouseleave = function(){
    //    ctrl.style.display = "none";
    // }
    // //3:点击播放按钮
    // ctrl.onclick = function(e){
    //   //a submit button image
    //   e.preventDefault();
    //   if(v3.paused){
    //     v3.play();
    //     img.src = "res/pause.png"
    //   }else{
    //     v3.pause();
    //     img.src = "res/play.png"
    //   }
    // }
    // //4:广告:显示与隐藏
    // var ad = document.querySelector(".ad");
    // v3.onplay = function(){ad.style.display="none"}
    // v3.onpause = function(){
    //   ad.style.display="block"
    // }
   export default {
       created(){
           this.getImages();
           this.getLztp();
           this.getSztp();
       },
       methods:{
           getImages(){
              this.$http.get("imagelist").then(result=>{
                  this.list=result.body.data;
                //   console.log(1111);
                //   console.log(result.body);
              })
           },
           getLztp(){
               this.$http.get("hd_lztp").then(result=>{
                   this.list1=result.body.data;
               })
           },
           getSztp(){
               this.$http.get("hd_sztp").then(result=>{
                   this.list2=result.body.data;
               })
           },
       },
        data(){
            return {
                list:[],
                list1:[],
                list2:[]
            }

        }
    }
</script>
<style>
    .app-home .mint-swipe{
        height:200px;
    }
    .app-home .mint-swipe img{
        width:100%;
        height:200px;

    }
    .my_font{
        text-align:center;
        font-size:15px;
        padding-top:10px;
    }
    .app-home .my_Home_img {
        justify-content:space-between;
        display:flex;
        list-style:none;
        padding:10px;
        margin:4px 0;
        margin: 15px 0;
    }
    .app-home .my_Home_img li{
        width:48%;
    }
    .app-home .my_Home_img li img{
        width:100%;
        border-radius:10px;
    }
    p{
        padding:10px;
        font-size:500;
    }
    .my_p{
        display:flex;
        justify-content:space-between;
    }
    .my_font1{
        font-size:18px;
        color:black;
    }
    .my_p1{
        padding:0 10px 0 10px;
    }
    .my_p1 p{
        padding:0;
        margin:0;
    }
    /*四个 */
    .my_goodslist {
        justify-content:space-between;
        display:flex;
        flex-wrap:wrap;
        list-style:none;
        padding:10px;
        margin:4px 0;
        text-align:center;
    }
    .my_goodslist li{
        width:48%;
        display:flex;
        flex-direction:column;
        border-radius:10px;
        background-color:#fff;
        min-height:210px;       /*最小高度*/
        justify-content:space-between;/*子元素两端对齐*/
    }
    .my_goodslist li span{
        font-size:14px;
    }
    .my_goodslist li p{
        margin:0 auto;
    }
    .app-home .my_goodslist li img{
        width:100%;
        border-radius:10px;
    }

    /*视频样式 */
     /*.container{
     position: relative;
   }
   .ctrl img{width:120px;height:120px;}
   .ctrl{
     position: absolute;
     left:50%;
     top:50%;
     margin-top:-60px;
     margin-left:-60px;
   }
   .ad{
     position: absolute;
     width:400px;
     height:300px;
     left:50%;
     top:50%;
     margin-left:-200px;
     margin-top:-150px;
   }*/
</style>