let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    salaryOutput();
    validateName();
    validateDate();
    checkforUpdate();

});
const checkforUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : flase;
    if (!isUpdate)
        return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary)
    setValue('#notes', employeePayrollObj._notes);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);

}


function setValue(id, value) {
    let element = document.querySelector(id);
    element.value = value;
}


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
        let nameRegex = RegExp('^[A-Z]{1}[a-z A-Z\\s]{2,}$');
        if (nameRegex.test(name.value)) {
            textError.textContent = "";
        } else {
            textError.textContent = "Name is Incorrect";
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
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
        alert("Data Stored With name" + employeePayrollData.name);
        window.location.replace(site_Properties.home_page);
    } catch (e) {
        return;
    }

}

function createEmployeePayroll() {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueByID('#name');
        employeePayrollData.salary = getInputValueByID('#salary');
        employeePayrollData.notes = getInputValueByID('#notes');
        employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
        employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
        employeePayrollData.department = getSelectedValues('[name=department]');
    } catch (e) {
        setTextValue('.text-error', e);
    }
    try {
        let date = getInputValueByID('#day') + " " + getInputValueByID('#month') + " " + getInputValueByID('#year')
        employeePayrollData.startDate = new Date(Date.parse(date));
    } catch (e) {
        setTextValue('.date-error', e);
    }


    return employeePayrollData;
}

function getInputValueByID(id) {
    let value = document.querySelector(id).value;
    return value;
}

function setTextValue(className, value) {
    let textError = document.querySelector(className);
    textError.textContent = value;
}

function getSelectedValues(propertyValue) {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if (item.checked) {
            setItems.push(item.value);
        }
    });
    return setItems;
}

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    employeePayrollData.id = createNewEmpID();
    if (employeePayrollList == undefined) {
        employeePayrollList = [employeePayrollData];

    } else {
        employeePayrollList.push(employeePayrollData);
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));

}
const createNewEmpID = () => {
    let empId = localStorage.getItem('EmpId');
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem('EmpId', empId);
    return empId;

}

function resetButton() {
    setValue('#name', '');
    setValue('#salary', 400000);
    setValue('#notes', '');
    setValue('#day', '');
    setValue('#month', '');
    setValue('#year', '');
    setTextValue('.salary-output', 400000);
    setTextValue('.text-error', '');
    setTextValue('.date-error', '');
    unsetSelectedValues('[name=profile]');

}


function unsetSelectedValues(propertyValue) {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.selected = false;
    });
}