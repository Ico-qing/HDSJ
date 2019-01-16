<template>
    <div class="app-GoodsInfo">
        <mt-swipe :auto="4000">
            <mt-swipe-item>
                <img src="../../assets/Goods/1.png">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../../assets/Goods/2.png">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../../assets/Goods/3.png">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../../assets/Goods/4.png">
            </mt-swipe-item>
        </mt-swipe> 
        <div class="my_div1">
            <div class="my_div2"  >
                <p class="my_font1">￥<span>{{list6.price}}</span>.00/4期</p>
                <del class="my_font2">￥139.00/4期  限时直降</del>
            </div>
            <div class="my_div2">
                <p class="my_font3" style="margin-top:10px;">距结束仅</p>
                <p class="my_font3">10天10时10分10秒</p>
            </div>
        </div>
        <div class="mui-card" style="width:100%;margin:0;padding:0;">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">       
                    购买数量:
                    <div class="mui-numbox">
                        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub">-</button>
                        <input class="mui-input-numbox" type="number" value="1" v-model="val"/>
                        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd">+</button>
				    </div>
			    </div>
		    </div>
			<div class="mui-card-footer" style="border-bottom:none;">
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button style="background-color:pink;" size="small" @click="addCart">加入购物车</mt-button>
            </div>
		</div>
        <div style="background-color:#fff;" class="my_div3">
            <div style="padding-top:10px;margin-bottom:10px">
                <span>{{list6.title}}</span>
                <p>{{list6.subtitle}}</p>
            </div>
        </div>
        <div class="my_div4">
            <p><img src="../../assets/Goods/5.png"></p>
            <p><img src="../../assets/Goods/6.png"></p>
            <p><img src="../../assets/Goods/7.png"></p>
            <p><img src="../../assets/Goods/8.png"></p>
            <p><img src="../../assets/Goods/9.png"></p>
        </div>
    </div>
</template>
<script>
    //
    import {Toast} from "mint-ui"
    export default {
        created(){
            //this.getImages();
            this.getGoodsInfo();
        },
        data() {
            return {
                nid:this.$route.params.id,
                id:this.$route.query.id,
                list6:[],
                val:1,
                isLogin:false,
                id:""
            }
        },
        methods:{
            getGoodsInfo(){
                var id = this.$route.query.id;
                //console.log(id);
                this.$http.get("goodsInfo?id="+id).then(result=>{
                    this.list6 = result.body.data[0];
                    //console.log(result);
                })
            },
            addCart(){
                
                var url = "http://127.0.0.1:3000/isLogin"
                this.axios.get(url).then(result=>{
                console.log(111111111111)
                console.log(result)
                if(result.data.code==1){
                    this.isLogin = false;
                    Toast("请先登录");
                    this.$router.push("/Login");
                }else{
                   
                     this.isLogin = true;
                    console.log(122222222222222222)
                   
                    var pid = this.$route.query.id;
                    //console.log(pid);
                    var count = this.val;
                  
                    var url = "http://127.0.0.1:3000/addCart?pid="+pid+"&count="+count;
                    this.axios.get(url).then(result=>{
                        if(result.data.code == 1){
                            this.$store.commit("increment",count);
                            Toast("添加购物车成功");
                        }else{
                            Toast("添加购物车失败");
                        }
                    });
                }
            })
                // var pid = this.$route.query.id;
                // //console.log(pid);
                // var count = this.val;
                // var uid = this.$route.query.uid;
                // var url = "http://127.0.0.1:3000/addCart?pid="+pid+"&count="+count+"&uid="+uid;
                // this.axios.get(url).then(result=>{
                //     if(result.data.code == 1){
                //         this.$store.commit("increment",count);
                //         Toast("添加购物车成功");
                //     }else{
                //         Toast("添加购物车失败");
                //     }
                // });
            },
            goodSub(){
                if(this.val > 1){
                    this.val--
                }
            },
            goodAdd(){
                if(this.val <=998){
                    this.val++
                }
            },
            // getImages(){
            //     var url = "http://127.0.0.1:3000/imagelist";
            //     this.axios.get(url).then(result=>{
            //     this.list = result.data; 
            //     })
            // }
        },
    }
</script>
<style>
    .app-GoodsInfo .mint-swipe{
        height:400px;
    }
    .app-GoodsInfo .mint-swipe .mint-swipe-item img{
        width:100%;
        height:400px;
    }
    /*粉色背景 */
    .app-GoodsInfo .my_div1{
        background-color:pink;
        display:flex;
        justify-content:space-between;
    }
    .app-GoodsInfo .my_div1 .my_div2 span{
        font-size:30px;
    }
    .app-GoodsInfo .my_div1 .my_div2 .my_font1{
        margin:0;
        padding:10px 15px 0px 10px;
        color:#8f8f94;
    }
    .app-GoodsInfo .my_div1 .my_div2 .my_font2{
        margin:0;
        padding:1px 15px 10px 10px;
        color:#8f8f94;
        font-size:13px;
    }
    .app-GoodsInfo .my_div1 .my_div2 .my_font3{
        margin:0;
        padding:2px 15px 0px 0px;
        color:#8f8f94;
        font-size:13px;
    }
    /*白色背景*/
    .app-GoodsInfo .my_div3 span{
        padding: 0 10px 1px 10px;
    }
    .app-GoodsInfo .my_div3 p{
        padding: 0 10px 10px 10px;
    }
    /*详情 */
    .my_div4{
        width:100%;
    }
    .my_div4 p{
        padding:0;
        margin:0;
    }
    .my_div4 p img{
        width:100%;
        padding:0;
        margin:0;
    }
</style>