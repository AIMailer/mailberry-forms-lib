const FORMAT = {
  snippet: "snippet",
  popup: "popup",
  page: "page",
};

async function init(formId, fields, text, href, style, format) {
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

  format === FORMAT["popup"]
    ? ((div.classList.add("form-builder-format-popup")))
    : null;

  format === FORMAT['page']
    ? ((document.body.style.backgroundColor = mainStyle.backgroundColor),
      document.body.classList.add('form-builder-format-page'))
    : null;

  div.appendChild(formWrapper);
  div.classList.add("form-builder-body");
  div.style.backgroundColor = mainStyle.backgroundColor;

  fetch(href);
}


