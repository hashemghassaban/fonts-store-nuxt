<template>
  <footer class="footer">
    <div class="footer-top">
      <nuxt-link to="/" class="logos">
        <img src="~/assets/img/logo/logo3.png" alt="logo">
      </nuxt-link>

    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-info">
        <h1>لاینو تایپ</h1>
        <p>لاینوتایپ یک مارکت پلیس جهت عرضه فونت های طراحان ایرانیست. شما با خرید این فونت ها ضمن گسترش فرهنگ قانون کپی رایت و حمایت از طراحان، می توانید به آخرین فونت های سفارشی و خاص طراحان برجسته ایران دسترسی داشته باشید.</p>
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
             to="/page/cooperate"
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
                پرسش های متداول
               </span>

            </nuxt-link>
          </li>


          <li


            class="mega-menu"
          >
            <nuxt-link
              :to="
                '/page/rules'

              "
              class="nav-link"
            >
              <span>
               قوانین استفاده
               </span>

            </nuxt-link>
          </li>


          <li


            class="mega-menu"
          >
            <nuxt-link
              :to="
                '/page/guide'

              "
              class="nav-link"
            >
              <span>
                راهنمای خرید
               </span>

            </nuxt-link>
          </li>

        </ul>
      </div>
      <div class="footer-bottom-social">
        <ul class="social">
          <li class="socialListFooter">
            <a href="https://t.me/linotyper">
              <SvgIcon
                name="telegram"
                color="#ccc"
                size="44px"
                className="rounded-full"
              />
            </a>
          </li>
          <li class="socialListFooter">
            <a href="https://x.com/lino_typer">

              <SvgIcon
                name="X"
                color="#ccc"
                size="44px"
                className="rounded-full"
              />
            </a>
          </li>
          <li class="socialListFooter">
            <a href="https://www.instagram.com/inotyper.ir">

              <SvgIcon
                name="instagram"
                color="#ccc"
                size="44px"
                className="rounded-full"
              />
            </a>
          </li>
          <li class="socialListFooter">
            <a href="https://www.aparat.com/linotyper">

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
          <nuxt-link to="/page/enamad">
            <img src="~/assets/img/logo/namad.png" alt="namad">
          </nuxt-link>
          <nuxt-link to="/page/samandehi">
            <img src="~/assets/img/logo/namd2.png" alt="namad">
          </nuxt-link>
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
