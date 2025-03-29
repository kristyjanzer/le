class ClickUnderManager {
    constructor(options = {}) {
        this.url = options.url || 'https://vk.com/';
        this.cookieName = options.cookieName || 'clickunder';
        this.expiryDays = options.expiryDays || 1;
        this.windowParams = {
            menubar: 'yes',
            location: 'yes',
            resizable: 'yes',
            scrollbars: 'yes',
            status: 'yes'
        };
        this.cookieStorage = new CookieStorage();
    }

    init() {
        document.addEventListener('mouseup', this.handleClick.bind(this));
    }

    handleClick() {
        if (!this.cookieStorage.isEnabled()) return;
        
        const cookieValue = this.cookieStorage.get(this.cookieName);
        
        if (!cookieValue) {
            this.setCookie();
            this.openWindow();
        }
    }

    setCookie() {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + this.expiryDays);
        this.cookieStorage.set(this.cookieName, '1', { expires: expirationDate });
    }

    openWindow() {
        const params = Object.entries(this.windowParams)
            .map(([key, value]) => `${key}=${value}`)
            .join(',');
            
        window.open(this.url, 'НовоеОкно', params);
        window.focus();
    }
}

// Пример использования
const clickUnder = new ClickUnderManager({
    url: 'http://ваш-сайт.ру',
    expiryDays: 1
});

clickUnder.init();

// Modern cookie storage class
class CookieStorage {
    isEnabled() {
        return navigator.cookieEnabled;
    }

    get(name) {
        const matches = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}=([^;]*)`));
        return matches ? decodeURIComponent(matches[1]) : null;
    }

    set(name, value, options = {}) {
        options = {
            path: '/',
            ...options
        };

        let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
        
        for (const optionName in options) {
            if (options[optionName]) {
                updatedCookie += `; ${optionName}`;
                const optionValue = options[optionName];
                if (optionName === 'max-age' || optionName === 'expires') {
                    updatedCookie += `=${optionValue}`;
                }
            }
        }

        document.cookie = updatedCookie;
    }
}
