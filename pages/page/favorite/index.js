import SvgIcon from "@/components/SvgIcon/SvgIcon";
import sidebar from '@/components/sidebar/sidebar'
import { profileService  } from '~/services'


export default {
  name: 'profile',
  head: {
    titleTemplate: "",
    title: "پنل کاربری - لاینو تایپ",
    htmlAttrs: {
      lang: "fa",
    },
  },
  data: () => ({
    favourites:[],
    loading:false,

  }),
  components: {
    SvgIcon,
    sidebar
  },
  created() {
    this.getFavourites()
  },
  methods: {
    refreshData(newValue) {
      if(newValue ){
        this.getFavourites()
      }
    },
    async getFavourites() {
      this.loading = true
      try {
       let res = await profileService.getFavourites()
        this.loading = false
        this.favourites = res.entity
      } catch (error) {}
    },

  }

}
