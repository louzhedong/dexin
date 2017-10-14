<template>
  <div class="home-main">
    <div class="header">
      <div class="logo">
        <img src="../assets/logo.png">
        <div class="title">
          <div class="title-top">产品标准化应用平台</div>
          <div class="title-bottom">Product Knowledge Center</div>
        </div>
      </div>
      <div class="tab">
        <div class="tab-left">
          <span class="works" @click="handleClick">作品·WORKS</span>
        </div>
        <ul class="tab-right">
          <li v-for="(item, index) in tabList" :key="index">
            <div class="name">{{item.name}}</div>
            <div class="enname">{{item.enName}}</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="body" v-if="enter">
      <div class="body-left">
        <ul class="thumbnail">
          <li>
            <img src="../assets/test.png" alt="">
            <span class="describe">
              <div class="date">
                2017年5月
              </div>
              <div class="name">
                中国·浙江·舟山
              </div>
              <div class="title">
                舟山府
              </div>
            </span>
          </li>
          <li>
            <img src="../assets/test.png" alt="">
            <span class="describe">
              <div class="date">
                2017年5月
              </div>
              <div class="name">
                中国·浙江·舟山
              </div>
              <div class="title">
                舟山府
              </div>
            </span>
          </li>
          <li>
            <img src="../assets/test.png" alt="">
            <span class="describe">
              <div class="date">
                2017年5月
              </div>
              <div class="name">
                中国·浙江·舟山
              </div>
              <div class="title">
                舟山府
              </div>
            </span>
          </li>
          <li>
            <img src="../assets/test.png" alt="">
            <span class="describe">
              <div class="date">
                2017年5月
              </div>
              <div class="name">
                中国·浙江·舟山
              </div>
              <div class="title">
                舟山府
              </div>
            </span>
          </li>
          <li>
            <img src="../assets/test.png" alt="">
            <span class="describe">
              <div class="date">
                2017年5月
              </div>
              <div class="name">
                中国·浙江·舟山
              </div>
              <div class="title">
                舟山府
              </div>
            </span>
          </li>
          <li>
            <img src="../assets/test.png" alt="">
            <span class="describe">
              <div class="date">
                2017年5月
              </div>
              <div class="name">
                中国·浙江·舟山
              </div>
              <div class="title">
                舟山府
              </div>
            </span>
          </li>
          <li>
            <img src="../assets/test.png" alt="">
            <span class="describe">
              <div class="date">
                2017年5月
              </div>
              <div class="name">
                中国·浙江·舟山
              </div>
              <div class="title">
                舟山府
              </div>
            </span>
          </li>
        </ul>
      </div>
      <div class="body-right">
        <img src="../assets/test.png" alt="" @click="indexImgClick">
      </div>
    </div>
    <div class="body-cover" v-else>
      <div class="cover-left" v-if="!showDetial">
        <div class="cover-top">
          <span class="works" @click="handleClick">作品·WORKS</span>
        </div>
        <ul class="cover-bottom">
          <li v-for="(item, index) in cityArea" :key="index" :class="[index === 0 ? 'active' : '']" @click="changeAreaChoose">
            {{item.name}}
          </li>

        </ul>
      </div>
      <div class="cover-left" v-else>
        <div class="cover-top">
          <span class="works" @click="handleClick">作品·WORKS</span>
        </div>
        <ul class="cover-bottom">
          <li v-for="(item, index) in townArea" :key="index" class="active">
            {{item.name}}
          </li>
          <li @click="showDetial = false">
            返回
          </li>
        </ul>
      </div>
      <div class="cover-right" v-if="!showDetial">
        <div class="image" @click="handleShowDetail">
          <img src="../assets/test.png" alt="">
        </div>
        <div class="image" @click="handleShowDetail">
          <img src="../assets/test.png" alt="">
        </div>
        <div class="image" @click="handleShowDetail">
          <img src="../assets/test.png" alt="">
        </div>
        <div class="image" @click="handleShowDetail">
          <img src="../assets/test.png" alt="">
        </div>
        <div class="image" @click="handleShowDetail">
          <img src="../assets/test.png" alt="">
        </div>
        <div class="image" @click="handleShowDetail">
          <img src="../assets/test.png" alt="">
        </div>
      </div>
      <div class="cover-right" v-else>
        <ul class="detail-list">
          <li>
            <img src="../assets/test.png" alt="">
          </li>
          <li>
            <img src="../assets/test.png" alt="">
          </li>
          <li>
            <img src="../assets/test.png" alt="">
          </li>
          <li>
            <img src="../assets/test.png" alt="">
          </li>
          <li>
            <img src="../assets/test.png" alt="">
          </li>
           <li>
            <img src="../assets/test.png" alt="">
          </li>
           <li>
            <img src="../assets/test.png" alt="">
          </li>
        </ul>

        <div class="big-img">
            <img src="../assets/test.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      tabList: [
        {
          name: '项目资料',
          enName: 'INFORMATION',
          url: ''
        },
        {
          name: '产品系列',
          enName: 'SERIES',
          url: ''
        },
        {
          name: '管控标准',
          enName: 'STANDAEDS',
          url: ''
        },
        {
          name: '模块标准',
          enName: 'MODULES',
          url: ''
        },
        {
          name: '外部知识',
          enName: 'KNOWLEDGE',
          url: ''
        },
        {
          name: '新项目配置',
          enName: 'SETUP',
          url: ''
        },
      ],
      cityArea: [
        {
          name: '杭州区域'
        },
        {
          name: '温州区域'
        },
        {
          name: '宁波区域'
        },
        {
          name: '浙北区域'
        },
        {
          name: '浙中区域'
        },
      ],
      townArea: [
        {
          name: '舟山府'
        }
      ],
      enter: true,    //是否显示首页
      showDetial: false // 是否显示具体的详情页
    }
  },

  created() {
    $.ajax({
      type: 'post',
      url: 'http://192.168.2.249:8080/backend/list',
      data: {},
      dataType: "json",
      success: function(data) {
        console.log(data)
      }
    })
  },

  methods: {
    handleClick() {
      this.enter = !this.enter;
    },

    // 切换区域选项
    changeAreaChoose(event) {
      if (!event.target.classList.contains('active')) {
        $('.cover-bottom li').siblings().removeClass('active');
        event.target.classList.add('active');
      }
    },

    // 点击具体区域内某个图片
    handleShowDetail() {
      this.showDetial = true;
    },

    // 首页图片点击
    indexImgClick() {
      this.enter = false;
      this.showDetial = true;
    }
  }
}
</script>

<style lang="less">
#app {
  .header {
    background-color: #F5F5F5;
    height: 180px;
    padding-top: 20px;
    .logo {
      text-align: center;
      img {
        width: 220px;
        display: inline-block;
        vertical-align: middle;
        margin-left: -120px;
      }
      .title {
        display: inline-block;
        font-size: 21px;
        vertical-align: middle;
        .title-top {
          text-align: left;
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
          border-bottom: 1px solid #947C4A;
          color: #947C4A;
          font-size: 25px;
          cursor: pointer;
        }
      }
      .tab-right {
        display: inline-block;
        vertical-align: middle;
        li {
          list-style: none;
          float: left;
          width: 100px;
          text-align: center;
          margin-right: 20px;
          padding: 15px;
          cursor: pointer;
          &:hover {
            background-color: #947C4A;
            color: #fff;
          }
          .name {
            font-size: 14px;
          }
          .enname {
            font-size: 13px;
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
      width: 440px;
      height: 500px;
      overflow-y: scroll;
      scrollbar-arrow-color: #947C4A;
      padding-right: 30px;
      .thumbnail {
        margin-top: 0px;
        margin-bottom: 0px;
        cursor: pointer;
        li {
          list-style: none;
          height: 88px;
          text-align: right;
          margin-bottom: 40px;
          img {
            width: 150px;
            display: inline-block;
            vertical-align: middle;
          }
          .describe {
            display: inline-block;
            background-color: #E0E0E0;
            width: 150px;
            vertical-align: middle;
            height: inherit;
            text-align: left;
            margin-left: -10px;
            padding-left: 5px;
            .date {
              font-size: 13px;
              margin: 5px 0;
            }
            .name {
              font-size: 13px;
            }
            .title {
              margin-top: 5px;
              font-size: 18px;
              color: #947C4A;
            }
          }
        }
      }
    }
    .body-right {
      height: 500px;
      margin-left: 20px;
      width: 800px;
      img {
        cursor: pointer;
        width: 100%;
        box-shadow: 6px 4px 16px #9E9E9E;
      }
    }
  }
  .body-cover {
    flex: 1;
    .cover-left {
      width: 300px;
      height: 100%;
      position: absolute;
      bottom: 0;
      background: -webkit-gradient(linear, right top, right bottom, from(#EEEAE4), to(#D6CCBA));
      &>.cover-top {
        height: 100px;
        text-align: right;
        margin-right: 20px;
        margin-top: 110px;
        .works {
          height: 60px;
          line-height: 60px;
          border-bottom: 1px solid #947C4A;
          color: #947C4A;
          font-size: 25px;
          cursor: pointer;
        }
      }
      .cover-bottom {
        list-style: none;
        width: 100%;
        padding-left: 0;
        li {
          height: 60px;
          line-height: 60px;
          padding-left: 200px;
          color: #947C4A;
          font-size: 18px;
          &:hover {
            color: #fff;
            background: #816F46;
            cursor: pointer;
          }
        }
        li.active {
          color: #fff;
          background: #816F46;
        }
      }
    }
    .cover-right {
      margin-left: 350px;
      padding-top: 30px;
      .image {
        cursor: pointer;
        width: 280px;
        margin-right: 20px;
        margin-bottom: 20px;
        display: inline-block;
        img {
          width: 100%;
        }
      }
      .detail-list {
        list-style: none;
        display: inline-block;
        width: 130px;
        height: 400px;
        overflow-y: auto;
        padding-left: 0px;
        vertical-align: middle;
        li {
          width: 130px;
          img {
            width: 100%;
          }
        }
      }
      .big-img {
        vertical-align: middle;
        margin-left: 50px;
        display: inline-block;
        height: 400px;
        img {
          height: 100%;
        }
      }
    }
  }
}

@media screen and (min-width: 1440px) {
  #app {
    zoom: 1.2;
  }
}


@media screen and (min-width: 1219px) and (max-width: 1439px) {
  #app {
    zoom: 1;
  }
}

@media screen and (min-width: 1100px) and (max-width: 1220px) {
  #app {
    zoom: 0.9;
  }
}

@media screen and (min-width: 980px) and(max-width: 1099px) {
  #app {
    zoom: 0.8;
  }
}

@media screen and (max-width: 979px) {
  #app {
    zoom: 0.7;
  }
}
</style>