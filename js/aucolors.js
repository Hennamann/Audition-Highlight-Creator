/*
 * Written by Ole Henrik Stabell - ole@henrikstabell.com
 * Licensed under the MIT License - https://opensource.org/licenses/MIT
 *
 * Changes CSS files and background colors depending on the color theme
 * used in Adobe Audition, requires the CSS files for each color variant to
 * be labeled as: "styles-<dark/darker>"
 * This script does not support the "unofficial" white UI for Audition.
 *
 */

var cs = new CSInterface();
console.log(cs);
var hostEnv = cs.getHostEnvironment();

document.addEventListener("DOMContentLoaded", function (event) {
    // Perform CSS updates based on users selections
    var appSkin = hostEnv.appSkinInfo.appBarBackgroundColor;

    console.log(appSkin.color.red + " " + appSkin.color.green + " " + appSkin.color.blue);
    var red = Math.round(appSkin.color.red);
    var green = Math.round(appSkin.color.green);
    var blue = Math.round(appSkin.color.blue);
    var colorRGB = "#" + red.toString(16) + green.toString(16) + blue.toString(16);

    document.body.style.background = colorRGB;

    // Check RGB color and swap css files depending on RGB value.
    if (appSkin.color.red == "74.9955") {
        swapCSS('dark');
    } else {
        swapCSS('darker');
    }

    // Listen to event for Themechanges in Audition.
    cs.addEventListener("com.adobe.csxs.events.ThemeColorChanged", themeChangedEventListener);

});

function themeChangedEventListener(event) {
    console.log('background color change detected.');
    changeThemeColor();
}

// Swaps the CSS file specified in the head of the current HTML document.
function swapCSS(cssfilename) {
    if ($("#ccstyleTheme").length)
        $("#ccstyleTheme").remove();
    var link = document.createElement('link');
    $("head").append('<link id="ccstyleTheme" href="css/styles-' +
        cssfilename + '.css" rel="stylesheet" type="text/css" />');
}

function changeThemeColor() {
    var hostEnv = cs.getHostEnvironment();
    var UIColorObj = new UIColor();

    UIColorObj = hostEnv.appSkinInfo.appBarBackgroundColor;
    var red = Math.round(UIColorObj.color.red);
    var green = Math.round(UIColorObj.color.green);
    var blue = Math.round(UIColorObj.color.blue);
    var alpha = Math.round(UIColorObj.color.alpha);
    var colorRGB = "#" + red.toString(16) + green.toString(16) + blue.toString(16);

    //document.body.style.background
    document.body.style.background = colorRGB;
    document.getElementById("index_body").style.opacity = alpha / 255;

    // Check RGB color and swap css files depending on RGB value.
    if (UIColorObj.color.red == "74.9955") {
        swapCSS('dark');
    } else {
        swapCSS('darker');
    }
}