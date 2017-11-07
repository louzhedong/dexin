<template>
  <div class="home-main">
    <div class="header">
      <div class="state">
      德信地产  设计研发中心
    </div>
      <div class="logo">
        <div class="title">
          <div class="title-top">
            <img src="../assets/logo.png">
            <span>产品标准化应用平台</span>
            </div>
          <div class="title-bottom">Product Knowledge Center</div>
        </div>
      </div>
      <div class="tab">
        <div class="tab-left">
          <span class="works" @click="handleClick">作品·WORKS</span>
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
                中国·浙江·舟山
              </div>
              <div class="title">
                {{item.name}}
              </div>
            </span>
          </li>
        </ul>
      </div>
      <div class="body-right">
        <img class="img" :src="jointImageOrigin(coverItem.cover)" alt="" @click="indexImgClick(coverItem)">
      </div>
    </div>
    <div class="body-cover" v-else>
      <div class="cover-left animated fadeIn" v-if="!showDetial">
      <div class="state">
      德信地产  设计研发中心
    </div>
        <div class="cover-top">
          <span class="works" @click="handleClick">作品·WORKS</span>
        </div>
        <ul class="cover-bottom">
          <li v-for="(item, index) in cityArea" :key="index" :class="[index === 0 ? 'active' : '']" @click="changeAreaChoose(item, $event)">
            {{item.area}}
          </li>
        </ul>
      </div>
      <div class="cover-left animated fadeIn" v-else>
        <div class="state">
      德信地产  设计研发中心
    </div>
        <div class="cover-top">
          <span class="works" @click="handleClick">作品·WORKS</span>
        </div>
        <ul class="cover-bottom">
          <li class="active">
            {{townArea.name}}
          </li>
          <li @click="handleReturnCilck" class="list-back">
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
          <img :src="jointImageOrigin(townAreaIndexImage)" alt="">
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
      coverItem: {
        cover: ""
      },
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
      townAreaIndexImage: "",
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
          this.coverItem = res.data[0];
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
      this.coverItem = this.describeData[index];
      $(".body-right .img").addClass("animated fadeIn");
      setTimeout(() => {
        $(".body-right .img").removeClass("fadeIn animated");
      }, 1000);
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
          this.townAreaIndexImage = imageList[0];
        }
      });
    },

    // 点击town 列表里具体某个图片
    handleClickTownIndex(item) {
      this.townAreaIndexImage = item;
      $(".big-img img").addClass("animated fadeIn");
      setTimeout(() => {
        $(".big-img img").removeClass("fadeIn animated");
      }, 1000);
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
          this.townAreaIndexImage = imageList[0];
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
    height: 200px;
    .state {
      margin-bottom: 20px;
      border-bottom: 2px #947c4a solid;
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      color: #947c4a;
    }
    .logo {
      text-align: center;
      .title {
        display: inline-block;
        font-size: 21px;
        vertical-align: middle;
        .title-top {
          img {
            width: 100px;
            display: inline-block;
            vertical-align: top;
          }
          span {
            display: inline-block;
            line-height: 36px;
            height: 36px;
          }
        }
        .title-bottom {
          font-size: 22px;
        }
      }
    }
    .tab {
      .tab-left {
        width: 280px;
        display: inline-block;
        text-align: right;
        vertical-align: middle;
        .works {
          height: 60px;
          line-height: 60px;
          border-bottom: 1px solid #947c4a;
          color: #947c4a;
          font-size: 25px;
          cursor: pointer;
          transition: font 1s;
          &:hover {
            font-size: 26px;
          }
        }
      }
      .tab-right {
        display: inline-block;
        vertical-align: middle;
        li {
          list-style: none;
          float: left;
          width: 90px;
          text-align: center;
          margin-right: 30px;
          padding: 15px;
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
            font-size: 14px;
          }
          .enname {
            font-size: 12px;
          }
        }
      }
    }
  }
  .body {
    margin-top: 40px;
    margin-bottom: 40px;
    flex: 1;
    display: flex;
    .body-left {
      width: 480px;
      height: 460px;
      overflow-y: scroll;

      padding-right: 15px;
      .thumbnail {
        margin-top: 0px;
        margin-bottom: 0px;
        cursor: pointer;
        li {
          list-style: none;
          height: 127px;
          text-align: right;
          margin-bottom: 40px;
          img {
            width: 210px;
            display: inline-block;
            vertical-align: middle;
          }
          .describe {
            &:hover {
              background-color: #e0e0e0;
            }
            display: inline-block;
            background-color: #f2f2f2;
            width: 150px;
            vertical-align: middle;
            height: inherit;
            text-align: left;
            margin-left: -10px;
            padding-left: 5px;
            .date {
              font-size: 13px;
              margin: 10px 0;
            }
            .name {
              font-size: 13px;
            }
            .title {
              margin-top: 10px;
              font-size: 18px;
              color: #947c4a;
            }
          }
        }
      }
    }
    .body-right {
      height: 500px;
      margin-left: 20px;
      width: 750px;
      img {
        cursor: pointer;
        width: 100%;
        box-shadow: 6px 4px 16px #9e9e9e;
        animation-duration: 2s;
      }
    }
  }
  ::-webkit-scrollbar {
    width: 15px;
    height: 10px;
  }
  ::-webkit-scrollbar-button:start:decrement,
  /*显示滚动条上方的渐减按钮*/ ::-webkit-scrollbar-button:end:increment {
    display: block;
  }
  /* 定义滚动条渐增按扭的样式 */
  ::-webkit-scrollbar-button:end:increment {
    background-image: url(../assets/scroll_cntrl_dwn.png);
  }

  ::-webkit-scrollbar-button:start:decrement {
    background-image: url(../assets/scroll_cntrl_up.png);
  }
  ::-webkit-scrollbar-track {
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    background: #f2f2f2;
  }
  .body-cover {
    flex: 1;
    .cover-left {
      animation-duration: 2s;
      .state {
        margin-bottom: 20px;
        border-bottom: 2px #947c4a solid;
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        color: #947c4a;
        background: #f2f2f2;
      }
      width: 300px;
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
        height: 100px;
        text-align: right;
        margin-right: 20px;
        margin-top: 110px;
        .works {
          height: 60px;
          line-height: 60px;
          border-bottom: 1px solid #947c4a;
          color: #947c4a;
          font-size: 25px;
          cursor: pointer;
          transition: font 1s;
          &:hover {
            font-size: 26px;
          }
        }
      }
      .cover-bottom {
        list-style: none;
        width: 100%;
        padding-left: 0;
        li {
          height: 60px;
          line-height: 60px;
          padding-left: 170px;
          color: #947c4a;
          font-size: 18px;
          &:hover {
            color: #fff;
            background: -webkit-gradient(
              linear,
              left top,
              right top,
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
            left top,
            right top,
            from(#594849),
            to(#9b7f40)
          );
        }
        li.list-back:hover {
          color: #947c4a;
          background: rgba(0, 0, 0, 0);
        }
      }
    }
    .cover-right {
      margin-left: 350px;
      padding-top: 40px;
      margin-right: 50px;
      .image {
        cursor: pointer;
        width: 280px;
        margin-right: 5px;
        margin-bottom: 5px;
        display: inline-block;
        img {
          width: 100%;
        }
        .image-name {
          text-align: center;
          color: #947c4a;
          font-size: 18px;
        }
      }
      .detail-list {
        list-style: none;
        display: inline-block;
        width: 120px;
        height: 480px;
        padding-left: 0px;
        vertical-align: middle;
        li {
          cursor: pointer;
          width: 120px;
          img {
            width: 100%;
          }
        }
      }
      .big-img {
        vertical-align: middle;
        margin-left: 30px;
        display: inline-block;
        height: 440px;
        margin-bottom: 40px;
        img {
          height: 100%;
        }
      }
    }
  }
}

@media screen and (min-width: 1640px) {
  .home-main {
    zoom: 1.2;
  }
}

@media screen and (min-width: 1440px) and (max-width: 1639px) {
  .home-main {
    zoom: 1.1;
  }
}

@media screen and (min-width: 1329px) and (max-width: 1439px) {
  .home-main {
    zoom: 1;
  }
}

@media screen and (min-width: 1200px) and (max-width: 1328px) {
  .home-main {
    zoom: 0.9;
  }
}

@media screen and (min-width: 1065px) and(max-width: 1199px) {
  .home-main {
    zoom: 0.8;
  }
}

@media screen and (min-width: 935px) and (max-width: 1064px) {
  .home-main {
    zoom: 0.7;
  }
}

@media screen and (max-width: 934px) {
  .home-main {
    zoom: 0.6;
  }
}
</style>