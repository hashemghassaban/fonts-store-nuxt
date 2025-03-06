<template>
  <client-only>
    <section class="userManager">
      <div class="userManager-block">
        <div class="userManager-block__info">
          <sidebar @profile="profile" @avatarUrl="avatarUrl"  />
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
              v-if="isEdit"

            />
            <label v-else> نام : <span>{{firstName || '-'}}</span></label>
          </div>
            <div class="field">
              <TextInput
                validators="subject"
                class="my-2"
                :isValid.sync="isValid"
                placeholder=" نام خانوادگی خود را وارد کنید"
                v-model="lastName"
                label="نام خانوادگی"
                v-if="isEdit"
              />
              <label v-else> نام خانوادگی : <span>{{lastName || '-'}}</span></label>

            </div>
            <div class="field">
              <TextInput
                validators="subject"
                class="my-2"
                placeholder=" ایمیل خود را وارد کنید"
                v-model="email"
                :isValid.sync="isValid"
                label="ایمیل"
                v-if="isEdit"

              />
              <label  v-else> ایمیل : <span> {{email || '-'}}</span></label>

            </div>
            <div class="field">
              <TextInput
                validators="subject"
                class="my-2"
                :isValid.sync="isValid"
                placeholder=" موبایل خود را وارد کنید"
                v-model="mobileNumber"
                label="موبایل"
                v-if="isEdit"

              />
              <label  v-else> موبایل : <span> {{mobileNumber || '-'}}</span></label>

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
                v-if="isEdit"
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
                v-if="isEdit"
              />
              <label    v-if="!isEdit"> تاریخ تولد : <span>{{born || '-'}} </span></label>


            </div>
            <div class="field">

              <v-btn :loading="loading" class="submit-btn"  @click="saveProfile"    v-if="isEdit">
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

              <v-btn :loading="loading" class="submit-btn"  @click="isEdit = true" v-if="!isEdit">
                <div class="icon">
                  <SvgIcon
                    name="arrow"
                    color="#fff"
                    size="12px"
                    className="rounded-full"
                  />
                </div>
                <span>  ویرایش  </span>
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
