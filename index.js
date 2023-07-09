export async function trackUser(){
    return {
        ipAddress: await getIpAddress(),
        browser: getBrowserName(),
        browserVersion: getBrowserVersion(),
        operatingSystem: getOsName(),
        osVersion: getOsVersion(),
        dateTimeNow: getCurrentDate(),
    }
}


async function getIpAddress() {

    let message = "Cannot locate IP Address";
    let attemptCount = 1;
    const apiUrls = [
        'http://ip-api.com/json',
        'https://ipinfo.io/json',
        'https://api.ipify.org?format=json',
        'https://geolocation-db.com/json/',
        'https://ipapi.co/json/',
        'https://ifconfig.co/ip',
    ];

    for(let i = 0; i < apiUrls.length; i++){
        console.log(`${attemptCount} attempt in progress for ${apiUrls[i]}`)
        const ip = await tryApiRequest(apiUrls[i]);
        if(ip != null){
            message = ip;
            console.log(`${attemptCount} success!`)
            break;
        }else{
            console.log(`${attemptCount++} attempt failed`);
        }
    }

    console.log('final data',message);

    return message;
}

async function tryApiRequest(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        if(typeof data.ip !== "undefined"){
            console.log('returning data.pi');
            return data.ip;
        }
        else if(typeof data.IPv4 !=="undefined"){
            console.log('returning data.IPv4');
            return data.IPv4;
        }else if(typeof data.query !=="undefined"){
            console.log('returning data.query');
            return data.query;
        }else{
            console.log('returning all data');
            return data;
        }
    }catch(err){
        return null;
    }
}

function getBrowserName() {
    const userAgent = navigator.userAgent;

    if (userAgent.indexOf("Chrome") !== -1) {
        return "Google Chrome";
    } else if (userAgent.indexOf("Firefox") !== -1) {
        return "Mozilla Firefox";
    } else if (userAgent.indexOf("Safari") !== -1) {
        return "Apple Safari";
    } else if (userAgent.indexOf("Opera") !== -1) {
        return "Opera";
    } else if (userAgent.indexOf("Edge") !== -1) {
        return "Microsoft Edge";
    } else if (userAgent.indexOf("Trident") !== -1) {
        return "Internet Explorer";
    } else {
        return "Unknown Browser";
    }
}

function getBrowserVersion(){
    const userAgent = navigator.userAgent;
    const versionRegex = /(?:MSIE|Edge|Firefox|Chrome|Safari|Opera|Trident\/7\.0).*?([\d.]+)/;
    const match = userAgent.match(versionRegex);
    const browserVersion = match ? match[1] : "Unknown";
    return browserVersion;
}


function getOsName() {
    const userAgent = navigator.userAgent;

    if (userAgent.indexOf("Win") !== -1) {
        return "Windows";
    } else if (userAgent.indexOf("Mac") !== -1) {
        return "Mac OS";
    } else if (userAgent.indexOf("Linux") !== -1) {
        return "Linux";
    } else if (userAgent.indexOf("Android") !== -1) {
        return "Android";
    } else if (userAgent.indexOf("iOS") !== -1) {
        return "iOS";
    } else {
        return "Unknown OS";
    }
}


function getOsVersion() {
    const userAgent = navigator.userAgent;

    let osVersion = "Unknown";

    if (userAgent.indexOf("Win") !== -1) {
        const regex = /Windows NT (\d+\.\d+)/;
        const match = userAgent.match(regex);
        if (match && match[1]) {
            osVersion = match[1];
        }
    } else if (userAgent.indexOf("Mac") !== -1) {
        const regex = /Mac OS X (\d+[._]\d+[._]\d+)/;
        const match = userAgent.match(regex);
        if (match && match[1]) {
            osVersion = match[1].replace(/_/g, ".");
        }
    } else if (userAgent.indexOf("Linux") !== -1) {
        const regex = /Linux (x86_64|x86|armv\d+l)/;
        const match = userAgent.match(regex);
        if (match && match[1]) {
            osVersion = match[1];
        }
    } else if (userAgent.indexOf("Android") !== -1) {
        const regex = /Android (\d+(\.\d+)?)/;
        const match = userAgent.match(regex);
        if (match && match[1]) {
            osVersion = match[1];
        }
    } else if (userAgent.indexOf("iOS") !== -1) {
        const regex = /OS (\d+([_\s]\d+)?)/;
        const match = userAgent.match(regex);
        if (match && match[1]) {
            osVersion = match[1].replace(/_/g, ".");
        }
    }

    return osVersion;
}


function getCurrentDate() {
    const currentDate = new Date();
    // return currentDate.toISOString();
    return currentDate;
}
