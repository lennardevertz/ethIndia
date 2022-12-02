import * as PushAPI from "@pushprotocol/restapi"
import { useWeb3React } from "@web3-react/core"

let regxE = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
let regxP = /^(\+\(?\d{1,4}\s?)\)?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
let regxT = /^@[a-zA-Z0-9_]{1,15}$/;
let handles;
let addresses;
let potentialNotifications;



export function ShowHideSubject() {
    var divpassword = document.getElementById("SubjectCheckbox").checked;
    document.getElementById("SubjectDiv").style.display = divpassword === true ? "block" : "none";
    document.getElementById("SubjectInput").focus();
}

export function ShowHideMedia() {
    var divpassword = document.getElementById("MediaCheckbox").checked;
    document.getElementById("MediaDiv").style.display = divpassword === true ? "block" : "none";
    document.getElementById("MediaInput").focus();
}

export function ShowHideCTA() {
    var divpassword = document.getElementById("CTACheckbox").checked;
    document.getElementById("CTADiv").style.display = divpassword === true ? "block" : "none";
    document.getElementById("CTAInput").focus();
}


// add ondrop={} to element in app.js
export async function dropHandler (e)  {
    console.log("Dropped a file")
    let csvContent = await this.processCSVdrop(e);
    this.html.querySelector('textarea[name="recipients"]').innerHTML = csvContent;
}


async function processCSVdrop(e){
    console.log(e)
    e.preventDefault();
    let file;
    let textToDisplay;

    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((item, i) => {
            if (item.kind === 'file') {
                file = item.getAsFile();
                console.log(`… file[${i}].name = ${file.name}`);
            }
        });
    } else {
        [...e.dataTransfer.files].forEach((file, i) => {
            console.log(`… file[${i}].name = ${file.name}`);
            file = file;
        });
    }

    await new Promise(resolve => {
        const fileReader = new FileReader();

        fileReader.addEventListener("load", () => {
            const handlesRaw = fileReader.result;
            console.log(handles)
            handles = handlesRaw.split('\n').map(data => data.split(','));
            console.log(handles)
            textToDisplay = handles.join('\n');
            //ToDo: filter non-RegEx strings
            console.log(textToDisplay)
            resolve(textToDisplay)
        });
        fileReader.readAsText(file);
    });
}