
const FORMAT = {
  snippet: "snippet",
  popup: "popup",
  page: "page",
};

const POPUP_OPTIONS = {
  'immediately': "immediately",
  'after-10-seconds': "after-10-seconds",
  'after-30-seconds': "after-30-seconds",
  'at-30-percent-of-pageview': "at-30-percent-of-pageview"
}

const css = `
.heading {
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 400px;
  line-break: auto;
  text-align: center;
}

.description {
  line-height: 1.5;
  margin: 0;
}

.divider {
  padding: 1px 1px;
  border: none;
  margin: 1em 0;
  background-color: #ccc;
}

.form-container {
  width: 400px;
  border-radius: 12px;
}

.form-builder-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  box-sizing: border-box;
  border-radius: 5px;
}

.form-builder-format-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}

.form-builder-format-popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.form-wrapper {
  width: 400px;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 10px;
  box-sizing: border-box;
}

.thank-you-wrapper {
  display: none;
  padding-bottom: 20px;
}

.thank-you-message {
  margin: 10px;
  text-align: center;
}

.error-wrapper {
  display: none;
  padding-bottom: 20px;
}

.error-message {
  margin: 10px;
  text-align: center;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
}

.input {
  padding: 11px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
}

.btn-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.btn {
  padding: 8px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.signature-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.powered-by {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 8px;
}

.MBsignature {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 8px;
  margin-left: 2px;
}

.close-btn {
  margin: 20px 0;
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}

.loader-wrapper {
  display: none;
}

.spinner-wrapper {
  display: none;
  justify-content: center;
  items-content: center;
  padding-bottom: 30px;
}

.spinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 4px solid #727ef2;
  border-top-color: #4147f2;
  animation: spin 1s linear infinite;
}

.overlay {
  width: 100% !important;
  height: 100% !important;
  min-width: 100%;
  min-height: 100%;
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  background-color: rgba(0, 1, 5, 0.8);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes scale-in {
  from {
    transform: scale(0.1);
  }
  to {
    transform: scale(1);
  }
}

@keyframes scale-out {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.1);
  }
}
`
export function init(formId, fields, text, href, style, format, signature, showAt) {
  // add styles
  var styletag = document.createElement('style');
  styletag.type = 'text/css';
  styletag.innerHTML = css;
  document.getElementsByTagName('head')[0].appendChild(styletag);

  // add form
  const div = document.getElementById(formId);

  const { header, description, thanksMessage, button } = text;
  const { headStyle, labelStyle, btnStyle, mainStyle, descriptionThanksMessageAndSignStyle } = style;

  // Removing all padding and margin from body tag (some browsers gives this value by default)
  document.body.style.margin = 0;
  document.body.style.padding = 0;

  //  ======== Form wrapper =========


  const formWrapper = document.createElement('div');
  const formContainer = document.createElement('div')
  formContainer.classList.add('form-container');
  formWrapper.classList.add('form-wrapper');

  //  ======== Header =========
  if(header){
    const heading = document.createElement('p');
    heading.classList.add('heading');
    heading.innerHTML = header;
    heading.style.fontSize = headStyle.fontSize + 'px';
    heading.style.fontFamily = headStyle.fontFamily;
    heading.style.color = headStyle.color;
    formWrapper.appendChild(heading);
  }

  //  ======== Description =========

  if(description){
    const about = document.createElement('p');
    about.classList.add('description');
    about.innerHTML = description;
    about.style.fontSize = descriptionThanksMessageAndSignStyle.fontSize + 'px';
    about.style.fontFamily = descriptionThanksMessageAndSignStyle.fontFamily;
    about.style.color = descriptionThanksMessageAndSignStyle.color;
    formWrapper.appendChild(about);

    const divider = document.createElement('hr');
    divider.classList.add('divider');
    formWrapper.appendChild(divider);
  }

  //  ======== Fields erros =========

  const fieldsErrors = document.createElement('ul');
  fieldsErrors.style.color = 'red';
  fieldsErrors.style.display = 'none';
  fieldsErrors.style.fontSize = '14px';
  fieldsErrors.style.fontFamily = 'Arial';

  const emptyField = document.createElement('li');
  emptyField.innerHTML = 'Please fill in all required fields';
  emptyField.style.display = 'none';

  const invalidEmail = document.createElement('li');
  invalidEmail.innerHTML = 'Please enter a valid email address';
  invalidEmail.style.display = 'none';

  fieldsErrors.appendChild(invalidEmail);
  fieldsErrors.appendChild(emptyField);
  formWrapper.appendChild(fieldsErrors);

  //  ======== Filds =========

  const form = document.createElement('form');

  for (const field of fields) {
    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add('input-wrapper');

    const label = document.createElement('label');
    label.innerHTML = field['label'];
    label.style.fontSize = labelStyle.fontSize + 'px';
    label.style.fontFamily = labelStyle.fontFamily;
    label.style.color = labelStyle.color;

    if (field['required']) {
      label.innerHTML += '*';
    }

    inputWrapper.appendChild(label);

    const input = document.createElement('input');
    input.type = field['type'];
    input.name = field['label'];
    input.classList.add('input');

    if (field['required']) {
      input.required = true;
    }

    inputWrapper.appendChild(input);
    form.appendChild(inputWrapper);
  }

  //  ======== Loader when submit =========

  const loaderWrapper = document.createElement('div');
  const spinner = document.createElement('div')
  loaderWrapper.classList.add('form-wrapper');
  loaderWrapper.classList.add('spinner-wrapper');
  spinner.classList.add('spinner');
  loaderWrapper.appendChild(spinner);
  formContainer.appendChild(loaderWrapper);

  //  ======== Submit Button =========

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const btn = document.createElement('button');
  btn.classList.add('btn');
  btn.type = 'submit';
  btn.innerHTML = button;

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    let allFieldsFilled = true;

    for (const field of fields) {
      if (field['required']) {
        const input = document.getElementsByName(field['label'])[0];

        if (!input.value) {
          allFieldsFilled = false;
          input.style.border = '1px solid red';
          fieldsErrors.style.display = 'block';
          emptyField.style.display = 'block';
        } else if (
          input.type === 'email' &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
        ) {
          allFieldsFilled = false;
          input.style.border = '1px solid red';
          fieldsErrors.style.display = 'block';
          invalidEmail.style.display = 'block';
        } else {
          input.style.border = '1px solid #ccc';
        }
      }
    }

    if (allFieldsFilled) {
      fieldsErrors.style.display = 'none';
      const formData = {};
      for (const field of fields) {
        formData[field['label'].toLowerCase()] = document.getElementsByName(
          field['label']
        )[0].value;
      }

      loaderWrapper.style.display = 'flex'
      formWrapper.style.display = 'none';

      fetch(href, {
        method: 'POST',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          thankYouWrapper.style.display = 'block';
          loaderWrapper.style.display = 'none';
        })
        .catch((err) => {
          errorWrapper.style.display = 'block';
          loaderWrapper.style.display = 'none';
        })
    }
  });

  btn.style.fontSize = btnStyle.fontSize + 'px';
  btn.style.fontFamily = btnStyle.fontFamily;
  btn.style.color = btnStyle.color;
  btn.style.backgroundColor = btnStyle.backgroundColor;

  btnWrapper.appendChild(btn);
  form.appendChild(btnWrapper);

  //  ======== Thanks you message =========

  const thankYouWrapper = document.createElement('div');
  thankYouWrapper.classList.add('form-wrapper');
  thankYouWrapper.classList.add('thank-you-wrapper');

  const thankYouMessage = document.createElement('p');
  thankYouMessage.innerHTML = thanksMessage;

  thankYouMessage.classList.add('thank-you-message');

  thankYouMessage.style.fontSize = descriptionThanksMessageAndSignStyle.fontSize + 'px';
  thankYouMessage.style.fontFamily = descriptionThanksMessageAndSignStyle.fontFamily;
  thankYouMessage.style.color = descriptionThanksMessageAndSignStyle.color;

  thankYouWrapper.appendChild(thankYouMessage);

  //  ======== Error message =========

  const errorWrapper = document.createElement('div');
  errorWrapper.classList.add('form-wrapper');
  errorWrapper.classList.add('error-wrapper');

  const errorMessage = document.createElement('p');
  errorMessage.innerHTML =
    'Something went wrong.';

  errorMessage.classList.add('error-message');

  errorMessage.style.fontSize = descriptionThanksMessageAndSignStyle.fontSize + 'px';
  errorMessage.style.fontFamily = descriptionThanksMessageAndSignStyle.fontFamily;
  errorMessage.style.color = descriptionThanksMessageAndSignStyle.color;

  errorWrapper.appendChild(errorMessage);

  //  ======== Mailberry Sign =========

  const signatureWrapper = document.createElement('div');
  signatureWrapper.classList.add('signature-wrapper');
  const MBsignatureWrapper = document.createElement('a');
  MBsignatureWrapper.classList.add('MBsignature-wrapper');
  const poweredBy = document.createElement('p');
  poweredBy.classList.add('powered-by');
  const MBsignature = document.createElement('p');
  MBsignature.classList.add('MBsignature');
  MBsignatureWrapper.style.textDecorationColor = descriptionThanksMessageAndSignStyle.color;

  poweredBy.innerHTML = 'Powered by';
  MBsignature.innerHTML = 'MailBerry';

  poweredBy.style.color = descriptionThanksMessageAndSignStyle.color || 'black';
  MBsignature.style.color = descriptionThanksMessageAndSignStyle.color || 'black';

  MBsignatureWrapper.href = 'https://mailberry.ai/?utm_source=Form&utm_medium=Mailberry&utm_campaign=CustomersAreFrom';
  MBsignatureWrapper.target = '_blank';
  MBsignatureWrapper.rel = 'noopener noreferrer';

  MBsignatureWrapper.appendChild(MBsignature);

  signatureWrapper.appendChild(poweredBy);
  signatureWrapper.appendChild(MBsignatureWrapper);

  //  ======== Overlay container, if used =========
  const overlayContainer = document.createElement('div');
  overlayContainer.classList.add('overlay')
  overlayContainer.style.zIndex = '9998';

  //  ======== Popup close button =========

  const closePopup = document.createElement('p');
  closePopup.classList.add('close-btn');
  closePopup.innerHTML = 'X';
  closePopup.addEventListener('click', () => {
    div.style.display = 'none';
    overlayContainer.style.zIndex = '-99999';
    overlayContainer.style.display = 'none'
    formContainer.style.animation = 'scale-out 0.2s linear';
  });

  if(format === FORMAT['popup']){
    div.classList.add('form-builder-format-popup')
    formContainer.appendChild(closePopup)

    //  ======== At 30 percent of pageview =========
    if(showAt === POPUP_OPTIONS['at-30-percent-of-pageview']){
      function checkScrollPosition() {
        const percent = 0.3
        const scrollY = window.scrollY;
        const fullHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const thirtyPercentOfPageview = fullHeight * percent;

        // Checks if the user has scrolled at least 30% of the page
        if (scrollY + windowHeight >= thirtyPercentOfPageview) {
          formContainer.style.backgroundColor = mainStyle.formColor
          formWrapper.appendChild(form);

          formContainer.appendChild(formWrapper);
          formContainer.appendChild(thankYouWrapper);
          if(signature)formWrapper.appendChild(signatureWrapper);
          formContainer.appendChild(errorWrapper);
          div.appendChild(formContainer)

           // we already have a div with an id so we need to append it at body element
          overlayContainer.appendChild(div);
          document.body.appendChild(overlayContainer);
          formContainer.style.animation = 'scale-in 0.8s linear';
          overlayContainer.style.cursor = 'pointer';
          formContainer.style.cursor = 'auto'

          overlayContainer.addEventListener('click', (e) => {
            if(event.target === overlayContainer){
              overlayContainer.style.zIndex = '-99999';
              overlayContainer.style.display = 'none'
              formContainer.style.animation = 'scale-out 0.2s linear';
            }
          })

          fetch(href)

          // removing the event if the form it has already been called
          window.removeEventListener('scroll', checkScrollPosition);
          return
        }
      }

      window.addEventListener('scroll', checkScrollPosition)
      return
    }
    //  ======== With time =========
    else {
      let timer = 0
      if(showAt === POPUP_OPTIONS['immediately']) timer = 0;
      if(showAt === POPUP_OPTIONS['after-10-seconds']) timer = 10;
      if(showAt === POPUP_OPTIONS['after-30-seconds']) timer = 30;

      setTimeout(() => {
        formContainer.style.backgroundColor = mainStyle.formColor
        formWrapper.appendChild(form);

        formContainer.appendChild(formWrapper);
        formContainer.appendChild(thankYouWrapper);
        if(signature)formWrapper.appendChild(signatureWrapper);
        formContainer.appendChild(errorWrapper);
        div.appendChild(formContainer)

        // we already have a div with an id so we need to append it at body element
        overlayContainer.appendChild(div);
        document.body.appendChild(overlayContainer);
        formContainer.style.animation = 'scale-in 0.8s linear';
        overlayContainer.style.cursor = 'pointer';
        formContainer.style.cursor = 'auto'

        overlayContainer.addEventListener('click', (e) => {
          if(event.target === overlayContainer){
            overlayContainer.style.zIndex = '-99999';
            overlayContainer.style.display = 'none'
            formContainer.style.animation = 'scale-out 0.2s linear';
          }
        })

        fetch(href)
      }, timer * 1000);
      return
    }
  }

  if(format === FORMAT['page']){
    document.body.style.backgroundColor = mainStyle.pageColor
    document.body.classList.add('form-builder-format-page'),
    div.classList.add('form-builder-body')
  }

  formContainer.style.backgroundColor = mainStyle.formColor
  formWrapper.appendChild(form);

  formContainer.appendChild(formWrapper);
  formContainer.appendChild(thankYouWrapper);
  if(signature)formWrapper.appendChild(signatureWrapper);
  formContainer.appendChild(errorWrapper);
  div.appendChild(formContainer)

  fetch(href);
}
