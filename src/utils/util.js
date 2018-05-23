import config from './config'

export function noLayout(path) {
    let no_layout_url = config.no_layout_url;
    for (var i = 0; i < no_layout_url.length; i++) {
        if (no_layout_url[i] === path) {
            return true;
        }
    }
    return false;
}