<template>
    <div style="background-color:#f4f4f4" class="app-Find">
        <div class="mui-content">
			<div class="mui-content-padded" style="margin: 10px;">
				<div class="mui-input-row mui-search">
					<input type="search" class="mui-input-clear" placeholder="哇哦很赞脮！">
				</div>
            </div>
        </div>
        <div class="app-Find_div" v-for="item in list3" :key="item.id">
            <div class="my_Find_img">
                <router-link to="/NewsList">
                    <img :src="item.img_url">
                </router-link>
            </div>
            <div>
                <span>{{item.title}}</span>
                <p>{{item.subtitle}}</p>
            </div>
        </div>
        
        <!--div class="app-Find_div">
            <div class="my_Find_img">
                <img src="../../assets/1a9f4cef3506fd524bee9a37278e3501effb69e1.png">
            </div>
            <div>
                <span>简单生活爱好者请进</span>
                <p>Less is more~ </p>
            </div>
        </div>
        <div class="app-Find_div">
            <div class="my_Find_img">
                <img src="../../assets/f9ae57b8509c7cb6b836730b1a6c9d74365046ed.png">
            </div>
            <div>
                <span>简单生活爱好者请进</span>
                <p>Less is more~ </p>
            </div>
        </div>
        <div class="app-Find_div">
            <div class="my_Find_img">
                <img src="../../assets/fba3f247b9c548004bb1e8e5659a1a007d1621a5.png">
            </div>
            <div>
                <span>简单生活爱好者请进</span>
                <p>Less is more~ </p>
            </div>
        </div>
        <div class="app-Find_div">
            <div class="my_Find_img">
                <img src="../../assets/e3b75821012607f823185fa9aaad64502876f957.png">
            </div>
            <div>
                <span>简单生活爱好者请进</span>
                <p>Less is more~ </p>
            </div>
        </div>
        <div class="app-Find_div">
            <div class="my_Find_img">
                <img src="../../assets/36e4b2a336997460c2b2442d6d39b39460bfbfdb.png">
            </div>
            <div>
                <span>简单生活爱好者请进</span>
                <p>Less is more~ </p>
            </div>
        </div>
        <div class="app-Find_div">
            <div class="my_Find_img">
                <img src="../../assets/c0567e5b9601d79af1429804447a20728add08d9.png">
            </div>
            <div>
                <span>简单生活爱好者请进</span>
                <p>Less is more~ </p>
            </div>
        </div>
        <div class="app-Find_div">
            <div class="my_Find_img">
                <img src="../../assets/1bc96789dd6cff408c0eaf87fb8d605f241fc84a.png">
            </div>
            <div>
                <span>简单生活爱好者请进</span>
                <p>Less is more~ </p>
            </div>
        </div-->
    </div>
</template>
<script>
    export default {
        created(){
            this.getFx();
        },
        data(){
            return{
                list3:[]
            }
        },
        methods:{
            getFx(){
                this.$http.get("hd_fx").then(result=>{
                  this.list3=result.body.data;
              })
            },
        },
    }
</script>
<style>
    .app-Find_div p {
        padding:5px 25px;
    }
    .app-Find_div span{
        padding: 20px 25px;
    }
    .app-Find_div {
        background-color:#fff;
        width:100%;
    }
    .app-Find .app-Find_div .my_Find_img img{
        padding:10px 0 5px 0;
        width:92%;
        height:200px;
        margin:0 auto;
        border-radius:55px;
        display:block;
    }
</style>