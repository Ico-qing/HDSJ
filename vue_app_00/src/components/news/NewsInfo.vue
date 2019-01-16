<template>
<div>
    <div class="app-newsinfo" style="height:200px;width:95%;margin:30px auto;border-radius:5%;border:1px solid #ddd;padding-top:30px;margin-top:20px;">
        <h4 style="text-align:center;">{{info.title}}</h4>
        <p>{{info.content}}</p>
        <p style="float:right;">{{info.ctime | datatimeFilter}}</p>
        <p>点击 {{info.point}} 次数</p>
        
    </div>
    <div>
        <comment-box :id="id"></comment-box>
    </div>
 </div>   
</template>
<script>
    import comment from "../sub/Comment.vue"
    export default {
        created(){
            this.getNewsInfo();
        },
        data(){
            return {
                id:this.$route.query.id,
                info:{}
            }
        },
        methods:{
            getNewsInfo(){
                var id = this.$route.query.id;
                this.$http.get("newsInfo?id="+id).then(result=>{
                    this.info = result.body.data[0];
                    // console.log(result.body.data[0]);
                    // console.log(1111);
                    // console.log(this.info);
                    // console.log(this.info.ctime);
                    // console.log(this.info.title);
                })
            }
        },
        components:{
            "comment-box":comment
        }
    }
</script>
<style>
    
</style>