function isEmptyField(value) {
    var isEmpty = true;

    if (value){
        if (value.length > 0) {
            isEmpty = false;
        }
    }

    return isEmpty;
}

function isProjectPathFieldEmpty(value) {
    var isEmpty = true;
    var prompt = "Please choose a local path";

    if (value != prompt) {
        isEmpty = false;
    }

    return isEmpty;
}

function sortByProperty(property) {
    'use strict';
    return function (a, b) {
        var sortStatus = 0;
        if (a[property] < b[property]) {
            sortStatus = -1;
        } else if (a[property] > b[property]) {
            sortStatus = 1;
        }
        return sortStatus;
    }
}

function determineOperatingSystem() {
    // valid return values: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
    return process.platform;
}

function buildPathBasedOnOS(existingPath) {
    var path = existingPath;
    if (determineOperatingSystem() == 'win32') {
        path = existingPath.replace(/\//g,"\\");
    }
    return path;
}

function openIssueTracker() {
    shell.openExternal('https://github.com/phonegap/phonegap-app-desktop/issues?state=open');
}

function openTutorials() {
    shell.openExternal("https://github.com/phonegap/phonegap-app-desktop/wiki/PhoneGap-Desktop-Overview");
}

function openTermsOfUse() {
    shell.openExternal("http://www.adobe.com/legal/general-terms.html");
}

function openPrivacyPolicy() {
    shell.openExternal("http://www.adobe.com/privacy.html");
}

function parsePackageJSON() {
    var pathToPackageJSONFile = "package.json";

    fs.readFile(pathToPackageJSONFile, 'utf8', function(err, data) {
        if (err) {
            console.log("pathToPackageJSONFile not found");
        } else {
            console.log("pathToPackageJSONFile found");
            var obj = JSON.parse(data);
            global.debugMode = obj.window.toolbar;
            global.pgdVersion = obj.version;
        }

        trackAppOpened();
    });
}
