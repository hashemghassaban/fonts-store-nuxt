<template>
  <client-only>


    <section class="userManager">
      <div class="userManager-block">
        <div class="userManager-block__info">
          <sidebar class="desktopSileBar" @profile="profile" @avatarUrl="avatarUrl" :isCallService="isCallService"   />
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
                <sidebar @profile="profile" @avatarUrl="avatarUrl" :isCallService="isCallService"    />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <div class="userManager-block__content">
          <div class="userManager-title">
            <h2> اطلاعات کاربری</h2>
          </div>
          <div class="userManager-block__box" v-if="!loading">
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
              <div
                @click="showDatePicker = true"
                style="position: relative"
                class="clickable"
                @click.stop="showDatePicker = true"
                v-if="isEdit"
              >
                <v-menu
                  ref="shamsiMenu"
                  v-model="showDatePicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                  :nudge-right="10"
                  :nudge-bottom="10"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <TextInput
                      v-bind="attrs"
                      v-on="on"
                      :validators="shamsiValidators"
                      placeholder="تاریخ تولد خود را وارد کنید"
                      v-model="born"
                      :isValid.sync="isValid"
                      label="تاریخ تولد"
                      class="custom-input"
                      :width="'100%'"
                      id="fromtime"
                    />
                  </template>
                  <v-date-picker
                    v-model="internalDate"
                    :first-day-of-week="6"
                    locale="fa"
                    @input="handleDateSelect"
                  ></v-date-picker>
                </v-menu>
              </div>


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
