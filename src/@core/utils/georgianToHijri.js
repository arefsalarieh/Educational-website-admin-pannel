export default georgianToHijri = (date) => {
    if(date.length > 10){
        date = date.slice(0, 10);
    }
    let year = date.slice(0,3)
    let month = date.slice(5,6)
    let day = date.slice(8,9)

    return `${year}/${month}/${day}`
}