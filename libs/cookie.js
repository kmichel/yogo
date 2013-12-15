// From http://www.quirksmode.org/js/cookies.html
function set_cookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function get_cookie(name, default_value) {
    var name_eq = name + "=";
    var cookie_parts = document.cookie.split(';');
    for (var i = 0; i < cookie_parts.length; i++) {
        var cookie_part = cookie_parts[i];
        while (cookie_part.charAt(0) == ' ')
            cookie_part = cookie_part.substring(1, cookie_part.length);
        if (cookie_part.indexOf(name_eq) == 0)
            return cookie_part.substring(name_eq.length, cookie_part.length);
    }
    return default_value;
}

function clear_cookie(name) {
    set_cookie(name, "", -1);
}
