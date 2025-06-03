const express = require('express');
const fs = require('fs');
const useragent = require('express-useragent');
const app = express();

app.use(useragent.express());

app.get('/', (req, res) => {
    const ua = req.headers['user-agent'];
    const source = req.useragent;
    let category = 'others';

    if (source.isAndroid) category = 'android';
    else if (source.isiPhone) category = 'iphone';
    else if (source.isDesktop) category = 'desktop';

    const data = `${ua} [${source.browser}]
`;

    fs.appendFileSync(`/tmp/${category}.txt`, data);

    res.redirect('https://declareddetect.com/hp2a67q4t?key=2bf6ae3ce8a4eac785ad953214351e62');
});

app.listen(3000);
