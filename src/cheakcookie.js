const checkCookieToken = (val) => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    // console.log(cookies);
    
    return cookies.some((cookie) => cookie.startsWith(`${val}=`));
};
export default checkCookieToken;