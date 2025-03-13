import SvgIcon from "@/components/SvgIcon/SvgIcon";
import sidebar from '@/components/sidebar/sidebar'
import { profileService , productService } from '~/services'


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
    page: 1,
    orders: [],
    loading:false,
    loadingBtn:false,
    search:'',
    selectId:'',
    expanded: [],
    headers: [
      {
        text: 'شناسه لایسنس',
        value: 'tracking_code',
      },

      {
        text: 'تاریخ سفارش',
        value: 'created_at',
      },
      {
        text: 'مبلغ (تومان)',
        value: 'payable',
      },
      {
        text: 'دانلود ',
        value: 'data-table-expand',
        width:120
      }
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
    formatPrice(value) {
      if(isNaN(value)) return  0
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async download(id) {
      this.selectId = id
      this.loadingBtn = true;
      try {
        let data = await productService.download(id)
        window.open(data?.entity?.link, '_blank');
        this.loadingBtn = false
      } catch (error) {
        this.$toast.error(error, {
          timeout: 4000,
        })
        this.loadingBtn = false
      }
    },

    async getOrders() {
      this.loading = true;
      try {
        let data = await profileService.getOrders()
        this.orders = data.entity
        this.loading = false
      } catch (error) {
        this.$toast.error(error, {
          timeout: 4000,
        })
      }
    },
  },

}
