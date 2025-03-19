<template>
  <client-only>
    <section class="signIn">
      <v-snackbar v-model="showSnackbar">
        {{ errorMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="showSnackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
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
            v-model="mobile"
            label="شماره موبایل"
            maxlength="11"
          />

          <v-btn
            elevation="0"
            class="secondary btn"
            :loading="loading"
            @click="getSMS()"
            :disabled="loading || mobile.length !== 11"
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
            v-if="isRegisterd"
            class="my-2"
            v-model="firstName"
            label=" نام "
          />
          <TextInput
            v-if="isRegisterd"
            validators="subject"
            class="my-2"
            v-model="lastName"
            label=" نام خانوادگی "
          />
          <TextInput
            validators="subject"
            v-if="isRegisterd"
            class="my-2"
            v-model="email"
            label=" ایمیل "
          />
          <v-otp-input
            v-model="otp"
            length="5"
            type="number"

          ></v-otp-input>
          <div class="code" v-if="true">
            <p> <Timer
              :target-minutes="2"
              :show-controls="true"
              @restart="getSMS"
            />
            </p>
          </div>
          <div class="code modify">
            <p> کد به شماره {{mobile}} ارسال شده</p>
            <div class="edit" @click="edit()">
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
            @click="login()"
            :disabled="loading || isRegisterd ? (otp?.length !== 5 || email?.length === 0 || lastName?.length === 0  || firstName?.length === 0   ) : (otp?.length !== 5) "
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
