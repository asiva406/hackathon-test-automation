/// <reference types="cypress" />

export default class Generictilities {
  static getTodaysDate() {
    let todaysdate = ''
    let today = new Date()
    let date = today.getDate()
    let month = today.toLocaleString('default', { month: 'short' })
    let year = today.getFullYear()

    // Add leading zero to date if it is less than 10
    if (date < 10) {
      todaysdate = '0'+date + ' ' + month + ' ' + year
    }
    else{
      todaysdate = date + ' ' + month + ' ' + year
    }

    return todaysdate;
  }


  // function  to return today's date formatted as DD/MM/YYYY to use in AG Grid.
  static getTodaysDateforAGGrid() {
      let today = new Date();
      let date = today.getDate();
      let month = today.getMonth() + 1;
      let year = today.getFullYear();
  
      // Add leading zero to date and month if they are less than 10
      let datestring = date < 10 ? '0' + date : date.toString();
      let monthstring = month < 10 ? '0' + month : month.toString();
  
      let todaysdate = `${datestring}/${monthstring}/${year}`;
  
      return todaysdate;
  }

  static getFutureDateforAGGrid(days: number) {
    let finaldate = ''
    let today = new Date()
    let futureDate = new Date(today)
    futureDate.setDate(today.getDate() + days)
    let date = futureDate.getDate()
    let month = futureDate.getMonth() + 1; // Months are zero-based in JavaScript
    let year = futureDate.getFullYear()

    // Add leading zero to date and month if they are less than 10
    let datestring = date < 10 ? '0' + date : date.toString();
    let monthstring = month < 10 ? '0' + month : month.toString();
    finaldate = `${datestring}/${monthstring}/${year}`;
    return finaldate;
  }

  // we will get input as T+180 , we need a function to calculate T+180 and return the date
  static getFutureDate(days: number) {
    let finaldate = ''
    let today = new Date()
    let futureDate = new Date(today)
    futureDate.setDate(today.getDate() + days)
    let date = futureDate.getDate()
    let month = futureDate.toLocaleString('default', { month: 'short' })

    // if month is 4 letter , trim to 3 letters
    if (month.length === 4) {
      month = month.substring(0, 3);
    }
    let year = futureDate.getFullYear()

    // Add leading zero to date if it is less than 10
    if (date < 10) {
      finaldate = '0'+date + ' ' + month + ' ' + year
    }
    else{
      finaldate = date + ' ' + month + ' ' + year
    }
    return finaldate;
  }

}