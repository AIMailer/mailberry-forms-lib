function init(formId,fields,text, href, style,format) {
  const div = document.getElementById(formId);
  const {heading:head,description,tankYouText,btnText}=text
  const {headStyle,fieldStyle,btnStyle,generalStyle}=style
  
  const heading = document.createElement("h2");
  heading.innerHTML = head;
  heading.style.fontSize = headStyle.fontSize+"px";
  heading.style.fontFamily = headStyle.fontFamily;
  heading.style.color = headStyle.fontColor;
  div.appendChild(heading);

  for (const fieldName in fields ) {
    const input = document.createElement("input");
    input.type = fields[fieldName];
    input.name = fieldName;
    input.style.fontSize = fieldStyle.fontSize+"px";
    input.style.fontFamily = fieldStyle.fontFamily;
    input.style.color = fieldStyle.fontColor;
    div.appendChild(input);
    div.appendChild(document.createElement("br"));
  }

  const button = document.createElement("button");
  button.innerHTML = btnText;
  button.addEventListener("click", () => {
    const formData = {};
    for (const fieldName in fields) {
      formData[fieldName] = document.getElementsByName(fieldName)[0].value;
    }
    console.log(formData);
    //window.location.href = href;
  });

  button.style.fontSize = btnStyle.fontSize+"px";
  button.style.fontFamily = btnStyle.fontFamily;
  button.style.color = btnStyle.fontColor;
  button.style.backgroundColor = btnStyle.bgColor;


  format==="popup"?
    (div.style.transform="translate(-50%, -50%)",
  div.style.top="50%",
  div.style.left="50%",
  div.style.zIndex="9999",
  div.style.position="absolute"):null

  format === "page"
  ? ((document.body.style.backgroundColor = "#CDE4E9"),//Fixed with mailberry style?
    (document.body.style.display = "flex"),
    (document.body.style.flexDirection = "column"),
    (document.body.style.minHeight = "100vh"),
    (document.body.style.justifyContent = "center"),
    (document.body.style.alignItems = "center"))
  : null;
  

  div.style.display="flex"
  div.style.flexDirection="column"
  div.style.width = "500px";
  div.style.padding = "50px";
  div.style.backgroundColor = generalStyle.bgColor;
  div.appendChild(button);
}