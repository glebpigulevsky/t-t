window.URL = window.URL || window.webkitURL;

const nameBanner = document.querySelector('.name_banner');
const phoneBanner = document.querySelector('.phone_banner');
const fileBanner = document.querySelector('.input-file');
const commentBanner = document.querySelector('.comment_banner');

document.addEventListener('click', (e) => {
  if (e.target === document.querySelector('.inputButton')) {
    e.preventDefault();
    sendFormTelegram();
  }
});

async function sendFormTelegram() {
  const body = {
    name: nameBanner.value,
    phone: phoneBanner.value,
    comment: commentBanner.value,
    file: fileBanner.files[0],
  };
  try {
    console.log(body);
    const res = await axios.post('/', body);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}

// async function sendFormTelegram(){

//     let files = fileBanner.files;

//     let img = window.URL.createObjectURL(files[0]);

//     console.log(img);
//   const url = "https://api.telegram.org/bot1233667834:AAHz_bng0VaZaI8UxLH6QXHpBC8wU-04WIY/sendMessage?chat_id=-440657814&text=";
//   const text = "Заказ от: " + nameBanner.value + "%0AТелефон: " + phoneBanner.value + "%0AКомментарий: " + commentBanner.value;

//   let sendedUrl = url+text;
//   await fetch(sendedUrl);
//   nameBanner.value = '';
//   phoneBanner.value = '';
//   commentBanner.value = '';

// };

// fileBanner.addEventListener("change", async function(event) {
//     Когда происходит изменение элементов управления, значит появились новые файлы

//     var i = 0,
//         files = fileBanner.files,
//         len = files.length;
//     let img = window.URL.createObjectURL(files[0]);
//     img = img.slice(5, img.length);
//     console.log(img);
//     const urlFile = "https://api.telegram.org/file/bot1233667834:AAHz_bng0VaZaI8UxLH6QXHpBC8wU-04WIY/"
//     let sendedurlFile = urlFile+img;
//     const res = await fetch(sendedurlFile);
//     const data = await res.json();
//     console.log(data);

// }, false);
