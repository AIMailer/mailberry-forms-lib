const FORMAT = {
  snippet: "snippet",
  popup: "popup",
  page: "page",
};

export function init(formId, fields, text, href, style, format) {
  // add styles
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `.preview {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.heading {
  margin-bottom: 20px;
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
  padding: 30px;
  margin-bottom: 10px;
  border-radius: 12px;
  background-color: white;
  box-sizing: border-box;
}

.thankYouText {
  margin: 10px;
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
  display: flex;
}

.powered-by {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 8px;
}

.MBSing {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 8px;
  margin-left: 2px;
}`;
  document.getElementsByTagName('head')[0].appendChild(style);

  // add form
  const div = document.getElementById(formId);
  const formWrapper = document.createElement("div");
  formWrapper.classList.add("form-wrapper");

  const { header, description, tankYouText, button } = text;
  const { headStyle, labelStyle, btnStyle, mainStyle, descriptionStyle } =
    style;

  const heading = document.createElement("p");
  heading.classList.add("heading");
  heading.innerHTML = header;
  heading.style.fontSize = headStyle.fontSize + "px";
  heading.style.fontFamily = headStyle.fontFamily;
  heading.style.color = headStyle.color;
  div.appendChild(heading);

    const about = document.createElement("p");
    about.classList.add("description");
    about.innerHTML = description;
    about.style.fontSize = descriptionStyle.fontSize + "px";
    about.style.fontFamily = descriptionStyle.fontFamily;
    about.style.color = descriptionStyle.color;
    formWrapper.appendChild(about);
  
    const divider = document.createElement("hr");
    divider.classList.add("divider");
    formWrapper.appendChild(divider);

  for (const field of fields) {
    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("input-wrapper");

    const label = document.createElement("label");
    label.innerHTML = field["label"];
    label.style.fontSize = labelStyle.fontSize + "px";
    label.style.fontFamily = labelStyle.fontFamily;
    label.style.color = labelStyle.color;
    inputWrapper.appendChild(label);
    
    const input = document.createElement("input");
    input.type = field["type"];
    input.name = field["label"];
    input.classList.add("input");
    inputWrapper.appendChild(input);

    formWrapper.appendChild(inputWrapper);
  }

  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("btn-wrapper");

  const btn = document.createElement("button");
  btn.classList.add("btn");

  btn.innerHTML = button;

  btn.addEventListener("click", () => {
    const formData = {};
    for (const field of fields) {
      formData[field["label"]] = document.getElementsByName(
        field["label"]
      )[0].value;
    }

    fetch(href, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });


  btn.style.fontSize = btnStyle.fontSize + "px";
  btn.style.fontFamily = btnStyle.fontFamily;
  btn.style.color = btnStyle.color;
  btn.style.backgroundColor = btnStyle.backgroundColor;

  btnWrapper.appendChild(btn);
  formWrapper.appendChild(btnWrapper);

  const singWrapper = document.createElement("div");
  singWrapper.classList.add("sing-wrapper");
  const MBSingWrapper = document.createElement("a");
  MBSingWrapper.classList.add("MBSing-wrapper");
  const poweredBy = document.createElement("p");
  poweredBy.classList.add("powered-by");
  const MBSing = document.createElement("p");
  MBSing.classList.add("MBSing");

  poweredBy.innerHTML = "Powered by";
  MBSing.innerHTML = "Mailberry";


  poweredBy.style.color = headStyle.color;
  MBSing.style.color = headStyle.color;
  
  MBSingWrapper.href = 'https://mailberry.ai/';
  MBSingWrapper.target = '_blank';
  MBSingWrapper.rel = 'noopener noreferrer';


  MBSingWrapper.appendChild(MBSing);

  singWrapper.appendChild(poweredBy);
  singWrapper.appendChild(MBSingWrapper);  
  
  format === FORMAT["popup"]
  ? ((div.classList.add("form-builder-format-popup")))
  : null;
  
  format === FORMAT['page']
  ? ((document.body.style.backgroundColor = mainStyle.backgroundColor),
  document.body.classList.add('form-builder-format-page'))
  : null;
  
  div.appendChild(formWrapper);
  div.appendChild(singWrapper);
  div.classList.add("form-builder-body");
  div.style.backgroundColor = mainStyle.backgroundColor;

  fetch(href);
}


