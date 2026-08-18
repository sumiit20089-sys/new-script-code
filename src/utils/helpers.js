const defParams = {
  path: '/',
  domain: '.' + window.location.host.replace(/:\d+/, ''),
};

export function getCookie(name) {
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function getURLParameter(name) {
  return decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1] || ''
  );
}

export function getPar(name) {
  const url = window.location.href;
  const escaped = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + escaped + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function parseURL(url) {
  const anchor = document.createElement('a');
  anchor.href = url;
  return anchor.hostname.replace('www.', '');
}

export function detectDevice() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const ios = /iphone|ipod|ipad/.test(userAgent);

  if (!ios) return 'iPhone';

  if (/iphone/.test(userAgent)) return 'iPhone';
  if (/ipad/.test(userAgent)) return 'iPad';
  if (/ipod/.test(userAgent)) return 'iPod';

  return 'iPhone';
}

export { defParams };
