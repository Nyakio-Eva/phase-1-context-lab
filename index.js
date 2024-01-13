const createEmployeeRecord = function(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
};
const createEmployeeRecords = function (arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
};
const createTimeInEvent = function(dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    hour = parseInt(hour, 10);
  
    this.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: hour
    });
  
    return this; // Returning the updated employee record
};
const createTimeOutEvent = function(dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    hour = parseInt(hour, 10);
  
    this.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: hour
    });
  
    return this; // Returning the updated employee record
};
const hoursWorkedOnDate = function(date) {
    let timeInEvent = this.timeInEvents.find(event => event.date === date);
    let timeOutEvent = this.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      return hoursWorked;
    } else {
      return 0; // Return 0 if either timeIn or timeOut event is missing
    }
};
const wagesEarnedOnDate = function(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const ratePerHour = this.payPerHour;
  
    return hoursWorked * ratePerHour;
};


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function (collection, firstName) {
    return collection.find(employee => employee.firstName === firstName);
};
const calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor.call(employee);
    }, 0);
  };
  