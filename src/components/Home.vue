<template>
  <div class="home-main">
    <div class="header">
      <div class="state">
      <span>德信地产</span>
      <span style="float: right; margin-right:20px;">设计研发中心</span>
    </div>
      <div class="logo">
         <img src="../assets/logo.png">
      </div>
      <div class="tab">
        <div class="tab-left">
            <span class="works" @click="handleClick">作品 · WORKS</span>
        </div>
        <ul class="tab-right">
          <li v-for="(item, index) in tabList" :key="index" @click="handleClickTab(item)">
            <div class="name">{{item.name}}</div>
            <div class="enname">{{item.enName}}</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="body" v-if="enter">
      <div class="body-left">
        <ul class="thumbnail">
          <li v-for="(item, index) in describeData" :key="index" @click="handleClickNavbar(index)">
            <img :src="jointImage(item.cover)" alt="">
            <span class="describe">
              <div class="date">
                {{formatDate('YYYY年MM月', item.createTime)}}
              </div>
              <div class="name">
                {{item.address}}
              </div>
              <div class="title">
                {{item.name}}
              </div>
            </span>
          </li>
        </ul>
      </div>
      <div class="body-right">
        <div v-for="(item, index) in coverItem" :key="index" style="height: 100%">
           <transition name="fade-in-linear">
              <img :src="jointImageOrigin(item.cover)" alt="" @click="indexImgClick(item)" :key="item.cover">
           </transition>
        </div>
      </div>
    </div>
    <div class="body-cover" v-else>
      <div class="cover-left animated fadeIn" v-if="!showDetial">
        <div class="state">
           <span>德信地产</span>
        </div>
        <div class="cover-top">
            <span class="works" @click="handleClick">作品 · WORKS</span>
        </div>
        <ul class="cover-bottom">
          <li v-for="(item, index) in cityArea" :key="index" :class="[index === 0 ? 'active' : '']" @click="changeAreaChoose(item, $event)">
            {{item.area}}
          </li>
        </ul>
      </div>
      <div class="cover-left animated fadeIn" v-else>
        <div class="state">
         <span>德信地产</span>
        </div>
        <div class="cover-top">
            <span class="works" @click="handleClick">作品 · WORKS</span>
        </div>
        <ul class="cover-bottom">
          <li class="active">
            {{townArea.name}}
          </li>

          <li class="detail" v-if="townArea.location">
            位置：{{townArea.location}}
          </li>
          <li  class="detail" v-if="townArea.projectDate">
            时间：{{townArea.projectDate}}
          </li>
          <li  class="detail" v-if="townArea.scale">
            规模：{{townArea.scale}}
          </li>
          <li  class="detail" v-if="townArea.situation">
            系列：{{townArea.situation}}
          </li>
          <li @click="handleReturnCilck" class="list-back" style="padding-left: 170px">
            返回
          </li>
        </ul>
      </div>
      <div class="cover-right" v-if="!showDetial">
        <div class="image" v-for="(item, index) in cityAreaIndex.projectList" :key="index" @click="handleShowDetail(item)">
            <img :src="jointImageMiddle(item.cover)" alt="">
            <div class="image-name">{{item.name}}</div>
        </div>
      </div>
      <div class="cover-right" v-else>
        <ul class="detail-list">
          <li v-for="(item, index) in townArea.imageList" :key="index" @click="handleClickTownIndex(item)">
            <img :src="jointImage(item)" alt="">
          </li>
        </ul>

        <div class="big-img">
            <div v-for="(theImage, key) in townAreaIndexImage" :key="key" style="height:100%">
              <transition name="fade-in-linear">
              <img :src="jointImageOrigin(theImage)" :key="theImage"/>
               </transition>
            </div>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from "../config";
export default {
  name: "home",
  data() {
    return {
      describeData: [],
      coverItem: [
        {
          cover: ""
        }
      ],
      tabList: [
        {
          name: "项目资料",
          enName: "INFORMATION",
          url: "http://www.baidu.com"
        },
        {
          name: "产品系列",
          enName: "SERIES",
          url: ""
        },
        {
          name: "管控标准",
          enName: "STANDAEDS",
          url: ""
        },
        {
          name: "模块标准",
          enName: "MODULES",
          url: ""
        },
        {
          name: "外部知识",
          enName: "KNOWLEDGE",
          url: ""
        },
        {
          name: "新项目配置",
          enName: "SETUP",
          url: ""
        }
      ],
      cityArea: [],

      cityAreaIndex: {},
      townArea: {},
      townAreaIndexImage: [],
      enter: true, //是否显示首页
      showDetial: false // 是否显示具体的详情页
    };
  },

  created() {
    $.ajax({
      type: "post",
      url: window.Config.server + "/home/index",
      data: {},
      dataType: "json",
      success: res => {
        this.describeData = res.data;
        if (res.data) {
          this.coverItem[0] = res.data[0];
        }
      }
    });
  },

  methods: {
    handleClickTab(item) {
      window.location.href = item.url;
    },

    handleClick() {
      this.enter = !this.enter;
      if (this.cityArea.length === 0) {
        $.ajax({
          type: "post",
          url: window.Config.server + "/home/area",
          data: {},
          dataType: "json",
          success: res => {
            this.cityArea = res.data;
            if (res.data) {
              this.cityAreaIndex = res.data[0];
            }
          }
        });
      }
    },

    // 点击首页左边图标
    handleClickNavbar(index) {
      this.coverItem.splice(0, 1, this.describeData[index]);
      // $(".body-right .img").addClass("animated fadeIn");
      // setTimeout(() => {
      //   $(".body-right .img").removeClass("fadeIn animated");
      // }, 1000);
    },

    // 切换区域选项
    changeAreaChoose(item, event) {
      if (!event.target.classList.contains("active")) {
        $(".cover-bottom li")
          .siblings()
          .removeClass("active");
        event.target.classList.add("active");
        this.cityAreaIndex = item;
      }
    },

    // 点击具体区域内某个图片
    handleShowDetail(item) {
      this.showDetial = true;
      $.ajax({
        type: "post",
        url: window.Config.server + "/home/detail",
        data: {
          id: item.id
        },
        dataType: "json",
        success: res => {
          this.townArea = res.data;
          let imageList = res.data.images.split(",");
          this.townArea.imageList = imageList;
          this.townAreaIndexImage[0] = imageList[0];
        }
      });
    },

    // 点击town 列表里具体某个图片
    handleClickTownIndex(item) {
      this.townAreaIndexImage.splice(0, 1, item);
      // $(".big-img img").addClass("animated fadeIn");
      // setTimeout(() => {
      //   $(".big-img img").removeClass("fadeIn animated");
      // }, 1000);
    },

    // 返回按钮
    handleReturnCilck() {
      this.showDetial = false;
      if (this.cityArea.length === 0) {
        $.ajax({
          type: "post",
          url: window.Config.server + "/home/area",
          data: {},
          dataType: "json",
          success: res => {
            this.cityArea = res.data;
            if (res.data) {
              this.cityAreaIndex = res.data[0];
            }
          }
        });
      }
    },

    // 首页图片点击
    indexImgClick(coverItem) {
      this.enter = false;
      this.showDetial = true;
      $.ajax({
        type: "post",
        url: window.Config.server + "/home/detail",
        data: {
          id: coverItem.id
        },
        dataType: "json",
        success: res => {
          this.townArea = res.data;
          let imageList = res.data.images.split(",");
          this.townArea.imageList = imageList;
          this.townAreaIndexImage[0] = imageList[0];
        }
      });
    },

    jointImage(url) {
      return window.Config.server + "/resource/" + url + "?w=150&h=88";
    },

    jointImageMiddle(url) {
      return window.Config.server + "/resource/" + url + "?w=280&h=165";
    },

    jointImageOrigin(url) {
      return window.Config.server + "/resource/" + url + "?w=750&h=440";
    },

    formatDate(format, timestamp) {
      if (!timestamp) return "";

      var date = new Date(parseInt(timestamp));
      var y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds(),
        w = date.getDay(),
        week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      h = h < 10 ? "0" + h : h;
      i = i < 10 ? "0" + i : i;
      s = s < 10 ? "0" + s : s;
      return format
        .replace("YYYY", y)
        .replace("MM", m)
        .replace("DD", d)
        .replace("H", h)
        .replace("i", i)
        .replace("s", s)
        .replace("WW", week[w]);
    }
  }
};
</script>

<style lang="less">
#app {
  .header {
    background-color: #f2f2f2;
    height: 250px;
    .state {
      margin-bottom: 35px;
      border-bottom: 2px #947c4a solid;
      height: 32px;
      line-height: 32px;
      padding-left: 20px;
      color: #947c4a;
      font-size: 12px;
    }
    .logo {
      text-align: center;
      img {
        width: 344px;
      }
    }
    .tab {
      .tab-left {
        width: 344px;
        display: inline-block;
        text-align: right;
        vertical-align: middle;
        .works {
          height: 60px;
          line-height: 60px;
          border-bottom: 1px solid #947c4a;
          color: #947c4a;
          font-size: 30px;
          cursor: pointer;
          display: inline-block;
          font-weight: bold;
        }
      }
      .tab-right {
        display: inline-block;
        vertical-align: middle;
        li {
          list-style: none;
          float: left;
          width: 130px;
          text-align: center;
          padding: 10px 10px;
          cursor: pointer;
          &:hover {
            background: -webkit-gradient(
              linear,
              left top,
              right top,
              from(#594849),
              to(#9b7f40)
            );
            color: #fff;
          }
          .name {
            font-size: 15px;
          }
          .enname {
            font-size: 11px;
          }
        }
      }
    }
  }
  .body {
    margin-top: 25px;
    flex: 1;
    display: flex;
    .body-left {
      width: 550px;
      height: 440px;
      overflow-y: scroll;
      padding-top: 20px;
      &::-webkit-scrollbar {
        width: 16px;
        height: 10px;
      }
      &::-webkit-scrollbar-button:start:decrement,
      /*显示滚动条上方的渐减按钮*/ ::-webkit-scrollbar-button:end:increment {
        display: block;
      }
      /* 定义滚动条渐增按扭的样式 */
      &::-webkit-scrollbar-button:end:increment {
        background-image: url(../assets/scroll_cntrl_dwn.png);
      }

      &::-webkit-scrollbar-button:start:decrement {
        background-image: url(../assets/scroll_up.png);
      }
      &::-webkit-scrollbar-track {
        background: #ffffff;
      }
      &::-webkit-scrollbar-thumb {
        background: #f2f2f2;
      }
      padding-right: 15px;
      .thumbnail {
        margin-top: 0px;
        margin-bottom: 0px;
        cursor: pointer;
        li {
          list-style: none;
          height: 117px;
          text-align: right;
          margin-bottom: 31px;
          img {
            width: 210px;
            display: inline-block;
            vertical-align: middle;
            height: inherit;
          }
          .describe {
            &:hover {
              background-color: #e0e0e0;
            }
            display: inline-block;
            background-color: #f2f2f2;
            width: 180px;
            vertical-align: middle;
            height: inherit;
            text-align: left;
            margin-left: -10px;
            padding-left: 5px;
            .date {
              font-size: 14px;
              margin: 10px 0;
            }
            .name {
              font-size: 14px;
            }
            .title {
              margin-top: 10px;
              font-size: 24px;
              color: #947c4a;
              font-weight: bold;
            }
          }
        }
      }
    }
    .body-right {
      height: 410px;
      margin-left: 20px;
      width: 700px;
      margin-top: 20px;
      .fade-in-linear-enter-active {
        transition: opacity 2.5s;
      }

      .fade-in-linear-enter {
        opacity: 0;
      }
      img {
        cursor: pointer;
        width: 100%;
        height: 100%;
        box-shadow: 6px 4px 16px #9e9e9e;
      }
    }
  }

  .body-cover {
    flex: 1;
    .cover-left {
      animation-duration: 2s;
      .state {
        margin-bottom: 35px;
        border-bottom: 2px #947c4a solid;
        height: 32px;
        line-height: 32px;
        padding-left: 20px;
        color: #947c4a;
        background: #f2f2f2;
        font-size: 12px;
      }
      width: 364px;
      height: 100%;
      position: absolute;
      bottom: 0;
      background: -webkit-gradient(
        linear,
        left top,
        right top,
        from(#d0c1ab),
        to(#e4dcd0)
      );
      & > .cover-top {
        height: 110px;
        text-align: right;
        margin-right: 20px;
        margin-top: 108px;
        .works {
          line-height: 60px;
          color: #947c4a;
          font-size: 30px;
          cursor: pointer;
          display: inline-block;
          font-weight: bold;
        }
      }
      .cover-bottom {
        list-style: none;
        width: 100%;
        padding-left: 0;
        padding-top: 5px;
        li {
          height: 60px;
          line-height: 60px;
          padding-left: 200px;
          color: #947c4a;
          font-size: 20px;
          &:hover {
            color: #fff;
            background: -webkit-gradient(
              linear,
              right top,
              left top,
              from(#594849),
              to(#9b7f40)
            );
            cursor: pointer;
          }
        }
        li.active {
          color: #fff;
          background: -webkit-gradient(
            linear,
            right top,
            left top,
            from(#594849),
            to(#9b7f40)
          )
        }
        li.detail {
          padding-left: 130px;
          cursor: default;
        }
        li.detail:hover {
          color: #947c4a;
          background: rgba(0, 0, 0, 0);
        }
        li.list-back:hover {
          color: #947c4a;
          background: rgba(0, 0, 0, 0);
        }
      }
    }
    .cover-right {
      margin-left: 364px;
      padding-top: 25px;
      margin-right: 50px;
      padding-left: 55px;
      .image {
        cursor: pointer;
        width: 285px;
        margin-right: 5px;
        margin-bottom: 5px;
        display: inline-block;
        img {
          width: 100%;
          height: 156px;
        }
        .image-name {
          text-align: center;
          color: #947c4a;
          font-size: 18px;
          margin-bottom: 10px;
        }
      }
      .detail-list {
        list-style: none;
        display: inline-block;
        width: 120px;
        height: 406px;
        padding-left: 0px;
        vertical-align: middle;
        margin-top: 0px;
        overflow: auto;
        li {
          cursor: pointer;
          width: 112px;
          height: 62px;
          margin-bottom: 6px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .big-img {
        .fade-in-linear-enter-active {
          transition: opacity 2.5s;
        }

        .fade-in-linear-enter {
          opacity: 0;
        }
        vertical-align: middle;
        margin-left: 25px;
        display: inline-block;
        height: 406px;
        margin-bottom: 40px;
        width: 725px;
        overflow: hidden;
        img {
          margin-top: 12px;
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
@media screen and (min-width: 1699px) {
  .home-main {
    zoom: 1.2;
  }
}

@media screen and (min-width: 1600px) and (max-width: 1698px) {
  .home-main {
    zoom: 1.1;
  }
}

@media screen and (min-width: 1440px) and (max-width: 1599px) {
  .home-main {
    zoom: 1;
  }
}

@media screen and (min-width: 1329px) and (max-width: 1439px) {
  .home-main {
    zoom: 0.9;
  }
}

@media screen and (min-width: 1200px) and (max-width: 1328px) {
  .home-main {
    zoom: 0.8;
  }
}
</style>