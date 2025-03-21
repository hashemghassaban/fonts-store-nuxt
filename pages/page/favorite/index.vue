<template>
  <client-only>
    <section class="profile">
      <div class="profile-block">
        <div class="profile-block__info">
          <sidebar class="desktopSileBar"/>
          <v-expansion-panels class="mobileSileBar">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                  <v-btn
                    class="showList"
                    color="primary"
                    @click="drawerPage = true"
                    height="40px"
                    width="40px"
                    elevation="0"
                  >
                    مشاهده منو
                    <v-icon style="margin-right: 15px">mdi-menu</v-icon>
                  </v-btn>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <sidebar />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <div class="profile-block__content">
          <div class="profile-title">
            <h2>علاقه مندی های من</h2>
          </div>
          <div class="latest-font-block" v-if="!loading && favourites?.length > 0">

            <div class="box" v-for="(item, index) in favourites">
              <Product :typeProduct="'favorite'" :items="item" @refreshData="refreshData"/>
            </div>


          </div>
          <div class="latest-font-block not-pro"  v-else>
            <img src="~/assets/img/icon/not-pro.png" alt="not pro">
            <span> محصولی یافت نشد</span>
          </div>
          <v-progress-circular
            :size="40"
            v-else
            color="secondary"
            indeterminate
          ></v-progress-circular>
        </div>
      </div>
    </section>
  </client-only>
</template>
<script src="./index.js"></script>

<style lang="scss" scoped src="./index.scss"></style>
