// eslint-disable-next-line import/no-anonymous-default-export
export default cookie => document.cookie.split(',').filter(ck => ck.slice(0, cookie.length) === cookie)[0]?.slice(cookie.length + 1) ?? null;
