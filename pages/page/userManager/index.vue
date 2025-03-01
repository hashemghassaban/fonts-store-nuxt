<template>
  <client-only>
    <section class="userManager">
      <div class="userManager-block">
        <div class="userManager-block__info">
          <sidebar />
        </div>
        <div class="userManager-block__content">
          <div class="userManager-title">
            <h2> اطلاعات کاربری</h2>
          </div>
          <div class="userManager-block__box">
          <div class="field">
            <TextInput
              validators="subject"
              class="my-2"
              :isValid.sync="isValid"
              placeholder="نام  خود را وارد کنید"
              v-model="firstName"
              label="نام"

            />
          </div>
            <div class="field">
              <TextInput
                validators="subject"
                class="my-2"
                :isValid.sync="isValid"
                placeholder=" نام خانوادگی خود را وارد کنید"
                v-model="lastName"
                label="نام خانوادگی"

              />
            </div>
            <div class="field">
              <TextInput
                validators="subject"
                class="my-2"
                placeholder=" ایمیل خود را وارد کنید"
                v-model="email"
                :isValid.sync="isValid"
                label="ایمیل"

              />
            </div>
            <div class="field">
              <TextInput
                validators="subject"
                class="my-2"
                :isValid.sync="isValid"
                placeholder=" موبایل خود را وارد کنید"
                v-model="mobileNumber"
                label="موبایل"

              />
            </div>

            <div class="field">
              <date-picker
                ref="datePicker"
                type="date"
                vmodel="selectedDate"
                element="fromtime"
                color="#AAE73E"
                format="YYYY-MM-DD"
                display-format="jYYYY/jMM/jDD"
                @change="selectDate"
              />
              <TextInput
                validators="date"
                placeholder="تاریخ تولد  خود را وارد کنید"
                v-model="born"
                :isValid.sync="isValid"
                label="تاریخ تولد"
                class="custom-input"
                :width="'100%'"
                id="fromtime"
              />

            </div>
            <div class="field">

              <v-btn :loading="loading" class="submit-btn"  @click="saveProfile">
                <div class="icon">
                  <SvgIcon
                    name="arrow"
                    color="#fff"
                    size="12px"
                    className="rounded-full"
                  />
                </div>
                <span>  ثبت تغییرات </span>
              </v-btn>
            </div>


          </div>

        </div>
      </div>
    </section>
  </client-only>
</template>
<script src="./index.js"></script>

<style lang="scss" scoped src="./index.scss"></style>
