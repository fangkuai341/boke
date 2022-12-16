export default {
    install: () => {
        var browser = {
            wapUrl: `${window.location.origin}/mobile.html#/`,
            versions: function () {
                var u = navigator.userAgent
                return {
                    mobile: u.match(/(iPhone|iPod|Android|ios|iPad)/i),
                };
            }()
        }
        if (browser.versions.mobile && browser.wapUrl != '') {
            location.href = browser.wapUrl;
        }
    }
}