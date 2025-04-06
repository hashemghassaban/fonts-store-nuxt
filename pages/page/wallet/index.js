import SvgIcon from "@/components/SvgIcon/SvgIcon";
import sidebar from '@/components/sidebar/sidebar'
import TextInput from "@/components/TextInput/TextInput";
import { profileService  } from '~/services'


export default {
  name: 'wallet',
  head: {
    titleTemplate: "",
    title: "افزایش اعتبار - لاینو تایپ",
    htmlAttrs: {
      lang: "fa",
    },

  },
  data: () => ({
    transactions:null,
    last:null,
    paymentGateway:null,
    amounts: [{
      name:'150.000 ت',value:150000
    },
      {
        name:'300.000 ت',value:300000
      }
      ,{
        name:'600.000 ت',value:600000
      }
      ,{
        name:'1.000.000 ت',value:1000000
      }
      ,{
        name:'مبلغ دلخواه',value:''
      }],
    gateways: [
      { id: 1, name: 'زرین پال' , url:'zarinpall' },
    ],
    activeButton: null,
    selectedGateway: 1,
    selectedAmount: ''

  }),
  components: {
    SvgIcon,
    sidebar,
    TextInput
  },
  computed: {

    isValidForm() {
      return this.selectedGateway &&
        (this.activeButton !== null ||
          (this.activeButton === this.amounts.length - 1 &&
            this.selectedAmount > 0));
    },
  },
  methods: {
    formatPrice(value) {
      if(isNaN(value)) return  0
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    handleButtonClick(index) {
      this.activeButton = index;
      this.selectedAmount = this.amounts[index].value;

      // غیرفعال کردن ورودی اگر آخرین دکمه نباشد
      if (index === 5) {
        setTimeout(() => {
          this.selectedAmount = '';
        }, 100);
      }
    },
    async getData() {
      let data = await profileService.getWallets()
      this.transactions = data?.entity
      if(this.transactions[0])
        this.last = this.transactions[0].cumulative_sum

    },
    async getPaymentGateway() {
      let data = await profileService.getPaymentGateway()
      this.paymentGateway = data?.entity


    },
    async chargeWallet(){
      let body = {
          "payment_method_id": this.selectedGateway,
          "price":parseInt(this.selectedAmount)
        }
      try {
        location.href = (
          await profileService.chargeWallet(
            body
          )
        ).action
      }catch (e) {
        console.log(e)
        this.$toast.error(e, {
          timeout: 4000,
        })
      }

    }
  },
  mounted() {
    this.getData()
    this.getPaymentGateway()
  },


}
