const FORMAT = {
  snippet: "snippet",
  popup: "popup",
  page: "page",
};

function init(formId, fields, text, href, style, format) {
  console.log(fields);
  const div = document.getElementById(formId);

  const { header, description, tankYouText, button } = text;
  const { headStyle, labelStyle, btnStyle, mainStyle, descriptionStyle } =
    style;

  const heading = document.createElement("h2");
  heading.innerHTML = header;
  heading.style.fontSize = headStyle.fontSize + "px";
  heading.style.fontFamily = headStyle.fontFamily;
  heading.style.color = headStyle.color;
  div.appendChild(heading);

  const about = document.createElement("p");
  about.innerHTML = description;
  about.style.fontSize = descriptionStyle.fontSize + "px";
  about.style.fontFamily = descriptionStyle.fontFamily;
  about.style.color = descriptionStyle.color;
  div.appendChild(about);

  for (const field of fields) {
    const label = document.createElement("label");
    label.innerHTML = field["label"];
    label.style.fontSize = labelStyle.fontSize + "px";
    label.style.fontFamily = labelStyle.fontFamily;
    label.style.color = labelStyle.color;
    div.appendChild(label);
    const input = document.createElement("input");
    input.type = field["type"];
    input.name = field["label"];
    div.appendChild(input);

    div.appendChild(document.createElement("br"));
  }

  const btn = document.createElement("button");
  btn.innerHTML = button;
  btn.addEventListener("click", () => {
    const formData = {};
    for (const field of fields) {
      formData[field["label"]] = document.getElementsByName(
        field["label"]
      )[0].value;
    }
    console.log(formData);
    //window.location.href = href;
  });

  btn.style.fontSize = btnStyle.fontSize + "px";
  btn.style.fontFamily = btnStyle.fontFamily;
  btn.style.color = btnStyle.color;
  btn.style.backgroundColor = btnStyle.backgroundColor;
  div.appendChild(btn);

  format === FORMAT["popup"]
    ? ((div.style.transform = "translate(-50%, -50%)"),
      (div.style.top = "50%"),
      (div.style.left = "50%"),
      (div.style.zIndex = "9999"),
      (div.style.position = "absolute"))
    : null;

  format === FORMAT["page"]
    ? ((document.body.style.backgroundColor = "#CDE4E9"), 
      (document.body.style.display = "flex"),
      (document.body.style.flexDirection = "column"),
      (document.body.style.minHeight = "100vh"),
      (document.body.style.justifyContent = "center"),
      (document.body.style.alignItems = "center"))
    : null;

  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.width = "500px";
  div.style.padding = "50px";
  div.style.backgroundColor = mainStyle.backgroundColor;
}
