import SvgIcon from "@/components/SvgIcon/SvgIcon";
import sidebar from '@/components/sidebar/sidebar'
import { profileService  } from '~/services'


export default {
  name: 'profile',
  data: () => ({
    page: 1,
    orders: [],
    loading:false,
    search:'',
    headers: [
      {
        text: 'نام و نام خانوادگی',
        value: 'full_name',
      },
      {
        text: 'شناسه سفارش',
        value: 'tracking_code',
      },
      {
        text: 'وضعیت سفارش',
        value: 'status_text',
      },
      {
        text: ' شیوه ارسال',
        value: 'payment_method',
      },

    ],

  }),
  components: {
    SvgIcon,
    sidebar
  },
  created() {
    this.getOrders()
  },
  methods: {
    async getOrders() {
      try {
        let data = await profileService.getOrders()
        this.orders = data.entity
      } catch (error) {}
    },
  },

}
