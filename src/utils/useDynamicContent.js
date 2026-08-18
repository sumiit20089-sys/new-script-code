import { useMemo } from 'react';
import { defaultNumber, defaultText, textByReferrer } from './textConfig';
import { detectDevice, getCookie, getPar, getURLParameter, parseURL } from './helpers';

function buildDisplayText(device, referrer) {
  let str = defaultText;

  for (const domain in textByReferrer) {
    if (referrer.indexOf(domain) !== -1) {
      str = textByReferrer[domain];
    }
  }

  return str.replace('|%model%|', device).replace('|%ref%|', referrer);
}

export function useDynamicContent() {
  return useMemo(() => {
    const device = detectDevice();
    const referrer = parseURL(document.referrer);

    let phone = getCookie('phoneSetBl');
    if (!phone) {
      phone = getURLParameter('phone') || getPar('phone');
    }
    if (!phone) {
      phone = defaultNumber;
    }

    const displayText = buildDisplayText(device, referrer);

    return { phone, displayText };
  }, []);
}
