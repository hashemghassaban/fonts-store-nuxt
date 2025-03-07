<template>
  <client-only>
    <section class="profile">
      <div class="profile-block">
        <div class="profile-block__info">
          <sidebar />
        </div>
        <div class="profile-block__content">
          <div class="profile-title">
            <h2>علاقه مندی های من</h2>
          </div>
          <div class="latest-font-block">

            <div class="box" v-for="(item, index) in favourites">
              <Product :typeProduct="'favorite'" :items="item" @refreshData="refreshData"/>
            </div>

          </div>
        </div>
      </div>
    </section>
  </client-only>
</template>
<script src="./index.js"></script>

<style lang="scss" scoped src="./index.scss"></style>
