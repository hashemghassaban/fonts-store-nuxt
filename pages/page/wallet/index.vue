<template>
  <client-only>
    <section class="wallet">
      <div class="wallet-block">
        <div class="wallet-block__info">
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
        <div class="wallet-block__content">
          <div class="wallet-title">
            <h2>افزایش اعتبار</h2>
          </div>
        <div class="wallet-block__box">
          <h4> <v-icon color="#F15A24"> mdi mdi-wallet</v-icon> موجودی فعلی : <span class="amount">{{formatPrice(this.last)}} ت</span>
         </h4>

          <div class="button-container">
            <h4> مبلغ :  </h4>

            <button
              v-for="(amount, index) in amounts"
              :key="index"
              :class="{ 'amount-button': true, 'active': activeButton === index }"
              @click="handleButtonClick(index)"
            >
              {{ amount.name }}
            </button>
            <div class="input-container" v-if="activeButton !== null">
              <TextInput
                validators="subject"
                class="my-2"
                placeholder="مبلغ دلخواه خود را وارد کنید"
                v-model="selectedAmount"
                :disabled="activeButton !== 4"
                label="مبلغ"

              />



            </div>
          </div>
          <!-- انتخاب درگاه پرداخت -->
          <h4>درگاه پرداخت : </h4>
          <div class="gateway-select">
            <div class="gateway-options">
              <div
                v-for="gateway in paymentGateway"
                :key="gateway.id"
                :class="{ 'gateway-item': true, 'active': selectedGateway === gateway.id }"
                @click="selectedGateway = gateway.id"
              >
                <img
                  :src="gateway.icon_url"
                  :alt="gateway.name"
                  loading="lazy"
                />

              </div>
            </div>

          </div>

          <v-btn  class="payment-btn"   :disabled="!isValidForm" @click="chargeWallet()">
            <div class="icon">
              <SvgIcon
                name="arrow"
                color="#fff"
                size="12px"
                className="rounded-full"
              />
            </div>
            <span>افزایش اعتبار</span>
          </v-btn>

        </div>

        </div>
      </div>
    </section>
  </client-only>
</template>
<script src="./index.js"></script>

<style lang="scss" scoped src="./index.scss"></style>
