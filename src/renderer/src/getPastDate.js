export default function (x) {
    const res = [];
    const date = new Date();
    for (let i = 0; i < x; i ++) {
        res.push(date.toLocaleDateString());
        date.setDate(date.getDate() - 1);
    }
    res.reverse();
    res[res.length - 1] = '今天';
    return res;
}
