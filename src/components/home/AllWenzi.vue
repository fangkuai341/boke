<template>
  <div style="display: flex; align-items: flex-start">
    <div class="allwenzi">
      <HomeWenzi
        v-for="item in weizhangs"
        :key="item.id"
        :item="item"
        @login="login"
        :upList="upList"
      />
    </div>
    <MyName />
  </div>
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
</template>

<script setup>
import HomeWenzi from "@/components/home/Wenzi";
import MyName from "./myName.vue";
import { onMounted, ref } from "@vue/runtime-core";
import md5 from "md5";
import axios from "axios";
import { useStore } from "../../store/index.js";
const store = useStore();
const weizhangs = ref([]);
const isLogin = ref(false);
const iszhuce = ref(false);
const PwdTwo = ref();
const Pwd = ref();
const Name = ref();
const upList = ref();
const zhuce = async () => {
  await axios({
    method: "POST",
    url: "./account/reg",
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
    url: "./account/login",
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
const login = () => {
  isLogin.value = true;
  iszhuce.value = false;
};
onMounted(async () => {
  await axios({
    method: "GET",
    url: "./wenzi/getCart",
  }).then((res) => {
    weizhangs.value = res.data.data.reverse();
  });
  upList.value = await axios({
    method: "POST",
    url: "./dianzan/isDz",
    data: {
      id: JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))[0].id
        : "",
    },
  });
});
//第一种修改方式
// const add = () => {
//   store.count++;
// };
//第二种修改方式(多数据改变，官方有优化，传递对象不合适复杂的逻辑)
// const add = () => {
//   store.$patch({
//     count: store.count + 2,
//   });
// };
//第三种修改方式(多数据改变，官方有优化，传递函数合适复杂的逻辑)
// const add = () => {
//   store.$patch((state) => {
//     state.count += 3;
//   });
// };
//第四种修改方式使用actions(适合更复杂的逻辑)
// const add = () => {
//   store.changeCount();
// };
</script>

<style scoped lang="less">
.allwenzi {
  background: rgba(255, 255, 255, 0.7);
  width: 55%;
  margin: 80px 0 0 15%;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
}
.right {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.popup {
  position: fixed;
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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
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
