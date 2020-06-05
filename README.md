# inky-email-templates
[Inky](https://github.com/foundation/inky) & [foundation-emails](https://github.com/foundation/foundation-emails) development environment.

## Setup
> git clone https://github.com/jsanahuja/inky-email-templates.git

> npm install

## Examples

See some examples [clicking here](https://www.sowecms.com/demos/inky-email-templates/)

## Usage

### For development

- **dev**: Watches for any change in `src/*.html` to automatically perform a fast compilation into `build/$1.html` and reload the browser.
> npm run dev

- **examples**: Copies all the [foundation-emails templates](https://github.com/foundation/foundation-emails/tree/develop/templates) into `foundation-examples/src` and builds them into `foundation-examples/build` so you can see both the source and result of each.
> npm run examples

- **index**: Generates the `index.html` file with a list of your builds. Check this [index.html example](https://www.sowecms.com/demos/inky-email-templates/)
> npm run index

### For production
- **build**: Compiles all the html files in `src/` into `build`. This method also transforms all the CSS files into inline CC and minifies both HTML and CSS.
> npm run build