<template>
    <div class="app-login">
        <div class="my_logo">
            <img src="../../assets/logo1.png"> 
        </div>
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
						<!--form action="#"-->
                    用户名: <input type="text" value="" @blur="loginUname" placeholder="请输入用户名" v-model="uname"/>
                    密码: <input type="password" value="" @blur="loginUpwd" placeholder="请输入密码" v-model="upwd"/>
                    <mt-button  size="large" @click="handleLogin">登录</mt-button>
                    <router-link to="/Register" style="color:pink;font-size:16px;">注册</router-link>
                        <!--/form-->
				</div>
			</div>
		</div>     
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return {
                uname:"",
                upwd:""
            }
        },
        methods:{
            handleLogin(){
                var u = this.uname;
                var p = this.upwd;
                var url = "http://127.0.0.1:3000/";
                url +="Login?uname="+u+"&upwd="+p;
                this.axios.get(url).then(result=>{
                        if(result.data.code == 1){
                         this.$router.push("/Person");
                        Toast("登录成功");
                        this.$store.commit("signin");
                        }else if(result.data.code == 401 || result.data.code == 402){
                            Toast("请输入用户名和密码")
                        }else {
                            Toast("用户名或密码错误")
                        }
                })
            },
            loginUname(){
                var u = this.uname;
                if(!u){
                    Toast("请输入用户名")
                }
            },
            loginUpwd(){
                var p = this.upwd;
                if(!p){
                    Toast("请输入用户名")
                }
            }
        }
    }
</script>
<style>
    .app-login .my_logo img{
        width: 120px;
        display: block;
        margin: 0 auto;
        margin-top:45px;
    }
    .sign .mobile{
        display:flex;
    }
    .sign .mobile .spa{
        height: 24px;
        width: 76px;
        line-height: 24px;
        padding: 0 0 0 20px;
        border-right: 1px solid #e9e9e9;
        font-size:10px;
    }
    #phone{
        margin-left: 13px;
        width: 100%;
        border: none;
        height: 40px;
    }
    input{
        border:none;
    }
    

</style>