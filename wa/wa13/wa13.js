let q1 = {
    "employees" : [
        {
            "firstName" : "Sam",
            "department": "Tech",
            "designation" : "Manager",
            "salary" : 40000,
            "raiseEligible": true
        },
        {
            "firstName": "Mary",
            "department": "Finance",
            "designation": "Trainee",
            "salary" : 18500,
            "raiseEligible": true
          },
          {
            "firstName": "Bill",
            "department": "HR",
            "designation": "Executive",
            "salary": 21200,
            "raiseEligible": false
          }
    ]
}
console.log("Question 1");
console.log(q1);

let q2 = {
    "companyName": "Tech Stars",
    "website": "www.techstars.site",
    "employees" : [
        {
            "firstName" : "Sam",
            "department": "Tech",
            "designation" : "Manager",
            "salary" : 40000,
            "raiseEligible": true
        },
        {
            "firstName": "Mary",
            "department": "Finance",
            "designation": "Trainee",
            "salary" : 18500,
            "raiseEligible": true
        },
        {
            "firstName": "Bill",
            "department": "HR",
            "designation": "Executive",
            "salary": 21200,
            "raiseEligible": false
        }
    ]
}
console.log("Question 2");
console.log(q2);


let q3 = {
    "companyName": "Tech Stars",
    "website": "www.techstars.site",
    "employees" : [
        {
            "firstName" : "Sam",
            "department": "Tech",
            "designation" : "Manager",
            "salary" : 40000,
            "raiseEligible": true
        },
        {
            "firstName": "Mary",
            "department": "Finance",
            "designation": "Trainee",
            "salary" : 18500,
            "raiseEligible": true
        },
        {
            "firstName": "Bill",
            "department": "HR",
            "designation": "Executive",
            "salary": 21200,
            "raiseEligible": false
        }
    ]
}

function addEmployee(question3, firstName, department, designation, salary, raiseEligible){
    let employee = {
      "firstName": firstName,
      "department": department,
      "designation": designation,
      "salary": salary,
      "raiseEligible": raiseEligible
    }
    question3["employees"].push(employee);
  }
  addEmployee(q3, "Anna", "Tech", "Executive", 25600, false);

console.log("Question 3");
console.log(q3);


let q4 = 0;
for(let i = 0; i < q3.employees.length; i++){
  q4 += q3.employees[i]["salary"];
}
console.log("Question 4");
console.log(q4);


for(let i = 0; i < q3.employees.length; i++){
    if(q3.employees[i]["raiseEligible"] === true){
        q3.employees[i]["salary"] += q3.employees[i]["salary"] * 0.1;
        q3.employees[i]["raiseEligible"] = false;
    }
}
console.log("Question 5");
console.log(q3.employees);


let q6 = ["Anna", "Sam"];
for(let i = 0; i < q3.employees.length; i++){
    let check = false;
    let name = q3.employees[i].firstName;
    console.log(check);
    for(let j = 0; j < q6.length; j++){
        if(q6[j] === name){
            check = true;
        }
    }
    if(check === true){
        q3["employees"][i]["wfh"] = true;
    }
    else{
        q3["employees"][i]["wfh"] = false;
    }
}
console.log("Question 6");
console.log(q3);