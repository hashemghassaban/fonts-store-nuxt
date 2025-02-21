

export default ({ store, $axios }, inject) => {
    const utils = {

        isEnglishNumber(str) {
            const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
            return str?.split?.('')?.every?.(a => numbers.includes(a))
        },
        convertToEnglishNumber(str) {
            if(this.isEnglishNumber(str)) return str
            const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
            const numbersMap = { '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9' }
            let result = []
            let chars = str?.split?.('') || []
            chars.map(char => {
                if (numbers.includes(char)) result.push(char)
                else if (typeof (numbersMap[char]) === 'string') result.push(numbersMap[char])
                else return 0;
            })
            return result.join('');
        }
    }

    inject('utils', utils)
}
