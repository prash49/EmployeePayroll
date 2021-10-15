window.addEventListener('DOMContentLoaded', (event) => {
    salaryOutput();
    validateName();
    validateDate();

});

function salaryOutput() {
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;

    });
}

function validateName() {
    let name = document.querySelector('#name');
    let textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name.value)) {
            textError.textContent = "";
        } else {
            textError.textContent = "Name is Incorrect"
        }
    });
}

function validateDate() {
    let day = document.querySelector('#day');
    let month = document.querySelector('#month');
    let year = document.querySelector('#year');
    day.addEventListener('input', checkDate);
    month.addEventListener('input', checkDate);
    year.addEventListener('input', checkDate);
}

function checkDate() {
    let dateError = document.querySelector('.date-error');
    let date = day.value + " " + month.value + " " + year.value;
    try {
        checkStartDate(new Date(Date.parse(date)));
        dateError.textContent = "";
    } catch (e) {
        dateError.textContent = e;
    }

}

function checkStartDate(startDate) {
    let currentDate = new Date();
    if (startDate > currentDate) {
        throw "Start date is a future date"
    }
    let differnce = Math.abs(currentDate.getTime() - startDate.getTime());
    let date = differnce / (1000 * 60 * 60 * 24);
    if (date > 30) {
        throw "Start date is beyond 30 days";
    }

}

function save(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
        let employeePayrollDate = createEmployeePayroll();
    } catch (e) {
        return;
    }

}

function createEmployeePayroll() {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueByID('#name');
    } catch (e) {
        setTextValue('.text-error', e);
    }
    try {
        let date = getInputValueByID('#day') + " " + getInputValueByID('#month') + " " + getInputValueByID('#year')
        employeePayrollData.startDate = new Date(Date.parse(date));
    } catch (e) {
        setTextValue('.date-error', e);
    }

    employeePayrollData.profilePic = getSelectedValues('[name=profile').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender').pop();
    employeePayrollData.department = getSelectedValues('[name=department');
    employeePayrollData.salary = getSelectedValues('#salary');
    employeePayrollData.profilePic = getSelectedValues('#notes');
    alert(employeePayrollData.toString());
    return employeePayrollData;

}

function getInputValueByID(id) {
    let value = document.querySelector(id).value;
    return value;
}

function setTextValue(value) {
    let textError = document.querySelector(className);
    textError.textContent = value;
}

function getSelectedValues(propertyValue) {
    let allItems = document.querySelector(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if (item.checked) {
            setItems.push(item.value);
        }
    });
    return setItems;


}