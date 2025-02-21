<template>
  <client-only>
    <section class="profile">
      <div class="profile-block">
        <div class="profile-block__info">
          <sidebar />
        </div>
        <div class="profile-block__content">
          <div class="profile-title">
            <h2> سفارش های من</h2>
          </div>
          <div class="latest-font-block">
            <div class="box">
              <Product :typeProduct="'profile'"/>
            </div>
            <div class="box">
              <Product :typeProduct="'profile'"/>
            </div>
            <div class="box">
              <Product :typeProduct="'profile'"/>
            </div>
            <div class="box">
              <Product :typeProduct="'profile'"/>
            </div>
          </div>
          <v-pagination
            v-model="page"
            :length="5"
            class="my-4"
          ></v-pagination>
        </div>
      </div>
    </section>
  </client-only>
</template>
<script src="./index.js"></script>

<style lang="scss" scoped src="./index.scss"></style>
