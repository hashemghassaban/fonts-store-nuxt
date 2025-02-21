import SvgIcon from "@/components/SvgIcon/SvgIcon";
import sidebar from '@/components/sidebar/sidebar'
import TextInput from "@/components/TextInput/TextInput";


export default {
  name: 'wallet',
  data: () => ({
    amounts: [{
      name:'10000 ت',value:10000
    },
      {
        name:'20000 ت',value:20000
      }
      ,{
        name:'30000 ت',value:30000
      }
      ,{
        name:'40000 ت',value:40000
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
    handleButtonClick(index) {
      this.activeButton = index;
      this.selectedAmount = this.amounts[index].value;

      // غیرفعال کردن ورودی اگر آخرین دکمه نباشد
      if (index === 5) {
        setTimeout(() => {
          this.selectedAmount = '';
        }, 100);
      }
    }

  }

}
