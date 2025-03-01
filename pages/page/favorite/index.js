import SvgIcon from "@/components/SvgIcon/SvgIcon";
import sidebar from '@/components/sidebar/sidebar'
import { profileService  } from '~/services'


export default {
  name: 'profile',
  data: () => ({
    page: 1,
    favourites:[]

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
      try {
       let res = await profileService.getFavourites()
        this.favourites = res.entity
      } catch (error) {}
    },

  }

}
