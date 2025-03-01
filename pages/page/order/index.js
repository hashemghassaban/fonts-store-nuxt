import SvgIcon from "@/components/SvgIcon/SvgIcon";
import sidebar from '@/components/sidebar/sidebar'
import { profileService  } from '~/services'


export default {
  name: 'profile',
  data: () => ({
    page: 1,
    orders: []

  }),
  components: {
    SvgIcon,
    sidebar
  },
  created() {
    this.getOrders()
  },
  methods: {
    async getOrders(search) {
      try {
        this.orders = await profileService.getOrders({ search })
      } catch (error) {}
    },
  },

}
