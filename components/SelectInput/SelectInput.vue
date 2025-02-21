<template>
  <div class="select-box" v-click-outside="rootClickOutside" :style="{ width, style }">
    <div>
      <!-- :validators="validators" -->
      <TextInput
        :placeholder="drop ? 'جستجو...' : placeholder"
        :readonly="readonly"
        :label="label"
        v-model="Search"
        :width="width"
        :disabled="disabled"
        @arrowUp="onArrowUp"
        @arrowDown="onArrowDown"
        @enterPress="onEnterPress"
        @escapePress="onEscapePress"
        @keyupEvent="onKeyupEvent"
        @click.native="open"
        ref="textInputRef"
      />

      <div
        v-if="!disabled && error && !drop"
        class="ala-animation-fade-in flex-row align-items-center mr-1 mt-1 error-field"
      >
        <SvgIcon name="warning" size="16px" fill="#c82323" />
        <div class="ala-text-14 mr-1">{{ error || "error" }}</div>
      </div>

      <div
        v-if="drop"
        class="form-select-input-drop-box ala-animation-fade-in max-width-70vw"
        :style="{ width }"
        :class="IS_NOT_ON_MOBILE ? 'form-select-input-drop-box--not-mobile' : 'mt-2'"
      >
        <div class="form-select-input-drop-list">
          <div
            class="form-select-input-drop-item ala-text-6"
            v-for="option of Options"
            :key="option[itemValue]"
            @click="setModel(option)"
            :class="{
              'form-select-input-drop-item--highlight': model == option[itemValue],
            }"
          >
            {{ option[itemText] }}
            <SvgIcon
              style="position: absolute; left: 12px; top: 11px"
              name="check"
              width="16px"
              height="16px"
              :fill="'#607d8b'"
              v-if="model == option[itemValue]"
            />
          </div>

          <div
            v-if="emptyState.text"
            :class="'flex-' + emptyState.direction"
            class="pa-8 align-items-center justify-content-center text-center"
          >
            <img
              src="@/assets/images/icons/noData.svg"
              alt="noData"
              width="43px"
              height="48px"
              v-if="emptyState.icon"
            />

            <div :class="'ala-text-' + emptyState.baseTextIndex">
              {{ emptyState.text }}
            </div>
          </div>
        </div>

        <div v-if="realPersonSelect || legalPersonSelect" class="flex-col pb-1 pr-1">
          <div class="ala-text-1 py-2 pr-1">نیاز به ثبت شخص جدید دارید؟</div>

          <div class="flex-row justify-content-space-between">
            <BaseButton v-if="realPersonSelect" add width="130px" round
              >شخص حقیقی</BaseButton
            >
            <BaseButton v-if="legalPersonSelect" add width="130px" round
              >شخص حقوقی</BaseButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TextInput from "@/components/TextInput/TextInput.vue";
import BaseButton from "@/components/BaseButton/BaseButton.vue";
import { matchFuzzy } from "@/utils/functional.utility.js";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import ResponsiveMixin from "@/utils/responsive.js";
import ValidateMixin from "@/plugins/validate.js";

export default {
  mixins: [ResponsiveMixin, ValidateMixin],
  props: {
    itemText: {
      type: String,
      default: "text",
    },
    itemValue: {
      type: String,
      default: "id",
    },
    placeholder: {
      type: String,
      default: "انتخاب از لیست",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "250px",
    },
    label: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number, Object],
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    width: {
      type: String,
      default: "250px",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    noDataMessage: {
      type: String,
      default: null,
    },
    realPersonSelect: {
      type: Boolean,
      default: false,
    },
    legalPersonSelect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: "",
      drop: false,
      highlight: null,
      error: null,
      onceOpen: false,
    };
  },
  methods: {
    validate() {
      if (!this.onceOpen) return;
      this.error = this.Validate(this.model);
    },
    setModel(option) {
      this.model = option[this.itemValue];
      this.$nextTick(() => this.close());
    },
    open() {
      this.onceOpen = true;
      this.drop = true;
    },
    close() {
      this.drop = false;
      this.search = "";
      this.validate();
    },
    onEscapePress() {
      this.$nextTick(() => this.close());
    },
    onKeyupEvent(e) {
      if (e === "Escape" || e === "Enter") return;
      this.$nextTick(() => this.open());
    },
    onArrowUp() {
      if (!this.highlight) {
        this.highlight = this?.Options?.[0]?.[this.itemValue] || null;
        return;
      }
      if (this?.Options?.length < 1) return;
      let index = this?.Options?.findIndex?.(
        (o) => o?.[this.itemValue] == this.highlight
      );
      if (index < 0) return;
      index -= 1;
      if (index < 0) index = 0;
      this.highlight = this?.Options?.[index]?.[this.itemValue];
    },
    onArrowDown() {
      if (!this.highlight) {
        this.highlight = this?.Options?.[0]?.[this.itemValue] || null;
        return;
      }
      if (this?.Options?.length < 1) return;
      let index = this?.Options?.findIndex?.(
        (o) => o?.[this.itemValue] == this.highlight
      );
      if (index < 0) return;
      index += 1;
      if (index > this?.Options?.length - 1) index = this?.Options?.length - 1;
      this.highlight = this?.Options?.[index]?.[this.itemValue];
    },
    onEnterPress() {
      if (this.isOpen && this.highlight) {
        this.model = this.highlight;
        this.$nextTick(() => this.close());
      } else if (!this.isOpen) {
        this.$nextTick(() => this.open());
      }
    },
    rootClickOutside() {
      this.close();
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.validate();
        this.$emit("input", value);
      },
    },
    Search: {
      get() {
        if (this.isOpen) return this.search;
        else
          return (
            this?.options?.find?.((o) => o?.[this.itemValue] == this.model)?.[
              this.itemText
            ] || ""
          );
      },
      set(value) {
        if (this.isOpen) this.search = value;
      },
    },
    Options() {
      if (!this.isOpen) return [];
      if (!this.search) return this.options;
      return this.options.filter((o) => matchFuzzy(o[this.itemText], this.search));
    },
    emptyState() {
      if (this.isLoading)
        return {
          text: "در حال بارگذاری...",
          icon: false,
          baseTextIndex: 2,
          direction: "row",
        };
      if (this?.options?.length <= 0)
        return {
          text: this.noDataMessage || "هنوز شخصی در سامانه تعریف نشده است!",
          icon: true,
          baseTextIndex: 2,
          direction: "col",
        };

      if (this?.Options?.length <= 0)
        return {
          text: "متاسفانه برای" + ` "${this.search}" ` + "نتیجه‌ای یافت نشد",
          icon: true,
          baseTextIndex: 5,
          direction: "row",
        };

      return {};
    },
    isLoading() {
      return false;
    },
    style() {
      return {};
    },
    isOpen() {
      return this.drop;
    },
  },
  watch: {
    model() {
      this.validate();
    },
    search(value) {
      if (value?.length > 0) {
        if (this?.Options?.length > 0) {
          if (!this.highlight) this.highlight = this?.Options?.[0]?.[this.itemValue];
        } else {
          this.highlight = null;
        }
      }
    },
    Options(list) {
      if (list?.length < 1) {
        this.highlight = null;
        return;
      }
      let index = list?.findIndex?.((o) => o?.[this.itemValue] == this.highlight);
      if (index < 0) this.highlight = list?.[0]?.[this.itemValue];
    },
    drop(drop) {
      if (!drop) this.validate();
    },
  },
  components: {
    TextInput,
    SvgIcon,
    BaseButton,
  },
};
</script>

<style scoped lang="scss">
.form-select-input-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  padding: 0;
}
.error-field {
  position: absolute;
  bottom: -33px;
  height: 25px;
  display: flex;
  align-items: flex-start;
  .ala-text-14 {
    font-size: 12px;
    color: #c82323;
  }
}
.form-select-input-drop-box--not-mobile {
  position: absolute;
  top: 46px;
  z-index: 100;
  border: solid 2px #707070;
}

.form-select-input-drop-box {
  height: auto;
  padding: 6px;
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  border: 2px solid #607d8b;
}

.form-select-input-drop-list {
  border-bottom: solid 1px #eaeef2;
  flex-grow: 2;
  overflow-y: auto;
  scrollbar-width: 6px;
  cursor: pointer;
  height: auto;
  max-height: 158px;
}

.form-select-input-drop-list::-webkit-scrollbar {
  width: 6px;
}

.form-select-input-drop-item {
  padding: 9px 6px;
  border-radius: 6px;
  position: relative;
  font-size: 14px;
  font-weight: 900;
}

.form-select-input-drop-item:hover {
  color: #6b7280 !important;
  background-color: #607d8b38;
}

.form-select-input-drop-item:active {
  background-color: #607d8b22;
}

.form-select-input-drop-item--highlight {
  background-color: #f5f5f5;
}

.form-select-input-drop-item--active {
  background-color: #32326e;
  color: #ffffff !important;
}
.select-box {
  position: relative;
  display: inline-block;
}
</style>
