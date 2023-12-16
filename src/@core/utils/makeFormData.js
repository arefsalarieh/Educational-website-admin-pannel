
export const makeFormData = (obj) => {

    const keys = Object.keys(obj)

    keys?.forEach(key => {
        const item = obj[key];
        data.append(key, item);
    })

    return data;
}