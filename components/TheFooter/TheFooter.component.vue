<template>
  <footer class="footer">
    <div class="footer-top">
      <nuxt-link to="/" class="logos">
        <img src="~/assets/img/logo/logo3.png" alt="">
      </nuxt-link>

    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-info">
        <h1>لاینو تایپ</h1>
        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته.</p>
      </div>
      <div class="footer-bottom-link">
        <ul class="nav-menu" >

          <li

            class="mega-menu"
          >
            <nuxt-link
              to="/contact"

              class="nav-link"
            >
              <span>
                تماس با ما
               </span
              >

            </nuxt-link>


          </li>
          <li


            class="mega-menu"
          >
            <nuxt-link
              to="/about"
              class="nav-link"
            >
              <span>
                درباره ما
               </span
               >

            </nuxt-link>
          </li>
          <li


            class="mega-menu"
          >
            <nuxt-link
             to="/workUs"
              class="nav-link"
            >
              <span>
                همکاری با ما
               </span>

            </nuxt-link>
          </li>

        </ul>
        <ul class="nav-menu" >
          <li


            class="mega-menu"
          >
            <nuxt-link
              :to="
                '/faq'

              "
              class="nav-link"
            >
              <span>
                پرسش و پاسخ
               </span>

            </nuxt-link>
          </li>


          <li


            class="mega-menu"
          >
            <nuxt-link
              :to="
                '/support'

              "
              class="nav-link"
            >
              <span>
                پشیتیبانی
               </span>

            </nuxt-link>
          </li>
          <li


            class="mega-menu" v-show="!authenticate"
          >
            <nuxt-link
              :to="
                '/signIn'

              "
              class="nav-link"
            >
              <span>
                عضویت / ورود
               </span>

            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="footer-bottom-social">
        <ul class="social">
          <li class="socialListFooter">
            <a href="https://instagram.com/alasazcom/">
              <SvgIcon
                name="telegram"
                color="#ccc"
                size="44px"
                className="rounded-full"
              />
            </a>
          </li>
          <li class="socialListFooter">
            <a href="">

              <SvgIcon
                name="twitter"
                color="#ccc"
                size="44px"
                className="rounded-full"
              />
            </a>
          </li>
          <li class="socialListFooter">
            <a href="#">

              <SvgIcon
                name="instagram"
                color="#ccc"
                size="44px"
                className="rounded-full"
              />
            </a>
          </li>
          <li class="socialListFooter">
            <a href="#">

              <SvgIcon
                name="aparat"
                color="#ccc"
                size="44px"
                className="rounded-full"
              />
            </a>
          </li>
        </ul>
        <div class="namad">
          <a href="">
            <img src="~/assets/img/logo/namad.png" alt="">
          </a>
          <a href="">
            <img src="~/assets/img/logo/namd2.png" alt="">
          </a>
        </div>
      </div>


    </div>
    <div class="copyWrite">
      <p>
        تمام حقوق این وب سایت متعلق به
        <a href="/">لاینوتایپ</a> می باشد.
      </p>
    </div>
  </footer>
</template>

<script src="./TheFooter.component.js"></script>

<style lang="scss" scoped src="./TheFooter.component.scss"></style>
