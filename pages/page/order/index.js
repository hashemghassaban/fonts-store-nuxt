import sidebar from '@/components/sidebarProfile'

export default {
  name: 'profile',
  head: {
    titleTemplate: '%s -فروشگاه اینترنتی شیرالات و تجهیزات ساختمانی',
    title: 'فعالیت ',
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: 'og:title',
      name: 'og:title',
      content: '    فعالیت   - فروشگاه اینترنتی شیرالات و تجهیزات ساختمانی',
    },
  ],
  components: {
    sidebar,
  },
  data: () => ({
    orders: [
      {
        text: 'لغو شده',
        icon: 'mdi-close-circle-outline',
        tab: 4,
        subject: 'canceledOrdersCount',
      },
      {
        text: 'جاری',
        icon: 'mdi-alert-circle-outline',
        tab: 0,
        subject: 'currentOrderProductsCounts',
      },
      {
        text: 'ارسال شده',
        icon: 'mdi-check-circle-outline',
        tab: 3,
        subject: 'deliveredOrdersCount',
      },
      {
        text: 'در انتظار پرداخت',
        icon: 'mdi-clock',
        tab: 1,
        subject: 'pendingPaymentOrdersCount',
      },
      {
        text: 'در حال آماده سازی',
        icon: 'mdi-timelapse',
        tab: 2,
        subject: 'inProgressOrdersCount',
      },
   

     
    ],
  }),
  methods: {
    sortObjectByKeys(obj) {
      let entries = Object.entries(obj)
      entries.sort((a, b) => a[0].localeCompare(b[0]))
      return Object.fromEntries(entries)
    },

    gotoLink(tab) {
      this.$router.push(`/profile/orders?tab=${tab} `)
    },
    async GetOrdersCounts() {
      await this.$store
        .dispatch('Order/GetCurrentUserOrdersCounts')
        .then((res) => {
          let data = res
          let sortedObj = this.sortObjectByKeys(data);
       
          this.orders = this.orders.map((order) => {
            return Object.assign(order, { amount: sortedObj[order.subject] })
          })
          this.orders = [...this.orders];
          // sort the array by the tab property in ascending order
          this.orders.sort((a, b) => a.tab - b.tab);
        })
    },
  },
  mounted() {
    this.GetOrdersCounts()
  },
}
