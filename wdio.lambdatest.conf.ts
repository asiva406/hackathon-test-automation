import * as fs from 'fs';
import * as path from 'path';

const secretsPath = path.resolve(__dirname, 'secrets.json');
const secrets = JSON.parse(fs.readFileSync(secretsPath, 'utf-8'));

export const config = {
    user: secrets.LambdaTest.user,
    key: secrets.LambdaTest.accessKey,
    services: ['lambdatest'],
    specs: [
        './appium/tests/*.feature'
    ],
    capabilities: [{
        "lt:options": {
        "platformName": "android",
        "deviceName": "Pixel 9",
        "platformVersion": "16",
        "app": "lt://APP10160211661757401183044333",
        "isRealMobile": true
        }
    }],
    hostname: 'hub.lambdatest.com',
    port: 443,
    path: '/wd/hub',
    protocol: 'https',
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./appium/step-definitions/*.ts'],
        timeout: 60000,
        // Add more options as needed
    },
}
