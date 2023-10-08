<template>
  <div>
    <div style="margin-top: 20vh; margin-bottom: 10vh">
      <a-card :title="projetTitle" style="margin: 0 auto" class="card-fit">
        <a-alert v-bind:message="tishi" type="success" />
        <a-form
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          style="margin: 2vh 2vw 2vh 2vw"
        >
          <!-- <a-form-item label="cookie" name="cookie">
        <a-textarea v-model:value="cookie" placeholder="textarea with clear icon" allow-clear />
        </a-form-item> -->
          <a-form-item label="漫展id" name="漫展id">
            <a-input v-model:value="piaoId" @blur="piaoIdBlur" />
          </a-form-item>
          <a-form-item label="抢票日期" name="抢票日期">
            <a-date-picker format="YYYY-MM-DD" @change="onChange" />
          </a-form-item>
          <a-form-item label="票价" name="票价">
            <a-select
              ref="select"
              v-model:value="moeny"
              :disabled="projetTitle === '标题'"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) in moenyOption"
                :key="index"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item label="是否为捡漏票" name="是否为捡漏票">
            <a-radio-group v-model:value="isJl" name="radioGroup">
              <a-radio value="1">是</a-radio>
              <a-radio value="0">否</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="频率" name="频率">
            <a-input v-model:value="time">
              <template #addonAfter>
                <span>秒抢一个</span>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit" @click="onclick"
              >开始</a-button
            >
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { message } from "ant-design-vue";
// let cookie;
//页面输入参数
let qpDate = ref();
const moeny = ref("");
const time = ref("0.4");

const piaoId = ref("");
const tishi = ref("info");
const isJl = ref("1");
const projetTitle = ref("标题");
const moenyOption = ref([]);
//需要的接口参数
const grxx = ref();
const ticketList = ref();
const screenId = ref();
const getPiaoType = ref(0);
const token = ref();
//两个定时器
const oneSetRepeatTask = ref();
const setRepeatTask = ref();

const onChange = (value, dateString) => {
  qpDate.value = dateString;
  piaoIdBlur();
};
const onclick = async () => {
  // if(cookie)
  // {
  //   window.localStorage.setItem("cookie",cookie);
  // }
  // else{
  //   alert("cookies尚未获取");
  // }
  clearInterval(oneSetRepeatTask.value);
  clearInterval(setRepeatTask.value);
  //获取时间是否可以抢票
  //时间到了，开始抢票
  tishi.value = "正在获取个人信息";
  await getPerInf(); //获取信息
  tishi.value = "正在获取票务信息";
  let i = 0;
  oneSetRepeatTask.value = setInterval(
    async () => {
      await getTicketInf(); //获取id
      //去抢
      if (ticketList.value[getPiaoType.value].clickable || isJl.value) {
        tishi.value = `获取getTonke中....`;
        clearInterval(oneSetRepeatTask.value);
        await grabTicket();
      }
      i++;
      tishi.value = `第${i}次判断是否有票`;
    },
    time.value ? time.value * 1000 : 1000
  );
};
//获取个人信息
const getPerInf = async () => {
  let res = await axios({
    method: "GET",
    url: `/api/ticket/buyer/list?is_default&projectId=${piaoId.value}`,
  });
  grxx.value = res.data.data.list;
  grxx.value[0].isBuyerInfoVerified = true;
  grxx.value[0].isBuyerValid = true;
};
//获取票信息
const getTicketInf = async () => {
  let res = await axios({
    method: "GET",
    url: `/api/ticket/project/get?version=134&id=${piaoId.value}`,
  });
  let arr = res.data.data;

  for (let i = 0; i < arr.screen_list.length; i++) {
    if (arr.screen_list[i].show_date === qpDate.value) {
      ticketList.value = arr.screen_list[i].ticket_list;
      screenId.value = arr.screen_list[i].id;
      break;
    }
  }
  for (let i = 0; i < ticketList.value.length; i++) {
    if (ticketList.value[i].price === +moeny.value) {
      getPiaoType.value = i;
      break;
    }
  }
};
//获取Token
const getTonke = async () => {
  let res = await axios({
    //获取token
    method: "POST",
    url: `/api/ticket/order/prepare`,
    data: {
      project_id: piaoId.value,
      screen_id: screenId.value,
      order_type: 1,
      count: 1,
      sku_id: ticketList.value[getPiaoType.value].id,
      token: "",
    },
  });

  if (res.data.data.shield.verifyMethod) {
    window.open(res.data.data.shield.naUrl, "_blank");
    location.reload();
  }
  token.value = res.data.data.token;
};
//抢票
const grabTicket = async () => {
  let i = 0;
  await getTonke();
  setRepeatTask.value = setInterval(async () => {
    i++;
    let res = await axios({
      //抢
      method: "POST",
      url: `/api/ticket/order/createV2`,
      data: {
        project_id: piaoId.value, //1.输入
        screen_id: screenId.value, //2.获取票信息接口
        sku_id: ticketList.value[getPiaoType.value].id, //3.获取票信息接口
        count: 1, //数量
        pay_money: +moeny.value, //钱数
        order_type: 1,
        timestamp: new Date().getTime(),
        token: token.value, //获取token接口
        deviceId: "3c2003ba05634736371905d33a47f77d",
        buyer_info: JSON.stringify(grxx.value), //获取个人信息接口
      },
    });
    if (res.data.errno === 0 && res.data.errtag === 0 && res.data.data.token) {
      tishi.value = `第${i}次抢票，判断票是否可以使用`;
      //付款界面
      let resPay = await axios({
        method: "GET",
        url: `/api/ticket/order/createstatus?token=${
          res.data.data.token
        }&timestamp=${new Date().getTime()}&project_id=${piaoId.value}`,
      });
      if (resPay.data.data.payParam) {
        clearInterval(setRepeatTask.value);
        let payObj = resPay.data.data.payParam;
        delete payObj.code_url;
        delete payObj.expire_time;
        delete payObj.pay_type;
        delete payObj.use_huabei;
        let params = encodeURIComponent(JSON.stringify(payObj));
        window.open(
          "https://pay.bilibili.com/payplatform-h5/pccashier.html?params=" +
            params,
          "_blank"
        );
        tishi.value = `第${i}次抢票，抢到了，请尽快去支付`;
        let audio = new Audio("./aaa.mp3");
        audio.autoplay = true;
        audio.loop = true;
        audio.play();
      }
    } else {
      tishi.value = `第${i}次抢票，${res.data.msg}`;
    }
    if (res.data.errno === 100051) {
      onclick();
    }
    if (i > 500) {
      clearInterval(setRepeatTask.value);

      onclick();
    }
  }, 1000);
};
const piaoIdBlur = async () => {
  moenyOption.value = [];
  let res = await axios({
    method: "GET",
    url: `/api/ticket/project/get?version=134&id=${piaoId.value}`,
  });
  if (res.data.data.name) {
    projetTitle.value = res.data.data.name;
    //获取qpDate（YYYY-MM-DD）和res.data.data.screen_list（MM月DD日）数组中name相同的对象
    //qpDate.value的格式是YYYY-MM-DD，改为M月D日
    // 假设原始日期字符串为 "YYYY-MM-DD"
    const originalDateString = qpDate.value;
    const originalDate = new Date(originalDateString);

    // 格式化为 "M月D日"
    const formattedDate = originalDate.toLocaleDateString("zh-CN", {
      month: "short", // 使用缩写的月份名称，例如 "9月" 变为 "9"
      day: "numeric", // 使用数字表示日期，例如 "8"
    });
    let flay = false;
    res.data.data.screen_list.forEach((item) => {
      if (item.name === formattedDate) {
        flay = true;
        item.ticket_list.forEach((ticket_list_item) => {
          moenyOption.value.push({
            value: ticket_list_item.price,
            label: ticket_list_item.desc,
          });
        });
        return false;
      }
    });
    if (!flay && qpDate.value) {
      message.info("该日期没有票");
    }
    moenyOption.value = Array.from(
      new Set(moenyOption.value.map((item) => item.value))
    ).map((value) => {
      return moenyOption.value.find((item) => item.value === value);
    });
    //获取
  } else {
    message.info("输入正确的id");
  }
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .card-fit {
    width: 90vw;
  }
}
@media only screen and (min-width: 600px) {
  .card-fit {
    width: 600px;
  }
}
</style>
