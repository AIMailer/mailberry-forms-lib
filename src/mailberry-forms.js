
const FORMAT = {
  snippet: "snippet",
  popup: "popup",
  page: "page",
};

const FORM_POPUP_OPTIONS = {
  'immediately': "immediately",
  'after-10-seconds': "after-10-seconds",
  'after-30-seconds': "after-30-seconds",
  'at-30-percent-of-pageview': "at-30-percent-of-pageview"
}

const css =function({ headStyle, labelStyle, btnStyle, mainStyle, descriptionThanksMessageAndSignStyle }){
  return `
.MBheading {
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 400px;
  line-break: auto;
  text-align: center;
  font-size: ${headStyle.fontSize}px;
  font-family: ${headStyle.fontFamily};
  color: ${headStyle.color};
}

.MBdescription {
  line-height: 1.5;
  margin: 0;
  font-size: ${descriptionThanksMessageAndSignStyle.fontSize}px;
  font-family: ${descriptionThanksMessageAndSignStyle.fontFamily};
  color: ${descriptionThanksMessageAndSignStyle.color};
}

.MBdivider {
  padding: 1px 1px;
  border: none;
  margin: 1em 0;
  background-color: #ccc;
  cursor: auto;
}

.MBform-container {
  width: 400px;
  border-radius: 12px;
  background-color: ${mainStyle.formColor};
}

.MBform-builder-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  box-sizing: border-box;
  border-radius: 5px;
}

.MBform-builder-format-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}

.MBform-builder-format-popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.MBform-wrapper {
  width: 400px;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 10px;
  box-sizing: border-box;
}

.MBthank-you-wrapper {
  display: none;
  padding-bottom: 20px;
}

.MBthank-you-message {
  margin: 10px;
  text-align: center;
  font-size: ${descriptionThanksMessageAndSignStyle.fontSize}px;
  font-family: ${descriptionThanksMessageAndSignStyle.fontFamily};
  color: ${descriptionThanksMessageAndSignStyle.color};
}

.MBerror-wrapper {
  display: none;
  padding-bottom: 20px;
}

.MBerror-message {
  margin: 10px;
  text-align: center;
  font-size: ${descriptionThanksMessageAndSignStyle.fontSize}px;
  font-family: ${descriptionThanksMessageAndSignStyle.fontFamily};
  color: ${descriptionThanksMessageAndSignStyle.color};
}

.MBinput-wrapper {
  display: flex;
  flex-direction: column;
}

.MBinput {
  padding: 11px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
}

.Mailberry-checkbox-wrapper {
  display: flex;
  gap: 4px;
  align-items: center;
  margin-bottom: 5px;
}

.Mailberry-checkbox {
  width: 16px;
  height; 16px;
}

.MBbtn-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.MBbtn {
  padding: 8px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: ${btnStyle.fontSize}px;
  font-family: ${btnStyle.fontFamily};
  color: ${btnStyle.color};
  background-color: ${btnStyle.backgroundColor};
}

.MBsignature-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.MBpowered-by {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 8px;
  color: ${descriptionThanksMessageAndSignStyle.color || 'black'};
}

.MBsignature {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 8px;
  margin-left: 2px;
  text-decoration-color: ${descriptionThanksMessageAndSignStyle.color};
  color: ${descriptionThanksMessageAndSignStyle.color || 'black'};
}

.MBclose-btn {
  margin: 20px 0;
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  color: ${descriptionThanksMessageAndSignStyle.color || 'black'};
}

.MBspinner-wrapper {
  display: none;
  justify-content: center;
  items-content: center;
  padding-bottom: 30px;
}

.MBspinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 4px solid #cccccc;
  border-top-color: #999999;
  animation: MBspin-animation 1s linear infinite;
}

.MBoverlay {
  width: 100% !important;
  height: 100% !important;
  min-width: 100%;
  min-height: 100%;
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  background-color: rgba(0, 1, 5, 0.8);
}

.MBlabel {
  font-size: ${labelStyle.fontSize}px;
  font-family: ${labelStyle.fontFamily};
  color: ${labelStyle.color};
}

@keyframes MBspin-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes MBopacity-in {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}

@keyframes MBopacity-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.2;
  }
}
`}

export function init(_window, _document, formId, fields, text, href, style, signature) {
  // add styles
  var styletag = _document.createElement('style');
  styletag.type = 'text/css';
  styletag.innerHTML = css(style);

  // inject styles if not already injected
  if (!_document.getElementById('mailberry-forms-styles')) {
    _document.getElementsByTagName('head')[0].appendChild(styletag);
  }

  // inject content, styles and event to each form
  const mailberryForms = _document.querySelectorAll(`div[data-mailberry-form-id]`);

  mailberryForms.forEach((mailberryForm) => {
    const div = mailberryForm;
    const format = div.dataset.mailberryFormat;
    const showAt = div.dataset.mailberryPopupOption;
    const formHasLoaded = div.dataset.mailberryHasLoaded;
    if(formHasLoaded) return;

    const { header, description, thanksMessage, button } = text;
    const {  mainStyle } = style;

    //  ======== Form wrapper =========


    const formWrapper = _document.createElement('div');
    const formContainer = _document.createElement('div')
    formContainer.classList.add('MBform-container');
    formWrapper.classList.add('MBform-wrapper');

    //  ======== Header =========
    if(header){
      const heading = _document.createElement('p');
      heading.classList.add('MBheading');
      heading.innerHTML = header;

      formWrapper.appendChild(heading);
    }

    //  ======== Description =========

    if(description){
      const about = _document.createElement('p');
      about.classList.add('MBdescription');
      about.innerHTML = description;

      formWrapper.appendChild(about);

      const divider = _document.createElement('hr');
      divider.classList.add('MBdivider');
      formWrapper.appendChild(divider);
    }

    //  ======== Fields erros =========

    const fieldsErrors = _document.createElement('ul');
    fieldsErrors.style.color = 'red';
    fieldsErrors.style.display = 'none';
    fieldsErrors.style.fontSize = '14px';
    fieldsErrors.style.fontFamily = 'Arial';
    fieldsErrors.style.paddingLeft = '0';

    const emptyField = _document.createElement('li');
    emptyField.innerHTML = 'Please fill in all required fields';
    emptyField.style.display = 'none';

    const invalidEmail = _document.createElement('li');
    invalidEmail.innerHTML = 'Please enter a valid email address';
    invalidEmail.style.display = 'none';

    fieldsErrors.appendChild(invalidEmail);
    fieldsErrors.appendChild(emptyField);
    formWrapper.appendChild(fieldsErrors);

    //  ======== Fields =========

    const form = _document.createElement('form');

    for (const field of fields) {
      const inputWrapper = _document.createElement('div');
      if(field['type'] === 'checkbox') inputWrapper.classList.add('Mailberry-checkbox-wrapper');
      else inputWrapper.classList.add('MBinput-wrapper');

      const label = _document.createElement('label');
      label.classList.add('MBlabel')
      label.innerHTML = field['label'];
      if (field['type'] === 'checkbox') {
        label.htmlFor = field['label'];
      }

      if (field['required'] && field['type'] !== 'checkbox') {
        label.innerHTML += '*';
      }


      const input = _document.createElement('input');
      input.type = field['type'];
      input.name = field['label'];
      if(field['type'] === 'checkbox'){
        input.id = field['label'];
        input.classList.add('Mailberry-checkbox');
      }else {
        input.classList.add('MBinput');
      }

      if (field['required']) {
        input.required = true;
      }

      if(field['type'] === 'checkbox'){
        inputWrapper.appendChild(input);
        inputWrapper.appendChild(label);
      }else {
        inputWrapper.appendChild(label);
        inputWrapper.appendChild(input);
      }
      form.appendChild(inputWrapper);
    }

    //  ======== Loader when submit =========

    const loaderWrapper = _document.createElement('div');
    const spinner = _document.createElement('div')
    loaderWrapper.classList.add('MBform-wrapper');
    loaderWrapper.classList.add('MBspinner-wrapper');
    spinner.classList.add('MBspinner');
    loaderWrapper.appendChild(spinner);
    formContainer.appendChild(loaderWrapper);


    //  ======== Submit Button =========

    const btnWrapper = _document.createElement('div');
    btnWrapper.classList.add('MBbtn-wrapper');

    const btn = _document.createElement('button');
    btn.classList.add('MBbtn');
    btn.type = 'submit';
    btn.innerHTML = button;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let allFieldsFilled = true;

      const inputNodes=form.getElementsByTagName('INPUT')

      for (const field of fields) {
        if (field['required']) {

          let input
          for (let node of inputNodes){
            if(node.name===field['label']){
              input=node
              break
            }
          }

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

          let input
          for (let node of inputNodes){
            if(node.name===field['label']){
              input=node
              break
            }
          }
          formData[field['label'].toLowerCase()] = input.value;
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

            localStorage.removeItem(`closed_${formId}`);
            localStorage.setItem(`subscribed_${formId}`, Date.now());

          })
          .catch((err) => {
            errorWrapper.style.display = 'block';
            loaderWrapper.style.display = 'none';
          })
      }
    });

    btnWrapper.appendChild(btn);
    form.appendChild(btnWrapper);

    //  ======== Thanks you message =========

    const thankYouWrapper = _document.createElement('div');
    thankYouWrapper.classList.add('MBform-wrapper');
    thankYouWrapper.classList.add('MBthank-you-wrapper');

    const thankYouMessage = _document.createElement('p');
    thankYouMessage.innerHTML = thanksMessage;

    thankYouMessage.classList.add('MBthank-you-message');

    thankYouWrapper.appendChild(thankYouMessage);

    //  ======== Error message =========

    const errorWrapper = _document.createElement('div');
    errorWrapper.classList.add('MBform-wrapper');
    errorWrapper.classList.add('MBerror-wrapper');

    const errorMessage = _document.createElement('p');
    errorMessage.innerHTML =
      'Something went wrong.';

    errorMessage.classList.add('MBerror-message');

    errorWrapper.appendChild(errorMessage);

    //  ======== Mailberry Sign =========

    const signatureWrapper = _document.createElement('div');
    signatureWrapper.classList.add('MBsignature-wrapper');
    const signatureAnchor = _document.createElement('a');
    const poweredBy = _document.createElement('p');
    poweredBy.classList.add('MBpowered-by');
    const signatureContent = _document.createElement('p');
    signatureContent.classList.add('MBsignature');

    poweredBy.innerHTML = 'Powered by';
    signatureContent.innerHTML = 'MailBerry';

    signatureAnchor.href = 'https://mailberry.ai/?utm_source=Form&utm_medium=Mailberry&utm_campaign=CustomersAreFrom';
    signatureAnchor.target = '_blank';
    signatureAnchor.rel = 'noopener noreferrer';

    signatureAnchor.appendChild(signatureContent);

    signatureWrapper.appendChild(poweredBy);
    signatureWrapper.appendChild(signatureAnchor);

    //  ======== Overlay container, if used =========
    const overlayContainer = _document.createElement('div');
    overlayContainer.classList.add('MBoverlay')
    overlayContainer.style.zIndex = '9998';

    //  ======== Popup close button =========

    const closePopup = _document.createElement('p');
    closePopup.classList.add('MBclose-btn');
    closePopup.innerHTML = 'X';
    closePopup.addEventListener('click', () => {
      div.style.display = 'none';
      overlayContainer.style.zIndex = '-99999';
      overlayContainer.style.display = 'none'
      formContainer.style.animation = 'MBopacity-out 0.2s linear';

      const alreadySubscribed=localStorage.getItem(`subscribed_${formId}`)
      if(!alreadySubscribed){
        localStorage.setItem(`closed_${formId}`, Date.now());
      }
    });

    if(format === FORMAT['popup']){
      div.classList.add('MBform-builder-format-popup')
      formContainer.appendChild(closePopup)

      //  ======== At 30 percent of pageview =========
      if(showAt === FORM_POPUP_OPTIONS['at-30-percent-of-pageview']){
        function checkScrollPosition() {
          const percent = 0.3
          const scrollY = _window.scrollY;
          const fullHeight = _document.documentElement.scrollHeight;
          const windowHeight = _window.innerHeight;
          const thirtyPercentOfPageview = fullHeight * percent;

          // Checks if the user has scrolled at least 30% of the page
          if (scrollY + windowHeight >= thirtyPercentOfPageview) {
            formWrapper.appendChild(form);

            formContainer.appendChild(formWrapper);
            formContainer.appendChild(thankYouWrapper);
            if(signature)formWrapper.appendChild(signatureWrapper);
            formContainer.appendChild(errorWrapper);
            div.appendChild(formContainer)

            // we already have a div with an id so we need to append it at body element
            overlayContainer.appendChild(div);
            _document.body.appendChild(overlayContainer);
            formContainer.style.animation = 'MBopacity-in 0.4s linear';
            overlayContainer.style.cursor = 'pointer';
            formContainer.style.cursor = 'auto'

            overlayContainer.addEventListener('click', (e) => {
              if(event.target === overlayContainer){
                overlayContainer.style.zIndex = '-99999';
                overlayContainer.style.display = 'none'
                formContainer.style.animation = 'MBopacity-out 0.2s linear';
              }
            })

            fetch(href)

            // removing the event if the form it has already been called
            _window.removeEventListener('scroll', checkScrollPosition);
            return
          }
        }

        _window.addEventListener('scroll', checkScrollPosition);
        return
      }
      //  ======== With time =========
      else {
        let timer = 0;
        if(showAt === FORM_POPUP_OPTIONS['immediately']) timer = 0;
        if(showAt === FORM_POPUP_OPTIONS['after-10-seconds']) timer = 10;
        if(showAt === FORM_POPUP_OPTIONS['after-30-seconds']) timer = 30;

        const alreadySubscribed=localStorage.getItem(`subscribed_${formId}`)

        if(alreadySubscribed) return

        const lastClosed=localStorage.getItem(`closed_${formId}`)

        //30 days in miliseconds 2592000000
        if(!lastClosed|| Date.now()>parseInt(lastClosed) +2592000000 ){

          setTimeout(() => {
            formWrapper.appendChild(form);
    
            formContainer.appendChild(formWrapper);
            formContainer.appendChild(thankYouWrapper);
            if(signature)formWrapper.appendChild(signatureWrapper);
            formContainer.appendChild(errorWrapper);
            div.appendChild(formContainer)
    
            // we already have a div with an id so we need to append it at body element
            overlayContainer.appendChild(div);
            _document.body.appendChild(overlayContainer);
            formContainer.style.animation = 'MBopacity-in 0.4s linear';
            overlayContainer.style.cursor = 'pointer';
            formContainer.style.cursor = 'auto'
    
            overlayContainer.addEventListener('click', (e) => {
              if(event.target === overlayContainer){
                overlayContainer.style.zIndex = '-99999';
                overlayContainer.style.display = 'none';
                formContainer.style.animation = 'MBopacity-out 0.2s linear';
              }
            })
    
            fetch(href)
          }, timer * 1000);

        }

        return
      }
    }

    if(format === FORMAT['page']){
      _document.body.style.backgroundColor = mainStyle.pageColor
      _document.body.classList.add('MBform-builder-format-page')
      div.classList.add('MBform-builder-body')
    }


    formWrapper.appendChild(form);

    formContainer.appendChild(formWrapper);
    formContainer.appendChild(thankYouWrapper);
    if(signature)formWrapper.appendChild(signatureWrapper);
    formContainer.appendChild(errorWrapper);
    div.appendChild(formContainer)

    mailberryForm.dataset.mailberryHasLoaded = true;
    fetch(href);
  })
}


export function addStylesSheet(_document,href){
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;
  _document.getElementsByTagName('head')[0].appendChild(link);
}


