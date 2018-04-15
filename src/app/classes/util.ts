export class Util {

    static interpolate(string, params) {
        const names = Object.keys(params);
        const vals = Object.values(params);
        return new Function(...names, `return \`${string}\`;`)(...vals);
    }

    static isElectron() {
        return window && window.process && window.process.type;
    }

    static getFormatedDate() {
        const data = new Date();
        return `${data.getDay()}/${data.getMonth()}/${data.getFullYear()}`;
    }

}
