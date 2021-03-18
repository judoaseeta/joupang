const colorList = [
    "color:#778beb; font-size: 11px;",
    "color:#B53471; font-size: 11px;",
    "color:#0652DD; font-size: 11px;",
    "color:#009432; font-size: 11px;",
    "color:#FFC312; font-size: 11px;",
    "color:#D980FA; font-size: 11px;",
    "color:#cd6133; font-size: 11px;",
];

const pickRandNum = () => Math.floor(Math.random() * 7);
const isSomeBrowser = (browserName)  => {
    return window.navigator.userAgent.toLowerCase().indexOf(browserName) > -1;
}


const royLog = (isColorSupportedBrowser) => {
    const plain = "  ______                     \
    \n / ___  \\    ____     __   __   \ \
    \n| |   | |  /  ___ \\  \\ \\  / / \ \
    \n| |___| /  | |  | |   \\    /  \
    \n| |   \\ \\  | |__| |    |  |  \
    \n| |    \\ \\ \\______/    |  | \
    \n|_|     \\ \\            |__|  "
    const colorful = "%c  ______                     \
    \n / ___  \\    ____     __   __   \ \
    \n%c| |   | |  /  ___ \\  \\ \\  / / \ \
    \n| |___| /  | |  | |  %c \\    /  \
    \n| |   \\ \\  | |__| |    |  |  \
    \n%c| |    \\ \\ \\______/    |  | \
    \n|_|     \\ \\            |__|  "
    if(isColorSupportedBrowser) {
        console.log(
            colorful,
            colorList[pickRandNum()],colorList[pickRandNum()],colorList[pickRandNum()],colorList[pickRandNum()])
    } else {
        console.log(plain);
    }
}
const choiLog = (isColorSupportedBrowser) => {
    const plain = " _____     __   __    ____     ___ \
    \n/ ___  \\  |  | |  | /  __  \\   | |  \
    \n| |  |_|  |  |_|  | | |  | |   | |  \
    \n| |   _   |   _   | | |__| |   | |  \
    \n\\ \\_ / |  |  | |  | \\______/   | | \
    \n \\_____/  |__| |__|            |_|"
    const colorful = "%c _____     __   __    ____     ___ \
    \n%c/ ___  \\  |  | |  | /  __  \\   | |  \
    \n| |  |_|  |  |_|  | | |  | |   | |  \
    \n%c| |   _   |   _   | | |__| |   | |  \
    \n%c\\ \\_ / |  |  | |  | \\______/   | | \
    \n \\_____/  |__| |__|            |_|"
    if(isColorSupportedBrowser) {
        console.log(
            colorful,
            colorList[pickRandNum()],colorList[pickRandNum()],colorList[pickRandNum()],colorList[pickRandNum()])
    } else {
        console.log(plain);
    }
}

const logAll = ({
    appName = "Joupang",
    sourceCodeSrc = 'https://github.com/judoaseeta/joupang',
    blogSrc = 'https://royroy.tech'
} = {}) => {
    royLog(isSomeBrowser('chrome')&& !isSomeBrowser('edge'));
    choiLog(isSomeBrowser('chrome')&& !isSomeBrowser('edge'));
    console.log('Are you interested in him??');
    console.log('How about visiting his blog?');
    console.log(`%c\x3e \x3e \x3e ${blogSrc}\n`, colorList[3]);
    console.log(`Now you see '${appName}'`);
    console.log('Do you wanna see the source code of this app?');
    console.log('Or Did you find anything to contribute for this app?');
    console.log('then...')
    console.log(`%c\x3e \x3e \x3e ${sourceCodeSrc}\n`, colorList[1]);
}

export default logAll;