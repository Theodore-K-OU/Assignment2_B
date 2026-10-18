
/* 
 Critical 
○ (pH < 5.0 OR pH > 7.5) AND (Temp < 55F OR Temp > 95F) AND (EC < 0.2 OR 
EC > 4.5 ) AND (RH < 30 OR RH > 90 ) 
● Optimal 
○ (5.5 <= pH <= 6.5) AND (64.4F <= Temp <= 71.6F) AND (1.0 <= EC <= 2.0) AND 
(50 <= RH <= 70) 
● Warning 
○ (NOT Critical) AND (NOT Optimal)

*/
(function() {
 "use strict";
 

//storage Key
    const STORAGE_KEY = "Green_Logic_Records";


    const greenhouseForm = document.getElementById('greenhouse-form');
    const errorBanner = document.getElementById('form-error-banner');
    const recordList = document.getElementById('record-list');
    const emptyState = document.getElementById('empty-state');
    const logCountBadge = document.getElementById('log-count');
    const btnClearAll = document.getElementById('btn-clear-all');

    //input data fields html
    const inputBayNumber = document.getElementById('bay-number');
    const inputPH = document.getElementById('pH');
    const inputTemp = document.getElementById('temp');
    const inputEc = document.getElementById('EC');
    const inputRh = document.getElementById('RH');

    //load records
    let records = loadRecords();

    //render
    render();

    function loadRecords() { //loads records from local storage
        try{
            const sotred = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch{
            console.error;
            return;
    }

    function saveRecords() { //for saving Data to local storage
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
        } catch (error) {
            console.error("Error saving records to localStorage:", error);
        }
    }
    
    function riskState(pH, temp, ec, rh) { //conditionals for the state
            if ((pH < 5.0 || pH > 7.5) && (temp < 55 || temp > 95) && (ec < 0.2 || ec > 4.5) && (rh < 30 || rh > 90)) {
                return "Critical";
            } else if ((pH >= 5.5 && pH <= 6.5) && (temp >= 64.4 && temp <= 71.6) && (ec >= 1.0 && ec <= 2.0) && (rh >= 50 && rh <= 70)) {
                return "Optimal";
            } else {
                return "Warning";
            }
    }
    //data validation
    function validateInput(data) {
        const errors = [];
        if(isNaN(data.bayNumber) || data.bayNumber < 1 || data.bayNumber > 50) {
            errors.push("Bay Number must be a number between 1 and 10.");
        }
        if(isNaN(data.pH) || data.pH < 0 || data.pH > 14) {
            errors.push("pH must be a number between 0 and 14.");
        }
        if(isNaN(data.temp) || data.temp < 0 || data.temp > 100) {
            errors.push("Temperature must be a number between 0 and 100 °F.");
        }
        if(isNaN(data.ec) || data.ec < 0 || data.ec > 50) {
            errors.push("EC must be a number between 0 and 50 mS/cm.");
        }
        if(isNaN(data.rh) || data.rh < 0 || data.rh > 100) {
            errors.push("RH must be a number between 0 and 100 %.");
        }
        
        return errors;
    }


    //event handlers

    greenhouseForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = {
            id:crypto.randomUUID(),
            bayNumber: parseInt(inputBayNumber.value, 10),
            pH: parseFloat(inputPH.value, 10),
            temp: parseFloat(inputTemp.value, 10),
            ec: parseFloat(inputEc.value, 10),
            rh: parseFloat(inputRh.value, 10),
            timestamp: new Date().toLocaleDateString([], {
            hour: "2-digit",
            minute: "2-digit",
            
        })
    };

    const validationErrors = validateInput(formData);

    if (validationErrors.length > 0) {
        displayErrors(validationErrors.join(" "));
        return;
    }

    hideErrors();

    //risk state
    formData.riskState = riskState(formData.pH, formData.temp, formData.ec, formData.rh);

    records.unshift(formData);

    //save to local storage
    saveRecords();

    //resets form after data is submitted
    greenhouseForm.reset();
    
    //suggests to enter another form thing
    inputBayNumber.focus();
});

recordList.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("btn-delete")) {
        const recordId = target.dataset.id;
        return record.id !== recordId;
        });
    saveRecords();
    render();
    }
});

//delete all records
btnClearAll.addEventListener("click", (event) => {
    if (confirm("Are you sure you want to delete all Greenhouse records?")) {
        records = [];
        saveRecords();
        render();
    }
});


//DOM RENDERING BODY
function render(){
    queueCount.txtContent = records.length;

    if(records.length === 0) {
        emptyState.classList.remove("hidden");
        recordList.innerHTML = "";
        return;
    }

    emptyState.classList.add("hidden");

    //browser reload
    const fragment = document.createDocumentFragment();

    records.forEach (rec => {
        const li = document.createElement("li");
        li.className = "greenhouse-record" + rec.riskState;


        //dynamic card
        li.innerHTML = `<div class="card-top">
            <div class="bay-number">Bay Number: ${rec.bayNumber}</div>
            <div class="timestamp">logged at ${rec.timestamp}</div>
            <span class="risk-state ${rec.riskState}">${rec.riskState}</span>
        </div>
        <div class="greenhouse-card">
            <div class="data-row">pH: ${rec.pH}</div>
            <div class="data-row">Temp: ${rec.temp} °F</div>
            <div class="data-row">EC: ${rec.ec} mS/cm</div>
            <div class="data-row">RH: ${rec.rh} %</div>
        </div>
        <button class="btn-delete" data-id="${rec.id}">Delete</button>';
        //append to fragment
        fragment.appendChild(li);
    });

    recordList.innerHTML = "";
    recordList.appendChild(fragment);

}

    function displayErrors(message) {
        errorBanner.textContent = message;
        errorBanner.classList.remove("hidden");
    }

    function hideErrors() {
        errorBanner.textContent = "";
        errorBanner.classList.add("hidden");
    }

    function escapeHtml(str) {
        return str
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;")
    }
    })();