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

