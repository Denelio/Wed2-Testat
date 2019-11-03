export function registerTimes(hbs) {
    hbs.registerHelper('times', function (n, block) {
        let accum = '';
        for (let i = 0; i < n; ++i) {
            accum += block.fn(i);
        }
        return accum;
    });
}

export function registerEqual(hbs) {
    hbs.registerHelper("equal", (a, b, options) => {
        "use strict";
        if (a === b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
}
