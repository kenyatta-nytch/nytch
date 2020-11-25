module.exports = {
  darkMode: 'class',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'archer-queen': "url('/assets/imgs/archer_queen.png')",
        'barbarian-king': "url('/assets/imgs/barbarian_king.png')",
        'heroes': "url('/assets/imgs/heroes.png')",
      })
    },
    scale: {
        '101': '1.01',
        '102': '1.02',
        '103': '1.03'
    }
  },
  variants: {},
  plugins: [],
}
