
class DateUtil {

    convertStringToDate(date){
        const newDate = new Date(date + "Z");
        return newDate;
    }
}

module.exports = new DateUtil();