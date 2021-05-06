import { isArray } from '@ember/array';
import { isHTMLSafe } from '@ember/template';

export default function fmt(str, formats) {
  str = str || '';
  let cachedFormats = formats;

  if (!isArray(cachedFormats) || arguments.length > 2) {
    cachedFormats = new Array(arguments.length - 1);

    for (let i = 1, l = arguments.length; i < l; i++) {
      cachedFormats[i - 1] = arguments[i];
    }
  }

  // first, replace any ORDERED replacements.
  let idx = 0; // the current index for non-numerical replacements
  if (isHTMLSafe(str)) {
    str = str.toString();
  }
  return str.replace(/%@([0-9]+)?/g, function (s, argIndex) {
    argIndex = argIndex ? parseInt(argIndex, 10) - 1 : idx++;
    return cachedFormats[argIndex];
  });
}