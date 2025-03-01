import SvgIcon from "@/components/SvgIcon/SvgIcon";

export default {
  name: 'TheFooter',
  components: {
    SvgIcon,

  },
  data: () => ({

  }),
  computed: {
    authenticate() {
      if (process.client) {
        return !!window.localStorage.getItem("token");
      }
    },

  },
}
