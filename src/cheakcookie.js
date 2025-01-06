const checkCookieToken = (val) => {
    console.log(JSON.parse(localStorage.getItem("token")));
    
    if (val=="token"&&JSON.parse(localStorage.getItem("token")!=null)){
        // console.log(JSON.parse(localStorage.getItem("token").length>0));
        
        return true;
    }
    if (val=="admintoken"&&JSON.parse(localStorage.getItem("admintoken")!=null)){
        // console.log(JSON.parse(localStorage.getItem("token").length>0));
        
        return true;
    }
    // const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    // console.log(cookies);
    
    // return cookies.some((cookie) => cookie.startsWith(`${val}=`));
};
export default checkCookieToken;