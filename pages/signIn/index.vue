<template>
  <client-only>
    <section class="signIn">
      <div class="title">
        <SvgIcon
          name="user"
          color=#FF7A00
          size="28px"
          className="rounded-full"
        />
        <h2>ورود / عضویت</h2>
      </div>
      <div class="signIn-block" v-if="step === 1">


        <div class="signIn-box">
          <TextInput
            validators="subject"
            class="my-2"
            :isValid.sync="isValid"
            v-model="fullName"
            label="نام و نام خانوادگی"
          />
          <TextInput
            validators="subject"
            class="my-2"
            :isValid.sync="isValid"
            v-model="email"
            label="ایمیل "
          />
          <v-btn
            elevation="0"
            class="secondary btn"
            :loading="loading"
            @click="step = 2"
          >  <SvgIcon
            name="arrow"
            color="#000"
            size="15px"
            className="rounded-full"
            style="margin-left: 15px"
          />   ادامه </v-btn
          >
        </div>
      </div>
      <div class="signIn-block"  v-if="step === 2">


        <div class="signIn-box">
          <TextInput
            validators="subject"
            class="my-2"
            :isValid.sync="isValid"
            v-model="fullName"
            label="شماره تماس"
          />
          <v-otp-input
            v-model="otp"
            length="5"

          ></v-otp-input>
          <div class="code" v-if="false">
            <SvgIcon
              name="timer"
              color=#FF7A00
              size="28px"
              className="rounded-full"
            />
            <p >   <Timer
              target-minutes="3"
              :show-controls="false"
              @complete="handleComplete"
            />
              کد ارسال شده
            </p>
          </div>
          <div class="code modify">


            <p >کد به شماره: ۲۲ ۱۱ ۰۰۰ ۹۱۲ ارسال شده</p>
            <div class="edit">
              <SvgIcon
                name="edit"
                color=#000
                size="22px"
                className="rounded-full"
              />
              اصلاح
            </div>
          </div>
          <v-btn
            elevation="0"
            class="secondary btn"
            @click="step = 1"
            :loading="loading"
          >  <SvgIcon
            name="arrow"
            color="#000"
            size="15px"
            className="rounded-full"
            style="margin-left: 15px"
          />   ارسال کد </v-btn
          >
        </div>
      </div>

    </section>
  </client-only>
</template>
<script src="./index.js"></script>

<style lang="scss" scoped src="./index.scss"></style>
