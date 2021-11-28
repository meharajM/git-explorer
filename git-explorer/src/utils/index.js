export function isValidUrl(_string) {
    const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return matchpattern.test(_string);
}
export function isValidEmail(string) {
    const validRegex = /^<[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*>$/;
    return validRegex.test(string);
}
export function getParsedMessage(message) {
    let newChild = message.split(' ');
    return newChild.map(nc => {
        let str = ` ${nc}`;
        if (isValidUrl(nc)) {
            str = <a href={nc}>{` ${nc}`}</a>;
        } else if(isValidEmail(nc)) {
            str = <a href={`mailto:${nc}`}>{` ${nc}`}</a>;
        }
        return str;
    });
}