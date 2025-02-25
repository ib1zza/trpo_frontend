

export function removeParams(url: string) {
    // replace /:categoryId and /:resourceId
    return url.replace(/\/:(\w+)/, '');
}
