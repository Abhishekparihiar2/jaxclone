import * as XLSX from "xlsx";
import moment from "moment";
import DatePicker from "react-datepicker";
import { BackgroundChecksStatus, InspectionStatus, InspectionType, RentalStatus, UserStatus, VehicleStatus } from "../shared/models";
var mz = require('moment-timezone');

export const formatDate = (date: Date | string, selectYear: boolean = false, time: boolean = false) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();
  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return selectYear ? `${year}` : `${[month, day, year].join("/")}${time ? ` ${hour}:${min}:${sec}` : ""}`;
};

const convertedDateTime = (city: any, utcDate: any, utcTime: any, time: boolean = true) => {
  if(utcDate && utcTime){
    const date: any = utcDate;
    const hours24 = convertTime12to24(utcTime)
    const fullDate = `${date.split('-')[2]}-${date.split('-')[1]}-${date.split('-')[0]} ${hours24}`
    // const time = moment.utc(fullDate).add(offsetDiff, 'minutes').local().format('hh:mm A')
    let tz = ""
    if(city.toLowerCase() === "atlanta") {
      tz = "America/New_York"
    }
    if(city.toLowerCase() === "dallas") {
      tz = "America/Chicago"
    }
    let time = ""
    let formattedDate = ""
    if(tz) {
      time = mz.utc(fullDate).tz(tz).format('hh:mm A')
      formattedDate = mz.utc(fullDate).format('MMMM DD,YYYY')
    } else {
      time = mz.utc(fullDate).local().format('hh:mm A')
      formattedDate = mz.utc(fullDate).format('MMMM DD,YYYY')
    }
    console.log(time)
    console.log(`${formattedDate} | ${time}`)
    console.log(tz)
    return time ? `${time}` : `${formattedDate} | ${time}`
  }
}

export const exportData = (data: any, fileName: string, heading: any | null = null, type: string | null = null) => { 
  let prepareData = null
  let excelHeading = null
  if(heading) {
    prepareData = data.map((row: any) => {
      return Object.keys(heading).map((header) => {
        if(header === 'year'){
          return formatDate(row[header] as Date, true)  
        }
        if(header === 'date' && type === 'blackout'){
          return formatDate(row[header] as Date, false)  
        }
        if(header.toLowerCase() === 'status' && type === 'rentals'){
          return row[header] =  (RentalStatus as any)[row[header]]
        }
        if(header.toLowerCase() === 'status' && type === 'vehicles'){
          return row[header] =  (VehicleStatus as any)[row[header]]
        }
        if((header.toLowerCase() === 'pickuptime' || header.toLowerCase() === 'returntime') && type === 'rentals'){
          return row[header] =  header.toLowerCase() === 'pickuptime' ? convertedDateTime(row['vehicleCity'], row['pickupAt'], row['pickupTime'])
          : convertedDateTime(row['vehicleCity'], row['returnAt'], row['returnTime'])
        }
        if(header.toLowerCase() === 'status' && type === 'inspections'){
          return row[header] =  (InspectionStatus as any)[row[header]]
        }
        if(header.toLowerCase() === 'status' && type === 'background'){
          return row[header] =  (BackgroundChecksStatus as any)[row[header]]
        }
        if(header.toLowerCase() === 'status' && type === 'customer'){
          return row[header] =  (UserStatus as any)[row[header]]
        }
        if(header.toLowerCase() === 'backgroundstatus' && type === 'customer'){
          return row[header] =  (BackgroundChecksStatus as any)[row[header]]
        }
        if(header.toLowerCase() === 'typeofinspection' && type === 'inspections'){
          const value = Object.keys(InspectionType).find((key: any) => row['inspectionTypeId'] === InspectionType[key])
          return row[header] =  value
        }
        if(type === 'promo') {
          if(header.toLowerCase() === 'startdate' || header.toLowerCase() === 'expirationdate'){
            return formatDate(row[header] as Date, false)  
          }
          if(header.toLowerCase() === 'isactive'){
            return row[header] === 1 ? true : false
          }
          if(header.toLowerCase() === 'extension'){
            return row[header] === 1 ? true : false
          }
          if(header.toLowerCase() === 'firsttimerenter'){
            return row[header] === 1 ? true : false
          }
        }
        if(header.toLowerCase() === 'argyleresponse' && type === 'customer'){
          console.log(row[header], header, row)
          let argyle = ""
          const jsonParsed = JSON.parse(row[header])
          if(jsonParsed) {
            Object.keys(jsonParsed).map((key) => argyle += `${key} => ${jsonParsed[key]}, `)
          }
          return row[header] =  argyle
        }
        return row[header]
      })
    })
    excelHeading = Object.keys(heading).map((header) => heading[header]) 
  }
  const wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(prepareData && prepareData.length > 0 ? prepareData : data);

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  if(excelHeading && excelHeading.length > 0)
    XLSX.utils.sheet_add_aoa(ws, [excelHeading])

  XLSX.writeFile(wb, fileName);
};

export const numberOfRentalDays = (pickupDate: any, returnDate: any) => {
  var startDate = moment(pickupDate, 'DD-MM-YYYY');
  var endDate = moment(returnDate, 'DD-MM-YYYY');
  return endDate.diff(startDate, "days");
};


// export const numberOfRentalDaysWithTime = (pickupDateTime: any, returnDateTime: any) => {
//   var startDate = moment(pickupDateTime, 'DD-MM-YYYY hh:mm A');
//   var endDate = moment(returnDateTime, 'DD-MM-YYYY hh:mm A');
//   return endDate.diff(startDate, "days");
// };

export const totalAmount = (transactions: any) => {
  let total = 0;
  for (var i = 0; i < transactions.length; i++) {
    if(transactions.status !== 'CANCELED' && transactions.status !== '' && transactions.status !== 'PENDING') {
      total += transactions[i].amount;
    }
  }
  return total;
};

export const dateDifference = (startDate: string, endDate: string) => {
  console.log(startDate, endDate)
  const date1 = new Date(startDate).valueOf();
  const date2 = new Date(endDate).valueOf();
  const diffTime: any = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
export const formatAmount = (amount: number = 0): string => {
  return `$${amount ? formatNumberAsThousand(amount.toFixed(2)) : "0.00"}`;
};

export const getUniqueArray = (array: Array<string>) => {
  let capitalizeArray: Array<string> | [] = [];
  if (array && array.length > 0) {
    const lowerCaseArray = array.map((item: string) => item.toLowerCase());
    const uniqueArray = lowerCaseArray.filter(
      (item: string, pos: number) => lowerCaseArray.indexOf(item) === pos
    );
    capitalizeArray = uniqueArray.map(
      (item) => item.charAt(0).toUpperCase() + item.slice(1)
    );
  }
  return capitalizeArray;
};

export const formatPhoneNumber = (phoneNumberInput: string) => {
  let phoneNumberString = phoneNumberInput;
  if (phoneNumberInput?.length && phoneNumberInput.length === 12) {
    phoneNumberString = phoneNumberInput.substring(2);
  }
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
};

export const openCalender = (ref: React.MutableRefObject<DatePicker<never, undefined> | null>) => {
  ref?.current && ref?.current?.setOpen(true);
}

export const readDateString = (dateStr:string) => {
  var date = new Date(dateStr)
  var userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + userTimezoneOffset);
}
export const formatNumberAsThousand = (number: any) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")


export const convertTime12to24 = (time12h: string) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes]: any = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

export function addDays(date: any, days: any) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const formattedUTCData = (vehicleCity: any, returnTime: any, returnSlot: any) => {
  let tz = ""
    if(vehicleCity.toLowerCase() === "atlanta") {
      tz = "America/New_York"
    }
    if(vehicleCity.toLowerCase() === "dallas") {
      tz = "America/Chicago"
    }
    let time = ""
    let formattedDate = ""
    const hours24 = convertTime12to24(returnTime)
    const returnDate = moment(returnSlot).format("DD-MM-YYYY")
    const fullDate = `${returnDate.split('-')[2]}-${returnDate.split('-')[1]}-${returnDate.split('-')[0]} ${hours24}`
    console.log(returnSlot)
    console.log(returnTime)
    if(tz) {
      time = mz.utc(fullDate).tz(tz).format('hh:mm A')
      formattedDate = mz.utc(fullDate).tz(tz).format('YYYY-MM-DD hh:mm A')
    } else {
      time = mz.utc(fullDate).local().format('hh:mm A')
      formattedDate = mz.utc(fullDate).local().format('YYYY-MM-DD hh:mm A')
    }
    // console.log(time, "tada")
    // console.log(fullDate, "fullDate", `${returnDate} ${time}`, tz)
    // console.log(momentUTC.utc(`${returnDate} ${time}`).tz(tz).format('YYYY-MM-DD hh:mm A'))

    var input = `${moment(returnSlot).format('MM/DD/YYYY')} ${time}`
    var fmt   = "MM/DD/YYYY h:mm:ss A";  // must match the input
    var zone  = tz;

    // construct a moment object
    var m = mz.tz(input, fmt, zone);

    // convert it to utc
    m.utc();
    // format it for output
    var formattedReturnAt = m.format(fmt)
    return formattedReturnAt ? moment(formattedReturnAt).format('YYYY-MM-DD hh:mm A') : formattedReturnAt
}