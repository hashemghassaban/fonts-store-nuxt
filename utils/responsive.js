
export default {
    data() {
        let MATCH_MEDIA = window.matchMedia(' only screen and (min-width: 768px) ')
        return {
            MATCH_MEDIA,
            IS_ON_MOBILE: !MATCH_MEDIA.matches,
            MATCH_MEDIA_HANDLER: null,
        }
    },
    computed:{
        IS_NOT_ON_MOBILE(){ return !this.IS_ON_MOBILE }
    },
    mounted() {
        this.MATCH_MEDIA_HANDLER = () => {
            this.IS_ON_MOBILE = !this.MATCH_MEDIA.matches;
        }
        this.MATCH_MEDIA?.addEventListener?.('change', this.MATCH_MEDIA_HANDLER)
    },
    beforeUnmount(){
        this.MATCH_MEDIA?.removeEventListener('change',this.MATCH_MEDIA_HANDLER)
    },
    beforeDestroy() {
        this.MATCH_MEDIA?.removeEventListener('change',this.MATCH_MEDIA_HANDLER)
    },
}
