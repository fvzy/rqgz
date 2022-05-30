const request = require("request");
const TikTokScraper = require('tiktok-scraper');
const cheerio = require('cheerio')
const formData = require('form-data')
const fetch = require('node-fetch')

function otakuDesuOngoing() {
  return new Promise((resolve, reject) => {
    fetch('https://otakudesu.moe/ongoing-anime', {
      method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (Linux; Android 9; Redmi 7A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
      }
    })
    .then(rsp => rsp.text())
    .then((data) => {
      const $ = cheerio.load(data)
      const result = []
      $('.venz > ul > li > .detpost').each(function() {
        result.push({
          title: $(this).find('h2.jdlflm').text(),
          thumb: $(this).find('.thumbz > img').attr('src'),
          episode: $(this).find('.epz').text().trim(),
          every: $(this).find('.epztipe').text().trim(),
          last_release: $(this).find('.newnime').text(),
          url: $(this).find('.thumb > a').attr('href')
        })
      })
      resolve({
        status: 200,
        result: result
      })
    })
    .catch(reject)
  })
}

function tebakGambar() {
  return new Promise((resolve, reject) => {
    const baseUrl = 'https://jawabantebakgambar.net'
    fetch(baseUrl + '/all-answers/', {
      method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (Linux; Android 9; Redmi 7A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
      }
    })
    .then(rsp => rsp.text())
    .then((data) => {
      const $ = cheerio.load(data)
      const result = []
      $('ul.images > li > a').each(function() {
        result.push({
          image: baseUrl + $(this).find('img').attr('data-src'),
          answer: $(this).find('span').text()
        })
      })
      const random = result[Math.floor(Math.random() * result.length)]
      resolve({
        status: 200,
        result: random
      })
    })
    .catch(reject)
  })
}

function tiktokDown(url) {
  return new Promise((resolve, reject) => {
    const baseUrl = 'https://musicaldown.com'
    fetch(baseUrl, {
      method: 'GET',
      headers: {
        'cookie': '_ga=GA1.2.688739287.1629705556; session_data=9870dd1869284d4b242c75054922ca80; _gid=GA1.2.879595532.1630422474; _gat_gtag_UA_197840056_1=1; __gads=ID=4762a0dcb9efc7df-224881c43bcb0053:T=1629705557:RT=1630422562:S=ALNI_MbtviOkS9FNAff0DmsmPc0mMGs08w',
        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
      }
    })
    .then(rsp => rsp.text())
    .then((data) => {
      const $ = cheerio.load(data)
      const action = $('form').attr('action')
      const urlName = $('form > div > div > input').eq(0).attr('name')
      const tokenName = $('form > div > div > input').eq(1).attr('name')
      const tokenValue = $('form > div > div > input').eq(1).attr('value')
      const bodyForm = new formData()
      bodyForm.append(urlName, url)
      bodyForm.append(tokenName, tokenValue)
      bodyForm.append('verify', 1)
      fetch(baseUrl + action, {
        method: 'POST',
        body: bodyForm,
        headers: {
          'cookie': '_ga=GA1.2.688739287.1629705556; session_data=9870dd1869284d4b242c75054922ca80; _gid=GA1.2.879595532.1630422474; _gat_gtag_UA_197840056_1=1; __gads=ID=4762a0dcb9efc7df-224881c43bcb0053:T=1629705557:RT=1630422562:S=ALNI_MbtviOkS9FNAff0DmsmPc0mMGs08w',
          'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
        }
      })
      .then(rsp => rsp.text())
      .then((data) => {
        const $$ = cheerio.load(data)
        const action2 = $$('form').attr('action')
        fetch(baseUrl + action2, {
          method: 'GET',
          headers: {
            'cookie': '_ga=GA1.2.688739287.1629705556; session_data=9870dd1869284d4b242c75054922ca80; _gid=GA1.2.879595532.1630422474; _gat_gtag_UA_197840056_1=1; __gads=ID=4762a0dcb9efc7df-224881c43bcb0053:T=1629705557:RT=1630422562:S=ALNI_MbtviOkS9FNAff0DmsmPc0mMGs08w',
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
          }
        })
        .then(rsp => rsp.text())
        .then((data) => {
          const $$$ = cheerio.load(data)
          resolve({
            status: 200,
            result: {
              thumb: $$('.welcome.section > .container > .row > .col.s12.l4 > img').attr('src'),
              mp4: {
                server_1: $$('.welcome.section > .container > .row > .col.s12.l8 > a').eq(0).attr('href'),
                server_2: $$('.welcome.section > .container > .row > .col.s12.l8 > a').eq(1).attr('href'),
                direct_link: $$('.welcome.section > .container > .row > .col.s12.l8 > a').eq(2).attr('href'),
                qr: $$('.welcome.section > .container > .row > .col.s12.l8 > p > img').attr('src')
              },
              mp3: {
                preview: $$$('.welcome.section > .container > .row > .col.s12.l4 > audio > source').attr('src'),
                server_1: $$$('.welcome.section > .container > .row > .col.s12.l8 > a').eq(0).attr('href'),
                server_2: $$$('.welcome.section > .container > .row > .col.s12.l8 > a').eq(1).attr('href'),
                direct_link: $$$('.welcome.section > .container > .row > .col.s12.l8 > a').eq(2).attr('href'),
                qr: $$$('.welcome.section > .container > .row > .col.s12.l8 > p > img').attr('src')
              }
            }
          })
        })
        .catch(reject)
      })
      .catch(reject)
    })
    .catch(reject)
  })
}

function igStory(username) {
  return new Promise((resolve, reject) => {
    const baseUrl = 'https://igmp4.com'
    fetch(baseUrl + '/download-stories.php', {
      method: 'GET',
      headers: {
        'cookie': 'PHPSESSID=ccb3ar0ul5jiu3knt2rh7pv4g4',
        'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
      }
    })
    .then(rsp => rsp.text())
    .then((data) => {
      const $ = cheerio.load(data)
      const token = $('input[name="token"]').attr('value')
      const bodyForm = new formData()
      bodyForm.append('url', 'https://www.instagram.com/' + username)
      bodyForm.append('action', 'story')
      bodyForm.append('token', token)
      bodyForm.append('json', '')
      fetch(baseUrl + '/system/action.php', {
        method: 'POST',
        body: bodyForm,
        headers: {
          'cookie': 'PHPSESSID=ccb3ar0ul5jiu3knt2rh7pv4g4',
          'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
        }
      })
      .then(v => v.json())
      .then((data) => {
        resolve({
          status: 200,
          result: data.medias
        })
      })
      .catch(reject)
    })
    .catch(reject)
  })
}

async function whois(domain = 'caranya.my.id') {
  return new Promise((resolve, reject) => {
    var options = { 
      method: 'POST',
      url: 'https://www.hostinger.co.id/whois',
      headers: { 
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: { 
        domain: `${domain}`, 
        submit: 'search' 
      }
    };

    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body);
      resolve({
        result: result["domain"]
      });
    });
  });
}

function random(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function strong() {
    var string = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZabcdefgijklmnopqrstuvwxyz`~!@#$%^&*()_+=";
    var ranInt = random(0,string.length - 1);
    return string[ranInt];
}

function memorable() {
    var string = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZabcdefgijklmnopqrstuvwxyz";
    var ranInt = random(0,string.length - 1);
    return string[ranInt];
}

function strongPass(x){
    var ranPass = "";
    if(x != null){
        for(var i=0; i < x.length; i++){
            var rx = x[i];
            ranPass += rx == "x" ? strong() : rx;
        }
    }
    return ranPass;
}

function memorablePass(x){
    var ranPass = "";
    if(x != null){
        for(var i=0; i < x.length; i++){
            var rx = x[i];
            ranPass += rx == "x" ? memorable() : rx;
        }
    }
    return ranPass;
}

function genPassword() {
    return new Promise((resolve, reject) => {
        const low = memorablePass("xxxxxxxx")
        const medium = memorablePass("xxxxxxxxxxxx")
        const strong = strongPass("xxxxxxxxxxxxxxxx")
        const verStrong = strongPass("xxxxxxxxxxxxxxxxxxxxxxxx")
        const res = {
            low: low,
            medium: medium,
            strong: strong,
            verStrong: verStrong
        }
        resolve(res)
    })
}

const TiktokStalk = (username) => new Promise((resolve, reject) => {
  if (url === 'undefined') { reject('masukan text nya kak.') }
  try {
  TiktokData(username).then(data => {
    resolve(data);
  });
  } catch (error) {
      reject({
    code:400,
    message: error
  });
  }
})


async function TiktokData(url) {
	const videoMeta = await TikTokScraper.getVideoMeta(url);
    return ({
		Status: 200,
    result: {
    Id: videoMeta.collector[0].id,
    CreateTime: videoMeta.collector[0].createTime,
		Judul: videoMeta.collector[0].text,
    Thumb: videoMeta.collector[0].imageUrl,
		WithWM: videoMeta.collector[0].videoUrl,
    }
  });
}


const Tiktok = (url) => new Promise((resolve, reject) => {
    if (url === 'undefined') { reject('masukan text nya kak.') }
    try {
		TiktokData(url).then(data => {
			resolve(data);
		});
    } catch (error) {
        reject({
			code:400,
			message: error
		});
    }
})


module.exports = {
  whois,
  Tiktok,
  tiktokDown,
  otakuDesuOngoing,
  tebakGambar,
  TiktokStalk,
  igStory,
  genPassword
};