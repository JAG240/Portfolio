function ChangeTheme(isDark){
	document.documentElement.style.setProperty('--theme', isDark ? "#191919" : "#b5b5b5");
    document.documentElement.style.setProperty('--box-theme', isDark ? "#00000010" : "#FFFFFF10");
    document.documentElement.style.setProperty('--default-text-color', isDark ? "#000000" : "#FFFFFF");
    document.documentElement.style.setProperty('--passive-text-color', isDark ? "#696969" : "#B2B2B2");
}

export default ChangeTheme;