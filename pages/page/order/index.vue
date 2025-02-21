<template>
  <section class="profile py-10 accent d-flex">
    <client-only>
      <sidebar />
      <div class="profile-content">
        <v-card class="py-3 d-block px-2 mb-2">
          <v-icon>mdi-exclamation</v-icon>
          <span class="subject">
            برای استفاده بهتر از امکانات سایت لطفا اطلاعات حساب کاربری خود را تکمیل کنید.
            <nuxt-link to="/profile/userManager">حساب کاربری</nuxt-link>
          </span>
        </v-card>
        <v-card class="content">
          <div class="summary">
            <h4 class="title-content">سفارش های من</h4>
            <div class="summary-content">
              <div class="summary-box" v-for="(item, i) in orders" :key="i">
                <v-icon>{{ item.icon }}</v-icon>
                <div class="summary-box__content">
                  <div class="block">
                    <span>{{ item.amount || 0 }}</span>
                    <span>سفارش</span>
                  </div>
                  <p @click="gotoLink(item.tab)">{{ item.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </client-only>
  </section>
</template>
<script src="./index.js"></script>

<style lang="scss" scoped src="./index.scss"></style>
