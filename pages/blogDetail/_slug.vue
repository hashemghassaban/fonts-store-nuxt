<template>
  <client-only>
    <div>

    <div class="productDetail py-10">
      <section class="productDetail-banner">
        <img :src="posts?.post?.thumbnail_url" alt="">
      </section>
      <section class="productDetail-description">
        <div class="head-pro">
          <h1>{{posts?.post?.title}}</h1>
        </div>
        <p>{{posts?.post?.introduction}}</p>
      </section>
      <section class="productDetail-tiny-banners">
        <div v-for="(item, i) in (posts?.newest_posts)">
          <div v-html="item?.content"></div>
        </div>
      </section>
      <div class="small-banner">
        <img src="~/assets/img/banner/ban4.jpg" alt="">
        <button >
          <div class="icon">
            <SvgIcon
              name="arrow"
              color="#fff"
              size="12px"
              className="rounded-full"
            />
          </div>
          <span>فونت کوت</span>
        </button>
      </div>


    </div>
      <section class="feature">
        <div class="feature-block">
          <div class="feature-block-play" @click="showVideo">
            <img src="~/assets/img/icon/play.svg" alt="">
          </div>
        </div>

        <v-dialog width="800" v-model="dialogVideo" persistent  >


          <v-card

            prepend-icon="mdi-update"
            text="Your application will relaunch automatically after the update is complete."
            title="Update in progress"
            class="block-video"
          >
            <v-icon  @click="hideVideo" class="close" color="#fff">mdi-close</v-icon>

            <video
              controls
              width="640"

              ref="videoPlayer"
              height="360"
              :src="videoSource"

            >
              Your browser does not support the video tag.
            </video></v-card
          >


        </v-dialog>
      </section>


      <section class="type-font">
        <h3>فونت فارسی</h3>
        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد. بان فارسی ایجاد کرد. ساسا مورد استفاده قرار گیرد.</p>
      </section>
      <section class="postMain">
        <h2>  مطالب مشابه</h2>
        <nuxt-link to="/blog" class="show-More">
          همه </nuxt-link>
        <div class="postMain-block">
          <div class="box"  v-for="(item, i) in (posts?.most_rated)?.slice(0, 4)"><Post :items="item" /></div>


        </div>

      </section>
      <section class="contact-form">
        <div class="form-top">
          <h3>ثبت نظر: </h3>
          <div class="rate-box">
            <v-rating
              length="5"
              v-model="rateComment"
              hover
              color="yellow darken-2"
              background-color="#ccc"
              icon="mdi-star"
              empty-icon="mdi-star"
              full-icon="mdi-star"
            ></v-rating>
            <span class="numberRate"> {{ rateComment }} امتیاز</span>
          </div>
        </div>

        <div class="contact-form-block">

          <div class="block pb-5">
            <TextInput
              class="my-2"
              :isValid.sync="isValid"
              v-model="description"
              height="100px"
              width="100%"
              label="متن پیام"
            />
          </div>
          <div class="block">
            <v-btn
              elevation="0"
              class="secondary btn"
              :loading="loading"
              @click="addComment(false)"
            >  <SvgIcon
              name="arrow"
              color="#fff"
              size="15px"
              className="rounded-full"
              style="margin-left: 15px"
            />   ثبت نظر  </v-btn
            >
          </div>
        </div>
        <div class="comments-block__list">
          <div class="comments-block__block" >
            <div class="comments-block__box" v-for="(item ,  i ) in  commentList " >
              <div class="header">
                <div class="user">
                  <div class="avatar">
                    <img :src="item?.user?.avatar_url" width="35" :alt="item?.user?.full_name" />
                  </div>
                  <div class="name">
                  {{item?.user?.full_name !== " " ? item?.user?.full_name : item?.user?.mobile}}
                  </div>
                  <div class="info-user">
                    <div class="rate">
                      <v-icon>mdi mdi-star</v-icon>
                      <span>5</span>
                    </div>
                    <div class="date">{{  new Date(item.created_at).toLocaleString('fa-IR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}}</div>

                  </div>
                </div>
                <div class="comment-description mb-5">{{item.comment}}</div>

                <div class="comment-action">
                  <div
                    class="comment-action-box">
                    <v-btn
                      icon
                      elevation="0"
                      color="orange"
                      @click="showDialogComment(item)"
                    >
                      <SvgIcon
                        name="reply-1"
                        color="#F15A24"
                        size="12px"
                        className="rounded-full"
                      />
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="comments-block__block reply" v-if="item.replies?.length > 0">
                <div class="comments-block__box"  v-for="(reply ,  i ) in  item.replies "  >
                  <div class="header">
                    <div class="user">
                      <div class="avatar">
                        <img :src="reply?.user?.avatar_url" width="35" :alt="reply?.user?.full_name" />
                      </div>
                      <div class="name">
                        {{reply?.user?.full_name !== " " ? reply?.user?.full_name : reply?.user?.mobile}}
                      </div>
                      <div class="info-user">
                        <div class="date">{{  new Date(reply.created_at).toLocaleString('fa-IR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}}</div>

                      </div>
                    </div>
                    <div class="comment-description mb-5">{{reply.comment}}</div>

                    <div class="comment-action">
                      <div
                        class="comment-action-box">
                        <v-btn
                          icon
                          elevation="0"
                          color="orange"
                          @click="showDialogComment(reply)"
                        >

                          <SvgIcon
                            name="reply-1"
                            color="#AAE73E"
                            size="12px"
                            className="rounded-full"
                          />
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
      <v-dialog v-model="dialogAddComment" max-width="600px">
        <v-card>
          <v-card-title class="titleDialog">
            <span >ثبت دیدگاه </span>
          </v-card-title>
          <v-card-text>
            <v-container >
              <v-row>

                <v-col cols="12">

                  <TextInput
                    class="my-2"
                    :isValid.sync="isValid"
                    v-model="bodyComment"
                    height="100px"
                    width="100%"
                    label="متن پیام"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="rate-box">
                    <v-rating
                      length="5"
                      v-model="rateComment"
                      hover
                      color="yellow darken-2"
                      background-color="#ccc"
                      icon="mdi-star"
                      empty-icon="mdi-star"
                      full-icon="mdi-star"
                    ></v-rating>
                    <span class="numberRate"> {{ rateComment }} امتیاز</span>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>




            <v-btn
              elevation="0"
              class="agreeComment"
              @click="dialogAddComment = false"
              text
            >
              خروج
            </v-btn>
            <v-btn
              color="secondary "
class="agreeComment ok"
              elevation="0"
              @click="addComment(true , )"
              width="100px"

            >
              ثبت نظر
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </client-only>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import TextInput from "@/components/TextInput/TextInput";
import SelectInput from "@/components/SelectInput/SelectInput";
import { postService  } from '~/services'


export default {
  head: {
    titleTemplate: "",
    title: "لیست محصول - لاینو تایپ  ",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: "  لیست محصول - ",
    },
  ],
  components: {
    SvgIcon,
    TextInput,
    SelectInput
  },
  data () {
    return {
      searchText: '',
      itemsFilter: ['پربازدید ترین', 'پرفروش ترین', 'محبوب ترین', 'جدیدترین','ارزانترین','گرانترین'],
      filter: 'جدیدترین',
      page: 1,
      dialogVideo:false,
      videoSource: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description:'',
      isValid: false,
      posts:[],
      rateComment: 0,
      dialogAddComment: false,
      bodyComment:'',
      loading:false,
      commentList:[],
      selectId : [],



    }
  },
  computed: {
    authenticate() {
      if (process.client) {
        return !!window.localStorage.getItem('token')
      }
    },
    currentPath() {
      return this.$route.params.slug
    },

  },
  watch: {
    rateComment(newValue, oldValue) {
     if(newValue){
       this.postRate(this.currentPath)
     }
    }
  },

  methods: {
    showDialogComment(newComment) {
this.dialogAddComment = true,
  this.selectId = newComment
    },
    showVideo(){
      this.dialogVideo = true
      this.$nextTick(() => {
        this.$refs.videoPlayer.play();
      });
    },
    hideVideo(){
      this.dialogVideo = false
      this.$nextTick(() => {
        this.$refs.videoPlayer.pause();
      });
    },


    async addComment(isReply) {
      if (!this.authenticate) {
        let url  = ""
        if (process.client) {
          url = window.location?.pathname
        }
        localStorage.setItem('lastUrL' , url)
        this.$router.push('/signIn')
        return
      }
      if(isReply){
        if (this.bodyComment === ""){
          this.$toast.error('متن پیام نباید خالی باشد. ', {
            timeout: 4000,
          })
          return
        }
      }else{
        if( this.description === ""){
          this.$toast.error('متن پیام نباید خالی باشد. ', {
            timeout: 4000,
          })
          return
        }
      }
      this.loading = true;
      let body = isReply ? {
        comment : this.bodyComment,
        parent_id: this.selectId?.parent_id,
        reply :  this.selectId?.id
      } : {
        comment :  this.description,
        parent_id: null,
        reply :  {}
      }
      try {
        const res = await postService.postComment(this.currentPath ,  body)
        this.loading = false;
        this.$toast.success(res?.message, {
          timeout: 4000,
        })
        this.description = ""
        this.bodyComment = ""
        this.dialogAddComment = false

      } catch (error) {

        this.loading = false;

      }
    },

    async getPost(id) {
      try {
        const res = await postService.getPostDetail(id)
        this.posts = res?.entity

      } catch (error) {
        console.error('خطا در دریافت کاربران:', error)
      }
    },
    async getComment(id) {
      try {
        const res = await postService.getComment(id)
        this.commentList = res?.entity

      } catch (error) {
        console.error('خطا در دریافت کاربران:', error)
      }
    },

    async postRate(id) {
      if (!this.authenticate) {
        let url  = ""
        if (process.client) {
          url = window.location?.pathname
        }
        localStorage.setItem('lastUrL' , url)
        this.$router.push('/signIn')
        return
      }
      let body = {
        'rate':this.rateComment
      }
      try {
        const res = await postService.postRate(id ,  body)

      } catch (error) {
        console.error('خطا در دریافت کاربران:', error)
      }
    },



  },
  mounted() {
    this.getPost(this.currentPath);
    this.getComment(this.currentPath)
  }
};
</script>

<style lang="scss" scoped>
.productDetail{
  padding: 0 5%;
  &-banner{
    height: 250px;
    width: 90%;
    border-radius: 10px;
    overflow: hidden;
    padding: 0;
    margin: auto;
    @include breakpoint(medium) {
      height: 500px;
    }
    img{
      width:100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-description{
    padding: 40px 5%;
    .head-pro{
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h1{
        margin: 0;
      }
      button{

        width: 200px;
        background: #AAE73E;
        height: 54px;
        border-radius: 15px;
        border: 3px solid #fff;
        display: flex;
        padding:12px 7px;
        font-size: 18px;
        font-weight: 900;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover{
          background: #fff;
          transition: all 0.3s ease;

        }
        .icon{
          width: 35px;
          height: 35px;
          background: #000;
          text-align: center;
          border-radius: 50px;
          padding: 5px;
        }
        span{
          font-size: 16px;
          font-weight: 900;
          margin-left: 10px;
        }


      }
    }
    p{
      font-size: 15px;
      line-height: 30px;
      margin: 12px 0;
      color: #7D7D7D;
      text-align: justify;
      @include breakpoint(medium) {
        text-align: right;
      }
    }
  }
  &-tiny-banners{
    padding: 0 5%;
    .banners{
      &-block{
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
        margin:0 0 50px;
        padding: 0;


      }
      &-box{
        width: 50%;
        height: 250px;
        position: relative;
        @include breakpoint(medium) {
          height: 750px;
        }

        a{
          display: block;
          width: 100%;
          height: 100%;

          img{
            width: 100%;
            height: 100%;
            object-fit: fill;
            transition: all 0.3s ease;
            &:hover{
              filter: grayscale(100);
              transition: all 0.3s ease;
          }}

        }

      }
    }
    p{
      font-size: 15px;
      line-height: 30px;
      margin: 12px 0;
      color: #7D7D7D;
      text-align: justify;
      @include breakpoint(medium) {
        text-align: right;
      }
    }
  }

}
.rate {
  display: flex;
  gap: 30px;
  align-items: flex-end;

  &-box {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 1.5rem 0 0;

    span {
      color: #5a5a5a;
    }

    ::v-deep {
      .v-rating {
        direction: ltr !important;

        .v-icon {
          padding: 0 2px 0;
        }
      }
    }
  }

  .review {
    color: #b5b5b5;
  }
}


.type-font{
  margin-top: 50px;
  margin-bottom: 0;
  padding: 0 5%;
  @include breakpoint(medium) {
    padding: 0 5%;
    margin-bottom: 100px;
    margin-top: 0px;

  }
  h3{
    color: #535353;
    display: block;
    width: 100%;
  }
  p{
    color: #AEAEAE;
    display: block;
    width: 100%;
    font-size: 14px;
    line-height: 30px;
    margin-bottom: 40px;
    text-align: justify;
    @include breakpoint(medium) {
      text-align: right;
    }
  }

}
.small-banner{
  height: 170px;
  width: 90%;
  border-radius: 10px;
  overflow: hidden;
  margin: 50px auto ;
  position: relative;
  @include breakpoint(medium) {
    height: 270px;
    margin: 100px auto 50px;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  button{
    width: 200px;
    background: #AAE73E;
    height: 54px;
    border-radius: 15px;
    border: 3px solid #fff;
    display: flex;
    padding: 12px 7px;
    font-size: 18px;
    font-weight: 900;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: absolute;
    left: 50px;
    bottom: 50px;
    @include breakpoint(medium) {
      width: 300px;
    }
    &:hover{
      background: #fff;
      transition: all 0.3s ease;

    }
    .icon{
      width: 35px;
      height: 35px;
      background: #000;
      text-align: center;
      border-radius: 50px;
      padding: 5px;
    }
    span{
      font-size: 16px;
      font-weight: 900;
      margin-left: 10px;
    }


  }
}
.feature{
  padding: 0;
  position: relative;
  top: 0;
  @include breakpoint(medium) {
    padding: 10px 0% 50px;
  }


  &-block{
    height: 250px;
    background: #fff;
    border-radius: 0;
    overflow: hidden;
    position: relative;
    background: url('./assets/img/banner/about-video.jpg');
    background-size: 100% 100%;
    @include breakpoint(medium) {
      height: 585px;
    }
    &-play{
      width: 90px;
      height: 90px;
      border-radius: 100px;
      background: #000;
      position: absolute;
      right: 50%;
      top: 50px;
      transform:translate(50%, 30%);
      border: 8px solid #fff;
      cursor: pointer;
      text-align: center;
      line-height: 70px;
      transition: all 0.3s ease;
      @include breakpoint(medium) {
        width: 150px;
        height: 150px;
        transform:translate(50%, 100%);
        line-height: 125px;
        border: 11px solid #fff;

      }

      &:hover{
        border: 11px solid #FF7A00;
        transition: all 0.3s ease;

        img{
          filter: contrast(0.5);
          transition: all 0.3s ease;

        }

      }
      img{
        width: 25px;
        height: 25px;
        transition: all 0.3s ease;
        @include breakpoint(medium) {
          width: 35px;
          height: 35px;
        }

      }
    }


  }
  &-title{
    padding: 22px;
    font-size: 25px;
    color: #3A3A3A;
  }
}
.postMain{
  margin-bottom: 100px;
  position: relative;
  margin-top: 100px;
  .show-More{
    position: absolute;
    left: 16%;
    top: 0;
    font-size: 20px;
    color: #F15A24;
    font-weight: bold;
  }

  h2{
    text-align: center;
    font-weight: bold;
  }
  &-block{
    display: flex;
    width: 100%;
    padding: 40px 5% 0;
    flex-wrap: wrap;
    @include breakpoint(medium) {
      padding: 40px 15%;

    }
    .box{
      flex: 50%;
      max-width: 50%;
      padding: 0 10px;
      @include breakpoint(medium) {
        flex: 25%;
        max-width: 25%;
      }
    }
  }
}

.contact-form {
  background: #F8F8F8;
  padding: 50px 0 65px;
  @include breakpoint(medium) {
    padding: 100px 0 5%;
  }
  .form-top{
    display: flex;
    margin: auto;
    margin-bottom: 15px;
    width: 100%;
    justify-content: space-between;
    flex-direction: column;
    @include breakpoint(medium) {
      width: 600px;
      flex-direction: row;
    }
    .rate-box{
      margin-right: auto;
      padding: 0 11px;
      @include breakpoint(medium) {
        margin: 0;

      }
    }
  }
  h3{
    padding: 0 5%;
    @include breakpoint(medium) {
      padding: 0 ;

    }
  }
  &-block{
    width: 100%;
    margin: auto;
    padding: 0 5%;
    @include breakpoint(medium) {
      width: 600px;
      padding: 0;
    }
    .block{
      text-align: center;
      display: flex;
      gap: 15px;
    }
  }
}

.comments {
  background: #f5f5f5;
  padding: 40px 20px;
  margin: 33px 0 0;
  flex-direction: column;

  @include breakpoint(small) {
    margin: 33px 0 90px;
  }

  &-title {
    font-size: 1.4rem;
    text-align: center;
    color: #666;
    margin: 0 0 45px;
  }

  &-block {
    display: flex;
    gap: 2%;
    flex-wrap: wrap;



    &__list {
      flex: 100%;
      max-width: 100%;
      order: 3;
      margin: 0;

      @include breakpoint(large) {
        flex: 46%;
        max-width: 46%;
        order: 2;
        margin: 60px auto;
      }
    }

    &__block {
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      position: relative;

    }

    &__box {
      border-bottom: 1px solid #8d8d8d;
      padding: 18px 0;

      &:last-child {
        border: 0;
        padding: 18px 0 0;
      }

      &:first-child {
        padding: 0 0 18px;
        position: relative;
      }

      .header {
        padding: 0!important;
        height: auto !important;
        .user {
          display: flex;
          gap: 15px;
          position: relative;
          align-items: center;
          .avatar{
            width: 30px;
            height: 30px;
            overflow: hidden;
            border-radius: 100px;
            img{
              width: 100%;
              height: 100%;
              object-fit: cover;

            }
          }

          .name {
            font-size: 15px;
            font-weight: bold;
            color: #929292;
          }
          .info-user{
            display: flex;
            position: absolute;
            left: 0;
            top: 0;
            flex-direction: row-reverse;
            gap: 10px;
            .rate{
              gap: 3px;
              display: flex;
              align-items: center;
              margin-right: 10px;
              flex-direction: row-reverse;

              i{
                font-size: 20px;
                color: #FFC700;
              }
              span{
                font-size: 15px;
              }
            }
          }
        }


        .address-date {
          display: flex;
          font-weight: 100;
          gap: 20px;
          margin: 15px 0;
          font-size: 14px;
          color: #929292;

          .date {
            border-left: 1px solid #d9d9d9;
            padding-left: 15px;
          }
        }

        .comment-info {
          display: flex;
          font-weight: 100;
          gap: 20px;
          margin: 15px 0;
          font-size: 14px;
          color: #929292;
          flex-direction: column;

          @include breakpoint(small) {
            flex-direction: row;
          }

          .size {
            border: 0;
            padding-left: 15px;

            @include breakpoint(small) {
              border-left: 1px solid #d9d9d9;
            }
          }

          .color {
            @extend .size;
          }

          .stete {
            &.accept {
              color: #1b9520;
            }
          }
        }
        .comment-description {
          margin-top: 25px;
          color: #232323;
          font-size: 14px;
          word-wrap: anywhere;
          padding: 0 6%;
          font-weight: 700;

        }
        .comment-text {
          font-size: 19px;
          margin: 15px 0;
          color: #000;
          font-weight: 700;
        }

        .comment-description {
          font-size: 12px;
          overflow-wrap: anywhere;

        }

        .comment-action {
          gap: 20px;
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: space-between;
          position: relative;
          @include breakpoint(small) {
            flex-direction: row;
          }

          &-box {
            border: 0;
            padding: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            position: absolute;
            left: 0;
            bottom: 15px;
            i{
              font-size: 30px!important
            }


            .block {
              display: flex;
              padding: 0;
            }
          }

          span {
            font-size: 12px;
            color: #607d8b;
            border: 2px solid #607d8b;
            padding: 2px 10px;
            border-radius: 10px;
            font-weight: 800;
          }
        }
      }
    }

    .show-comment {
      color: #1b9520;
      text-align: left;
      display: inline-block;
      margin: 0;
      padding: 0;
      margin-top: 30px;

      &::before {
        background-color: transparent !important;
      }

      &:hover {
        i {
          transform: translate(10px, 0);
        }
      }

      i {
        color: #1b9520;
      }
    }
  }


  .filter {
    flex: 100%;
    max-width: 100%;
    order: 3;

    @include breakpoint(medium) {
      flex: 47%;
      max-width: 48%;
    }

    @include breakpoint(large) {
      flex: 25%;
      max-width: 25%;
    }

    .sortField {
      max-width: 100%;
      font-size: 0.8rem;
      margin: 6px 0 50px;
      padding: 0;
      width: 100%;
    }

    &-item {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 18px 0;
    }
  }
}
::v-deep {
  .form-text-input-container{
    margin: 0 0 27px !important;
    padding: 0;
    @include breakpoint(medium) {
      margin: 8px 0 !important;
    }
  }

  .block-video {
    border: 0;
    height: auto;
    padding: 29px;
    background-color: #0000008f !important;
    border-radius: 8px !important;
    .close{
      position: relative;
      top: -15px;
      float: left;
    }
    video {
      width: 100%;
      height: 100%;
    }
  }

}
.v-dialog {
  .titleDialog {
    font-size: 16px;
    padding: 15px 18px;
    font-weight: 900;

    span {
      font-size: 16px !important;
    }
  }

  p {
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #000;
  }

  img {
    width: 200px;
    margin: 0 auto 25px;
    display: block;
  }

  .rate {
    display: flex;
    align-items: center;
    gap: 30px;

    &-box {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 12px;
      text-align: center;
      justify-content: flex-start;
      margin: 0;

      span {
        color: #ffffff;
      }

      .v-rating .v-icon {
        padding: 0;
      }
    }

    .review {
      color: #b5b5b5;
    }
  }


  .v-card__actions {
    display: flex !important;
    text-align: center;
    padding: 16px !important;
    border-top: 1px solid #d3d3d3;

    .ignoreComment {
      background: #607d8b;
      padding: 7px 20px;
      margin: 0;
      color: #fff;
      height: 40px;
      width: 105px;
    }

    .agreeComment {
      padding: 7px 20px;
      margin: 0;
      color: #000000;
      background: #dddd;
      display: inline-block;
      width: auto;
      border: 2px solid #dddd !important;
      box-shadow: none !important;
      height: 50px !important;
      border-radius: 10px !important;
      font-size: 15px !important;
      &:hover {
        background-color: #fff !important;
        color: #000;

        &:before {
          background-color: #fff !important;

        }
      }
      &.ok {
        height: 40px;
        width: 80px;
        border: 2px solid #aae73e !important;

        &:hover {
          background-color: #fff !important;
          border: 2px solid #ff7a00 !important;
          color: #ff7a00;

          &:before {
            background-color: #fff !important;

          }
        }
      }
      &.v-btn--disabled {
        background: rgb(223, 223, 223);
        color: #999;
      }
      .v-btn--is-elevated {
        width: 100px;
        min-width: 100px;
      }
    }
  }
}

.numberRate {
  color: #000!important;
  padding: 6px 4px;
  font-size: 14px;
  border-radius: 5px;
  display: flex;
  width: 52px;

}
.reply{
  padding: 20px 20px 0;
  background: #f5f5f5;
}

</style>
