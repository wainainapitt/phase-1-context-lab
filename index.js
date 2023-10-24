

 function createEmployeeRecord(array) {
    return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    };
    }

    function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
    }

    function createTimeInEvent(dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
    });
    return this;
    }
    function createTimeOutEvent(dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
    });
    return this;
    }

    function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }
    function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
    }

    function findEmployeeByFirstName(collection, firstNameString) {
    for (let i = 0; i < collection.length; i++) {
    if (collection[i].firstName === firstNameString) {
    return collection[i];
    }
    }
    return null;
    }
    let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
    return memo + allWagesFor.call(rec)
    }, 0)
    }

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    return payable
}
