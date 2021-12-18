const billAmount = document.querySelector("#bill_Amt");
const cashGiven = document.querySelector("#Cash_Given");

const errormsg = document.querySelector(".error_msg");

const cashGivendiv = document.querySelector(".Cash_give");
const cashReturn = document.querySelector(".change_return");

const output = document.querySelector("#output");

const nextButton = document.querySelector("#nxt_btn");
const chckButton = document.querySelector("#check_Btn");

const noOfNotes = document.querySelectorAll(".noofnotes");

const NotesAmt = [2000, 500, 100, 20, 10, 5, 1];

nextButton.addEventListener('click', ()=>{
    hideError();
    if(Number(billAmount.value)>0){
        nextButton.style.display = "none";
        cashGivendiv.style.display = "block";
    }
    else{
        showError("Enter valid bill Amount");
    }
})

chckButton.addEventListener('click', ()=> {
    clearNoOfNotes();
    hideError();
    let billAmtValue= Number(billAmount.value);
    let cashGivenValue= Number(cashGiven.value);

    if(billAmtValue>0 && cashGivenValue>0){
        if(!Number.isInteger(cashGivenValue)){
            showError("Enter valid amount in cash given field");
            return;
        }
        if (billAmtValue > cashGivenValue){
            showError("cash is less then bill, please enter right amount");
            return;
        }
    calculateNote(billAmtValue,cashGivenValue);
    }
    else{
        showError("Enter valid bill amount and cash given to continue");
    }
})

function calculateNote(bill,cash){
    let returnAmt = cash-bill;
    if (returnAmt<1){
        showError("No Amount should be Return");
        return;
    }
    cashReturn.style.display = "block";
    for (let i=0; i<NotesAmt.length; i++){
        returnAmt= compare(returnAmt, cashReturn[i], i);
    }
}

function compare(reminder, noteAmt, index){
    if(reminder >= noteAmt){
        let notes = Math.floor(reminder/noteAmt);
        reminder = reminder - notes*noteAmt;
        noOfNotes[index].innerText = `${notes}`;
    }
    return reminder
}

function clearNoOfNotes(){
    for(let notes of noOfNotes){
        notes.innerText = "";
    }
}

function showError(text){
    errormsg.style.display = "block";
    errormsg.innerText= text;
    cashReturn.style.display = "none";
}

function hideError(){
    errormsg.style.display = "none";
}

