<template>
  <client-only>
    <section class="invite">
      <div class="invite-block">
        <div class="invite-block__info">
          <sidebar />
        </div>
        <div class="invite-block__content">
          <div class="invite-title">
            <h2>معرفی به دوستان</h2>
          </div>
          <div class="invite-block__box">
              <p>کد دعوت را کپی و از طریق پیامک و یا شبکه های اجتماعی برای دوستانتان ارسال کلید و شارژ رایگان بگیرید.</p>
            <div class="invite-code">
              653265
            </div>
            <div class="social-media">
              <div class="social-media-block">
                <div class="box">
                  <nuxt-link to="/">
                    <v-icon>mdi mdi-send</v-icon>
                  </nuxt-link>
                </div>
                <div class="box">
                  <nuxt-link to="/">
                    <v-icon>mdi mdi-whatsapp</v-icon>
                  </nuxt-link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  </client-only>
</template>
<script src="./index.js"></script>

<style lang="scss" scoped src="./index.scss"></style>
