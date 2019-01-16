<template class="app-register">
    <div class="register">
        <div class="register-item"> 
            <input type="text" name="uname" v-model="uname" @blur="unameblur" placeholder="请输入用户名6~12位字符">
        </div>
        <div class="register-item">
            <input type="password" name="upwd" v-model="upwd" placeholder="请输入6~12密码">
        </div>
        <div class="register-item">
            <input type="password" name="cpwd" v-model="cpwd" placeholder="请确认密码">
        </div>
        <mt-button size="large" @click="register">注册</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            uname:'',
            upwd:'',
            cpwd:'',
            checkUname:0
        }
    },
    methods:{
        register(){
            if(this.checkUname==0){
            var uname= this.uname;
            var upwd = this.upwd;
            var cpwd = this.cpwd;
            if(uname=="" ||upwd=="" ||cpwd==""){
                Toast("请填写注册信息")
            }
            var url = "http://127.0.0.1:3000/register";
            var param=`uname=${uname}&upwd=${upwd}&cpwd=${cpwd}`
            this.axios.post(url,param).then(result=>{
                //console.log(result)
                if(result.data.code==1){
                    Toast("注册成功");
                    this.$router.push("/Login")
                }else{
                    Toast(result.data.msg);
                }
            })
            }else{
                Toast("用户名已存在!请更改呦!");
            }
        },
        unameblur(){
            
            if(!this.uname==" "){
                var uname = this.uname;
                var url = "http://127.0.0.1:3000/checkUname";
                var data =  `uname=${uname}`;
                this.axios.post(url,data).then(result=>{
                    if(result.data.code==1){
                        Toast(result.data.msg);
                        this.checkUname=1;
                    }else{
                        Toast(result.data.msg)
                        this.checkUname=0;
                    }
                })
            }
        }
    }
}
</script>
<style>
    .register{
        background:url(../../assets/zhuce.jpg) no-repeat;
        background-size:100% 100%;
        width:100%;
        height:100%;
    }
</style>