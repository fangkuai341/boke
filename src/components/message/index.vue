<template>
  <div style="margin-top: 80px">
    <div class="popup" v-if="isLogin">
      <div class="tanc" v-if="!iszhuce">
        <div class="right">
          <div class="no">
            <i class="iconfont icon-close" @click="isLogin = false"></i>
          </div>
          <div>
            <div class="font">用户名</div>
            <input type="text" placeholder="请输入用户名" v-model="Name" />
          </div>
          <div>
            <div class="font" style="margin-top: 24px">密码</div>
            <input type="password" placeholder="请输入密码" v-model="Pwd" />
          </div>
          <div class="button" @click="denglu">提交</div>
          <div class="zhucu">
            还没有账号? <span @click="iszhuce = true">立即注册</span>
          </div>
        </div>
      </div>
      <div class="tanc" v-else>
        <div class="right">
          <div class="no">
            <i class="iconfont icon-close" @click="isLogin = false"></i>
          </div>
          <div>
            <div class="font">用户名</div>
            <input type="text" placeholder="请输入用户名" v-model="Name" />
          </div>
          <div>
            <div class="font" style="margin-top: 24px">密码</div>
            <input type="password" placeholder="请输入密码" v-model="Pwd" />
          </div>
          <div>
            <div class="font" style="margin-top: 24px">再输入一次密码</div>
            <input type="password" placeholder="请输入密码" v-model="PwdTwo" />
          </div>
          <div class="button" @click="zhuce">注册并登录</div>
        </div>
      </div>
    </div>
    <div class="fabu">
      <textarea name="text" class="textarea" v-model="text"></textarea>
      <button @click="click">发布</button>
    </div>
    <mag v-for="item in allmsg" :key="item.uID" :item="item"></mag>
  </div>
</template>

<script setup>
import axios from "axios";
import mag from "@/components/message/mea";
import { onMounted, ref } from "@vue/runtime-core";
import md5 from "md5";
const text = ref();
const allmsg = ref([]);

const click = async () => {
  if (text.value === "") {
    alert("请输入内容");
    return;
  }
  axios.defaults.baseURL = "http://127.0.0.1:8080";
  axios.interceptors.request.use(function (config) {
    config.headers.token = localStorage.getItem("token");
    return config;
  });
  await axios({
    method: "POST",
    url: "http://www.dls-lcy.com/msg/setMsg",
    data: {
      id: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))[0].id
        : "",
      name: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))[0].name
        : "",
      liuyancontent: text.value,
    },
  }).then((res) => {
    if (res.data.code === -200) {
      isLogin.value = true;
      iszhuce.value = false;
    }
    if (res.data.code === 200) {
      getMsg();
    }
  });
};

const isLogin = ref(false);
const iszhuce = ref(false);
const PwdTwo = ref();
const Pwd = ref();
const Name = ref();
const zhuce = async () => {
  await axios({
    method: "POST",
    url: "http://www.dls-lcy.com/account/reg",
    data: {
      name: Name.value,
      pwd: md5(Pwd.value),
    },
  }).then((res) => {
    if (res.data.code === 200) {
      denglu();
    }
  });
};
const denglu = async () => {
  await axios({
    method: "POST",
    url: "http://www.dls-lcy.com/account/login",
    data: {
      name: Name.value,
      pwd: md5(Pwd.value),
    },
  }).then((res) => {
    if (res.data.code === 200) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      window.location.reload();
    }
  });
};

onMounted(() => {
  getMsg();
});
const getMsg = async () => {
  await axios({
    method: "GET",
    url: "http://www.dls-lcy.com/getmsg/getMsg",
  }).then((res) => {
    allmsg.value = res.data.data.reverse();
  });
};
</script>

<style lang="less" scoped>
.fabu {
  display: flex;
  justify-content: center;
  .textarea {
    height: 50px;
    width: 70vh;
    resize: none;
    border: none;
    outline: none;
    font-size: inherit;
    font-family: inherit;
    display: block;
  }
  button {
    margin-left: 10px;
    cursor: pointer;
    border-radius: 4px;
    background-color: #f286e2;
    border: 0;
    width: 70px;
    color: #fff;
  }
}

.right {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.popup {
  position: absolute;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .tanc {
    background: #fff;
    padding: 20px 20px;
    border-radius: 8px;
  }
}

.font {
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}
.no {
  margin-left: 310px;
  margin-bottom: 10px;
  cursor: pointer;
}
input {
  width: 330px;
  border: 0px;
  border-bottom: 1px #7f7487 solid;
  background: transparent;
  outline: none;
  font-family: PingFang SC;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-top: 8px;
  padding: 7px 0;
}
.button {
  display: inline-block;
  font-family: PingFang SC;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: #fff;
  border-radius: 4px;
  padding: 8px 16px;
  background: #4c78fc;
  margin-top: 24px;
}
.button:hover {
  cursor: pointer;
  background: #658bfc;
  box-shadow: 0px 4px 12px 0px #407aff80;
}
.button:active {
  cursor: pointer;
  background: #466feb;
  box-shadow: 0px 2px 8px 0px #407affcc;
}

a {
  text-decoration: none;
}
input::-webkit-input-placeholder {
  color: #8d8098;
}
.zhucu {
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  margin-top: 5px;
  span {
    color: #466feb;
    cursor: pointer;
  }
}
</style>
