/**
 * 存储sessionStorage
 */
export const setSessionStorage = (name: any, content: any) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getSessionStorage = (name: any) => {
    if (!name) return;
    let data = window.sessionStorage.getItem(name)

    return data ? JSON.parse(data) : undefined;
}