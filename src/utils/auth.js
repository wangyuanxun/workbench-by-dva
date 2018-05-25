export function userLogin(token, realName) {
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('REAL_NAME', realName);
}

export function isLogin() {
    return localStorage.getItem('TOKEN');
}

export function getUser() {
    return {
        TOKEN: localStorage.getItem('TOKEN'),
        REAL_NAME: localStorage.getItem('REAL_NAME')
    }
}

export function userLogout() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('REAL_NAME');
}