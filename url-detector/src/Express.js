const express = require('express');
const axios = require('axios');
const whois = require('whois');
const app = express();

app.use(express.json());

app.post('/check-url', async (req, res) => {
  const { url } = req.body;

  // You can add your logic here to check SSL, domain age, and WHOIS info
  const result = await checkWebsiteSafety(url);

  res.json(result);
});

const checkWebsiteSafety = async (url) => {
  const sslStatus = await checkSSL(url);
  const domainAge = await getDomainAge(url);
  const whoisInfo = await getWhoisInfo(url);

  // Here you can use the data to classify the URL as safe or not
  return { sslStatus, domainAge, whoisInfo, safe: classifyURL(sslStatus, domainAge, whoisInfo) };
};

const checkSSL = async (url) => {
  try {
    const response = await axios.get(`https://api.ssllabs.com/api/v3/analyze?host=${url}`);
    return response.data.endpoints[0].grade;
  } catch (error) {
    return 'No SSL certificate found';
  }
};

const getDomainAge = async (url) => {
  return new Promise((resolve, reject) => {
    whois.lookup(url, (err, data) => {
      if (err) reject(err);
      const creationDate = data.match(/Creation Date: (.+)/);
      if (creationDate) {
        resolve(new Date() - new Date(creationDate[1]));
      } else {
        resolve('Unable to find domain age');
      }
    });
  });
};

const getWhoisInfo = async (url) => {
  return new Promise((resolve, reject) => {
    whois.lookup(url, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const classifyURL = (sslStatus, domainAge, whoisInfo) => {
  // Define classification rules based on SSL, domain age, and WHOIS info
  if (sslStatus === 'A' && domainAge < 5 * 365 * 24 * 60 * 60 * 1000) {
    return 'Safe';
  } else {
    return 'Not Safe';
  }
};

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
