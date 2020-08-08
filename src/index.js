window.URL = window.URL || window.webkitURL;

const nameBanner = document.querySelector('.name_banner');
const phoneBanner = document.querySelector('.phone_banner');
const fileBanner = document.querySelector('.input-file');
const commentBanner = document.querySelector('.comment_banner');

const nameBannerAbout = document.querySelector('.name_banner_about_mobile');
const phoneBannerAbout = document.querySelector('.phone_banner_about_mobile');
const fileBannerAbout = document.querySelector('.input-file_about_mobile');
const commentBannerAbout = document.querySelector(
  '.comment_banner_about_mobile'
);

const nameBannerAboutScreen = document.querySelector(
  '.name_banner_about_screen'
);
const phoneBannerAboutScreen = document.querySelector(
  '.phone_banner_about_screen'
);

const fileInputAboutScreen = document.querySelector('.input-file_about_screen');
const commentBannerAboutScreen = document.querySelector(
  '.comment_banner_about_screen'
);

const closeModal = document.querySelector('.modal_close');
const closeErrorFromModal = document.querySelector('.error_form_close');
const errorInsertBlock = document.querySelector('.error_form_insert');

const errorMessage = {
  inputValuesEmpty: `<p>
  Пожалуйста, заполните все поля формы и приложите фото неисправности.
</p>`,
  fileType: `<p>
Пожалуйста, выберите файл формата jpg
</p>`,
  fileSize: `<p>
Пожалуйста, выберите файл меньшего размера(не более 2 мб)
</p>`,
};

document.addEventListener('click', async (e) => {
  if (e.target === document.querySelector('.input_button-contacts_mobile')) {
    e.preventDefault();
    if (phoneBannerAbout.value === '' || commentBannerAbout.value === '') {
      document.querySelector('.error_form').classList.remove('hidden');
      errorInsertBlock.innerHTML = errorMessage.inputValuesEmpty;
    } else if (fileBannerAbout.files[0].type !== 'image/jpeg') {
      document.querySelector('.error_form').classList.remove('hidden');
      errorInsertBlock.innerHTML = errorMessage.fileType;
    } else if (fileBannerAbout.files[0].size > 200000) {
      document.querySelector('.error_form').classList.remove('hidden');
      errorInsertBlock.innerHTML = errorMessage.fileSize;
    } else {
      const formD = new FormData();
      await formD.append('photo', fileBannerAbout.files[0]);
      await formD.append('name', nameBannerAbout.value);
      await formD.append('phone', phoneBannerAbout.value);
      await formD.append('comment', commentBannerAbout.value);
      sendFormTelegram(formD);
      nameBannerAbout.value = '';
      phoneBannerAbout.value = '';
      commentBannerAbout.value = '';
      fileBannerAbout.value = '';
    }
  }
});
document.addEventListener('click', async (e) => {
  if (e.target === document.querySelector('.input_button-contacts_screen')) {
    e.preventDefault();
    if (
      phoneBannerAboutScreen.value === '' ||
      commentBannerAboutScreen.value === ''
    ) {
      document.querySelector('.error_form').classList.remove('hidden');
      errorInsertBlock.innerHTML = errorMessage.inputValuesEmpty;
    } else if (fileInputAboutScreen.files[0].type !== 'image/jpeg') {
      document.querySelector('.error_form').classList.remove('hidden');
      errorInsertBlock.innerHTML = errorMessage.fileType;
    } else if (fileInputAboutScreen.files[0].size > 200000) {
      document.querySelector('.error_form').classList.remove('hidden');
      errorInsertBlock.innerHTML = errorMessage.fileSize;
    } else {
      const formD = new FormData();
      await formD.append('photo', fileInputAboutScreen.files[0]);
      await formD.append('name', nameBannerAboutScreen.value);
      await formD.append('phone', phoneBannerAboutScreen.value);
      await formD.append('comment', commentBannerAboutScreen.value);
      sendFormTelegram(formD);
      nameBannerAboutScreen.value = '';
      phoneBannerAboutScreen.value = '';
      commentBannerAboutScreen.value = '';
      fileInputAboutScreen.value = '';
    }
  }
});

document.addEventListener('click', async (e) => {
  if (e.target === document.querySelector('.inputButton')) {
    e.preventDefault();
    if (phoneBanner.value === '' && commentBanner.value === '') {
      document.querySelector('.error_form').classList.remove('hidden');
      errorInsertBlock.innerHTML = errorMessage.inputValuesEmpty;
    } else if (fileBanner.files[0].type !== 'image/jpeg') {
      document.querySelector('.error_form').classList.remove('hidden');
      errorInsertBlock.innerHTML = errorMessage.fileType;
    } else if (fileBanner.files[0].size > 200000) {
      document.querySelector('.error_form').classList.remove('hidden');
      errorInsertBlock.innerHTML = errorMessage.fileSize;
    } else {
      console.log(fileBanner.files[0]);
      const formD = new FormData();
      await formD.append('photo', fileBanner.files[0]);
      await formD.append('name', nameBanner.value);
      await formD.append('phone', phoneBanner.value);
      await formD.append('comment', commentBanner.value);
      sendFormTelegram(formD);
      nameBanner.value = '';
      phoneBanner.value = '';
      commentBanner.value = '';
      fileBanner.value = '';
    }
  }
});

async function sendFormTelegram(form) {
  try {
    // const res = await axios.post('/', form);
    // console.log(res.data);

    // const url =
    //   'https://api.telegram.org/bot1233667834:AAHz_bng0VaZaI8UxLH6QXHpBC8wU-04WIY/sendMessage?chat_id=-440657814&text=';
    // const text =
    //   'Заказ от: ' +
    //   res.data.name +
    //   '%0AТелефон: ' +
    //   res.data.phone +
    //   '%0AКомментарий: ' +
    //   res.data.text;
    // let sendedUrl = url + text;
    // await fetch(sendedUrl);
    // const photoLink =
    //   'https://api.telegram.org/bot1233667834:AAHz_bng0VaZaI8UxLH6QXHpBC8wU-04WIY/sendPhoto?chat_id=-440657814&photo=';
    // await fetch(photoLink + res.data.postImage);
    openModal();
  } catch (err) {
    console.log(err);
  }
}

function addModal() {
  let modalDiv = document.querySelector('.modal__overlay');
}

function openModal() {
  document.querySelector('.modal__overlay').classList.remove('hidden');
}

closeModal.addEventListener('click', () => {
  document.querySelector('.modal__overlay').classList.add('hidden');
});
closeErrorFromModal.addEventListener('click', () => {
  document.querySelector('.error_form').classList.add('hidden');
  errorInsertBlock.innerHTML = '';
});
