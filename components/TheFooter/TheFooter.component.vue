<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="info">
        <div class="phone d-flex">
          <div class="icon">
            <v-icon color="#607d8b">mdi-phone</v-icon>
          </div>
          <ul>
            <li>
              <a href="tel:05137120000" class="phoneNumber">
                <p><small>051</small> - 3712 0000</p>
              </a>
            </li>
            <li>
              <a href="tel:02191302255" class="phoneNumber">
                <p><small>021</small> - 9130 2255</p>
              </a>
            </li>
          </ul>
        </div>
        <div class="address d-flex">
          <div class="icon">
            <v-icon color="#607d8b">mdi-map-marker</v-icon>
          </div>
          <ul>
            <li>
              <address>
                دفتر مرکزی : خراسان رضوی ، مشهد ، بلوار قرنی ، قرنی 28/1 ، پلاک 15 ، طبقه
                اول
              </address>
            </li>
            <li>
              <address>
                فروشگاه مشهد : خراسان رضوی ، مشهد ، چهارراه ابوطالب، نبش قرنی 26 ، فروشگاه
                افرا
              </address>
            </li>
          </ul>
        </div>
      </div>
      <div class="links">
        <div class="links_service">
          <h4>خدمات مشتریان</h4>
          <ul class="links_service__list">
            <li v-for="(item, i) in serviceLink" :key="i">
              <nuxt-link :to="item.link">{{ item.text }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="links_service">
          <h4>با آلاساز</h4>
          <ul class="links_service__list">
            <li v-for="(item, i) in alaSaz" :key="i">
              <nuxt-link :to="item.link">{{ item.text }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="services-social">
        <div class="services-social__back"></div>
        <div class="services-social__content">
          <div class="contact">
            <div class="services">
              <img class="icon" src="@/assets/images/icons/247.svg" alt="24H" />
              <div class="services-text">
                <p><span>7</span> روز هفته <span>24</span> ساعت</p>
                <p>درحال خدمات‌رسانی هستیم...</p>
              </div>
            </div>
            <ul class="social">
              <li class="socialListFooter">
                <a href="https://instagram.com/alasazcom/">
                  <v-icon color="white">mdi-instagram</v-icon>
                </a>
              </li>
              <li class="socialListFooter">
                <a href="https://twitter.com/alasazcom?t=PosZLmiE9CDbqY71SocLDQ&s=09">
                  <v-icon color="white"> mdi-twitter</v-icon>
                </a>
              </li>
              <li class="socialListFooter">
                <a href="#">
                  <v-icon color="white">mdi-linkedin</v-icon>
                </a>
              </li>
              <li class="socialListFooter">
                <a href="https://pin.it/2sm8aJq">
                  <v-icon color="white">mdi-pinterest</v-icon>
                </a>
              </li>
              <li class="socialListFooter">
                <a href="#">
                  <img src="@/assets/images/icons/aparat.svg" alt="aparat" />
                </a>
              </li>
            </ul>
            <!-- <h4>با ثبت ایمیل ، از جدیدترین تخفیف ها باخبر شوید.</h4>
            <div class="newsLetter">
              <input type="email" placeholder="ایمیل شما..." />
              <button class="submit">ثبت</button>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-desc">
        <nuxt-link to="/">
          <img src="@/assets/images/logo/logo.svg" alt="logo"
        /></nuxt-link>

        <p>
          فروشگاه اینترنتی شیرالات و تجهیزات ساختمانی ، بررسی، انتخاب و خرید آنلاین یک
          خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و
          دارای قیمت مناسب ....
        </p>
      </div>
      <div class="namad">
        <ul class="namad-list">
          <li>
            <a
              referrerpolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=266158&amp;Code=FKzHYBGJmqLbMECQ4FPH"
              ><img
                referrerpolicy="origin"
                src="@/assets/images/logo//enamd.png"
                alt="eNamad"
                style="cursor: pointer"
                id="FKzHYBGJmqLbMECQ4FPH"
            /></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="copyWrite">
      <p>
        تمام حقوق این وب سایت متعلق به
        <a href="/">شرکت افراسازه آذرمهر خراســـان</a> می باشد.
      </p>
    </div>
  </footer>
</template>

<script src="./TheFooter.component.js"></script>

<style lang="scss" scoped src="./TheFooter.component.scss"></style>
