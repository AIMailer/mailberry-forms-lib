const FORMAT = {
  snippet: "snippet",
  popup: "popup",
  page: "page",
};

const css = `
.heading {
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
}

.thank-you-message {
  margin: 10px;
  text-align: center;
}

.error-wrapper {
  display: none;
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

.sing-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.powered-by {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 8px;
}

.MBSing {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 8px;
  margin-left: 2px;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 20;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
`
export function init(formId, fields, text, href, style, format,sing) {
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

  const singWrapper = document.createElement('div');
  singWrapper.classList.add('sing-wrapper');
  const MBSingWrapper = document.createElement('a');
  MBSingWrapper.classList.add('MBSing-wrapper');
  const poweredBy = document.createElement('p');
  poweredBy.classList.add('powered-by');
  const MBSing = document.createElement('p');
  MBSing.classList.add('MBSing');
  MBSingWrapper.style.textDecorationColor = descriptionThanksMessageAndSignStyle.color;

  poweredBy.innerHTML = 'Powered by';
  MBSing.innerHTML = 'MailBerry';

  poweredBy.style.color = descriptionThanksMessageAndSignStyle.color || 'black';
  MBSing.style.color = descriptionThanksMessageAndSignStyle.color || 'black';

  MBSingWrapper.href = 'https://mailberry.ai/?utm_source=Form&utm_medium=Mailberry&utm_campaign=CustomersAreFrom';
  MBSingWrapper.target = '_blank';
  MBSingWrapper.rel = 'noopener noreferrer';

  MBSingWrapper.appendChild(MBSing);

  singWrapper.appendChild(poweredBy);
  singWrapper.appendChild(MBSingWrapper);

  //  ======== Popup close button =========

  const closePopup = document.createElement('p');
  closePopup.classList.add('close-btn');
  closePopup.innerHTML = 'X';
  closePopup.addEventListener('click', () => {
    div.style.display = 'none';
  });

  if(format === FORMAT['popup']){
    div.classList.add('form-builder-format-popup')
    div.appendChild(closePopup)
    document.body.style.backgroundColor = mainStyle.pageColor
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
  if(sing)formWrapper.appendChild(singWrapper);
  formContainer.appendChild(errorWrapper);
  div.appendChild(formContainer)

  fetch(href);
}
