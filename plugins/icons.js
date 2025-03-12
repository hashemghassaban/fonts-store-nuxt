import Vue from 'vue';

export default ({ app }, inject) => {
  const getIcon = async (name) => {
    try {
      const [prefix, iconName] = name.split(':');

      if (prefix === 'custom') {
        const svgContent = await import(`~/assets/img/icon/${iconName}.svg?raw`);
        return svgContent.default;
      }

      return `<svg><use href="#${iconName}" /></svg>`;
    } catch (error) {
      this.$toast.error(error, {
        timeout: 4000,
      })
      return null;
    }
  };

  inject('getIcon', getIcon);
};
