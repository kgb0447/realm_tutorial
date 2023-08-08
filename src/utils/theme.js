const { Appearance } = require("react-native");
const { colors, fonts } = require("../theme/darkmode");

const theme = Appearance.getColorScheme();

export const setTheme = () => {
    if(theme === 'dark') {
        return colors.primary
    } else {
        return
    }
}

export const setTextTheme = () => {
    if(theme === 'dark') {
        return fonts.primary_color
    } else {
        return
    }
}

