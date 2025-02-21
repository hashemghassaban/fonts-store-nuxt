<template>
  <div
    class="position-relative inline-flex-col form-text-input-container"
    :style="{ height, width, style }"
    :class="typeShape"

  >
    <div
      v-if="label"
      :class="{
        'form-text-input-label': true,
        'form-text-input-label--top': labelTop,
        'form-text-input-label--down': !labelTop,
      }"
    >
      {{ label }}
    </div>

    <input
      :placeholder="placeholder"
      class="form-text-input-input max-width-70vw"
      :type="inputType"
      :class="{ 'opacity-05': disabled }"
      :disabled="readonly || disabled"
      v-model="model"
      :style="{ width, height }"
      v-on:keyup.enter="$emit('enterPress')"
      v-on:keyup.up="$emit('arrowUp')"
      v-on:keyup.down="$emit('arrowDown')"
      v-on:keyup.escape="$emit('escapePress')"
      v-on:keyup="onKeyUp"
      v-on:blur="onBlur"
      v-if="!readonly"
      v-on:change="onChange"
    />

    <div v-if="readonly" class="form-text-input max-width-70vw width-300px">
      {{ value }}
    </div>

    <SvgIcon
      v-if="readonly"
      class="position-absolute top-0 left-0 ml-1 mt-1"

      icon="lock" size="md" color="#c8c8c8"
    />

    <div
      v-if="!disabled && error"
      class="error-field flex-row align-items-center mr-1 mt-1"
    >
      <SvgIcon   icon="warning" size="md" color="#c8c8c8"
      />
      <div class="ala-text-14 mr-1">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import ValidateMixin from "@/plugins/validate.js";
import SvgIcon from "@/components/SvgIcon/SvgIcon";

export default {
  mixins: [ValidateMixin],
  components: {
    SvgIcon,
  },
  props: {
    inputType: {
      type: String,
      default: "text",
    },
    typeShape: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "50px",
    },
    margin: {
      type: String,
      default: "",
    },
    padding: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: null,
      validated: false,
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    labelTop() {
      return this?.model?.length > 0 || this?.placeholder?.length > 0;
    },
    style() {
      let style = {};
      if (this.margin) style.margin = this.margin;
      if (this.padding) style.padding = this.padding;
      return style;
    },
  },
  methods: {
    onKeyUp(e) {
      this.$emit("keyupEvent", e.key);
    },
    onBlur() {
      this.validate();
    },
    onChange() {
      this.validate();
    },
    validate() {
      this.error = this.Validate(this.model);

      this.validated = true;
    },
    isValidFun() {
      this.validate();
      return !this.error;
    },
  },
  mounted() {
    if (this.model) this.validate();
  },
  watch: {
    model() {
      if (this.validated) this.validate();
    },
    error: {
      immediate: true,
      handler(value) {
        if (value) {
          this.$emit("update:isValid", false);
        } else {
          this.$emit("update:isValid", true);
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
.form-text-input-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  @include breakpoint(medium) {
    width: 400px;
  }

  .error-field {
    position: absolute;
    bottom: -21px;
    height: 18px;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0 !important;
    .ala-text-14 {
      font-size: 10px;
      color: #c82323;
      height: 20px;
      line-height: 20px;
    }
  }
}

.form-text-input-label {
  pointer-events: none;
  position: absolute;
  transition: all 0.2s;
}

.form-text-input-label--top {
  color: #607d8b;
  font-weight: bold;
  font-size: 12px;
  top: -9px;
  right: 12px;
  background-color: #fff;
  padding: 0 4px;
}

.form-text-input-label--down {
  font-size: 14px;
  font-weight: 500;
  color: #a8a8a8;
  top: 15px;
  right: 15px;
}

.form-text-input,
.form-text-input-input {
  border-radius: 10px;
  border: solid 2px #bebebe;
  background-color: #fff;
  padding: 10px 12px;
  font-weight: 500;
  font-size: 14px;
}
.flat {
  width: 100%;
  .form-text-input-input {
    border-radius: 100px;
    border: solid 2px #c5c5c5;
    background-color: #fff;
  }
}

.form-text-input {
  color: #32326e;
}

.form-text-input-input {
  height: 40px;
  color: #707070;
}

.form-text-input:hover,
.form-text-input:focus {
  border: solid 2px #5050a0;
}

.form-text-input::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  font-size: 16px;
  color: #607d8b;
  opacity: 1; /* Firefox */
  font-weight: 300;
}
.w-full {
  width: 100% !important;
}
</style>
