module.exports = {
    plugins:{
        autoprefixer:{},
        "postcss-px-to-viewport":{
            viewportWidth: 375,
            viewportHeight:667,
            unitPrecision: 5,
            viewportUnit: "vw",
            selectorBlackList: ["ignore","tab-bar","tab-bar-item","tabbar"],
            minPixelValue: 1,
            mediaQuery: false
        }
    }
}