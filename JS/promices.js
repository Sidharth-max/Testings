let age = 112;
let pr = new Promise((rs, rj) => {
    if (age >= 18) {
        rs("eligible for vote");
    } else {
        rj("not eligible for vote");
    }
});
pr.then((message) => {
    console.log(message);
}).catch((message) => {
    console.log(message);
});
