import Cookies from 'js-cookie';

export default async function fetch (url, options = {}) {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    // do not set content type if attempting photo upload
    if (options.headers['Content-Type'] === 'multipart/form-data') {
      delete options.headers['Content-Type'];
    } else {
      options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    }
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  const res = await window.fetch(url, options);

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    res.data = await res.json();
  }

  if (res.status >= 400) throw res;

  return res;
}

export function restoreCSRF () {
  return fetch('/api/csrf/restore');
}
