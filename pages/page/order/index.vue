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
            <v-data-table
              :headers="headers"
              :items="orders"
              class="elevation-1 table-reference"
              v-if="orders"
              :loading="loading"
              :search="search"
              hide-default-footer
            >
              <template
                v-slot:item.payment_method="{ item: { payment_method } }"
              >
                    <span>
                      {{payment_method === 1 ? 'آنلاین' : 'کیف پول'}}</span
                    >
              </template>
              <template
                v-slot:item.full_name="{ item: { full_name } }"
              >
                    <span>
                      {{
                        full_name!== " "? full_name : '-'
                      }}</span
                    >
              </template>

              <template v-slot:no-data> داده ای یافت نشد </template>
            </v-data-table>

          </div>

        </div>
      </div>
    </section>
  </client-only>
</template>
<script src="./index.js"></script>

<style lang="scss" scoped src="./index.scss"></style>
