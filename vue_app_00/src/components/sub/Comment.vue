<template>
    <div class="app-comment">
        <textarea @focus="myInput" placeholder="可爱的你说出ni的故事吧" maxlength="200" v-model="msg" style="border:1px solid pink;border-radius:10px;height:80px;width:95%;margin:10px;"></textarea>
        <div style="display:flex;display:flex;justify-content:space-around;">
            <img @click="" src="../../assets/dz.png" style="height:30px;width:30px" />
            <img @click="postComment" src="../../assets/pl.png" style="height:30px;width:30px" />
        </div>
        
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in list7" :key="item.id" style="width:95%;margin:30px auto;border-radius:3%;border:1px solid #ddd;margin-top:20px;">
                <p class="cmt-info" >
                    第{{i+1}}楼 用户名:{{item.user_name}}
                    发表时间：{{item.ctime | datatimeFilter}}
                    <p class="cmt-body"> 
                        {{item.content}}
                    </p>
                </p>
            </div>
        </div>
        <mt-button size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
    import {Toast} from "mint-ui"
    export default {
        created(){
            this.getMore();
        },
        data(){
            return {
                list7:[],
                pno:0,
                pageSize:7,
                pageCount:1,
                isLogin:false,
                msg:""
            }
        },
        props:["id"],
        methods:{
            myInput(){
                var url = "http://127.0.0.1:3000/isLogin";
                this.axios.get(url).then((result)=>{
                    if(result.data.code==1){
                        Toast("请先登录哦!")
                    }
                })
            },
            postComment(){
                var msg = this.msg;
                var nid = this.id;
                var user_name = this.uname;
                var size = msg.trim().length;
                if(size==0){
                    Toast("评论内容不能为空");
                    return;
                }
                var url = "http://127.0.0.1:3000/addComment";
                var param = `&nid=${nid}&user_name=${user_name}&content=${msg}`;
                this.axios.post(url,param).then(result=>{
                    if(result.data.code == 1){
                        Toast("评论成功");

                        this.pno = 0;
                        this.list7 = [];
                        this.getMore();
                        
                    }else{
                        Toast("评论失败")
                    }
                })
            },
            getMore(){
                var nid = this.id;
                var user_name = this.uname;
                this.pno++;
                var pno = this.pno;
                var pageSize = this.pageSize;
                var url = "getcomment?pno="+pno;
                url +="&nid="+nid+"&user_name="+user_name+"&pageSize="+pageSize;
                this.$http.get(url).then(result=>{
                    var rows = this.list7.concat(result.body.data);
                    this.list7 = rows;
                    console.log(this.list7.user_name);
                })
            }
        },
        
    }
</script>
<style>
    .app-comment h3{
        font-size:18px;
    }
    .app-comment textarea{
        font-size:14px;
        height:68px;
        margin:0;
    }
    .app-comment .cmt-list{
        margin:5px 0;
    }
    .app-comment .cmt-list .cmt-item{
       
        margin-top:15px;
    }
    .app-comment .cmt-list .cmt-info{
        line-height:30px;
        
    }
</style>