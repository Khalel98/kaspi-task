<template>
  <div class="custom-checkbox">
    <input id="status" type="checkbox" name="status" v-model="internalChecked" />
    <label for="status">
      <div class="status-switch" data-unchecked="Posts" data-checked="Photos"></div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    internalChecked: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.custom-checkbox {
  width: 100%;
  height: 50px;

  input#status {
    display: none;

    + label {
      height: 100%;
      width: 100%;

      > .status-switch {
        cursor: pointer;
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #f6f6f6;
        color: #bdbdbd;
        transition: all 0.5s ease;
        padding: 3px;
        border-radius: 100px;
        border: 1px solid #e8e8e8;

        &:before,
        &:after {
          border-radius: 100px;
          height: calc(100% - 6px);
          width: calc(50% - 3px);
          display: flex;
          align-items: center;
          position: absolute;
          justify-content: center;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        &:before {
          background-color: white;
          color: #40c253;
          left: 3px;
          z-index: 10;
          content: attr(data-unchecked);
        }

        &:after {
          right: 0;
          content: attr(data-checked);
        }
      }
    }

    &:checked + label > .status-switch {
      background-color: #f6f6f6;
      border-radius: 100px;

      &:after {
        left: 0;
        content: attr(data-unchecked);
      }

      &:before {
        color: #40c253;
        left: 50%;
        content: attr(data-checked);
      }
    }
  }
}
</style>
