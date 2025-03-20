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
          <div class="latest-font-block" v-if="!loading">
            <v-data-table
              :headers="headers"
              :items="orders"
              class="elevation-1 table-reference"
              v-if="orders"
              show-expand
              :search="search"
              hide-default-footer
            >
              <template
                v-slot:item.payable="{ item: { payable } }"
              >
                    <span>
                      {{formatPrice(payable)}} </span
                    >
              </template>
              <template
                v-slot:item.created_at="{ item: { created_at } }"
              >
                    <span>

                     {{
                        new Date(created_at).toLocaleString("fa-IR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      }}

                    </span
                    >
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <ul class="list-detail" v-for="(data, j) in  item?.items" :key="j">
                    <li>نام فونت : <b>{{ data.product_name }}</b></li>
                    <li>مبلغ: <b>{{formatPrice(data.payable_price)}} ت</b></li>

                    <li><v-btn :loading="loadingBtn && data.id === selectId" color="primary" @click="download(data.id)"> دانلود</v-btn> <p>آخرین بروزرسانی :    {{
                        new Date(data?.updated_at).toLocaleString("fa-IR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      }}</p></li>
                  </ul>
                </td>
              </template>
              <template v-slot:no-data> داده ای یافت نشد </template>
            </v-data-table>

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
