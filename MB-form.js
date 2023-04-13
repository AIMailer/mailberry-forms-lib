const FORMAT = {
  snippet: 'snippet',
  popup: 'popup',
  page: 'page',
};

async function init(formId, fields, text, href, style, format) {
  const div = document.getElementById(formId);

  const { header, description, thanksMessage, button } = text;
  const { headStyle, labelStyle, btnStyle, mainStyle, descriptionThanksMessageAndSignStyle } = style;

  //  ======== Form wrapper =========


  const formWrapper = document.createElement('div');
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
        formData[field['label']] = document.getElementsByName(
          field['label']
        )[0].value;
      }

      fetch('asdasd', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          formWrapper.style.display = 'none';
          thankYouWrapper.style.display = 'block';
        })
        .catch(() => {
          formWrapper.style.display = 'none';
          errorWrapper.style.display = 'block';
        });
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

  MBSingWrapper.href = 'https://mailberry.ai/';
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

  format === FORMAT['popup']
    ? (div.classList.add('form-builder-format-popup'),
      div.appendChild(closePopup))
    : null;

  format === FORMAT['page']
    ? ((document.body.style.backgroundColor = mainStyle.pageColor),

    // TODO: Check this clases 
      document.body.classList.add('form-builder-format-page'),
      div.classList.add('form-builder-body'))
    : null;

  formWrapper.style.backgroundColor = mainStyle.formColor
  formWrapper.appendChild(form);
  formWrapper.appendChild(singWrapper);
  div.appendChild(formWrapper);
  div.appendChild(thankYouWrapper);
  div.appendChild(errorWrapper);

  fetch(href);
}
