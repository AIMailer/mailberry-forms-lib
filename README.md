Mailberry Forms library to use together with https://mailberry.ai form builder 

Based on: https://webpack.js.org/guides/author-libraries/

Best way to use this is to include it in a script tag like so:

`<script src="https://unpkg.com/mailberry-forms@0.3.1/dist/mailberry-forms.js"></script>`

Mind changing the package version on the src url!

in order to add a form you have to add a div element which accepts the following options

`<div data-mailberry-form-id="..." data-mailberry-format="..." data-mailberry-popup-option="... >`

Note: data-mailberry-popup-option is optional, is only used when data-mailberry-format is set to popup

### data-mailberry-form-id
This id is useful to track the form and having an identifier for it. <br/>
Note that this is a dataset, so is posible to have multiples forms in the same page with the same data-mailberry-form-id.

### data-mailberry-format
This option is used to set the format of the form, it can be one of the following values:
- snippet
- popup
- page
...

### data-mailberry-popup-option
This option is used to set the popup option, it can be one of the following values:
- immediately
- after-10-seconds
- after-30-seconds
- at-30-percent-of-pageview
...


