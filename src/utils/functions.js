import * as PushAPI from "@pushprotocol/restapi"
import { ethers } from "ethers";
import {IdrissCrypto} from "idriss-crypto";

let regxE = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
let regxP = /^(\+\(?\d{1,4}\s?)\)?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
let regxT = /^@[a-zA-Z0-9_]{1,15}$/;
let handles;
let addresses;
let potentialNotifications;
let signer;
let notFound;
let provider;



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

function showSuccess() {
    
    document.getElementById("SuccessImage").style.display = "";
    document.getElementById("Index").style.display = "none";
    document.getElementById("ConnectWidget").style.display = "none";

    setTimeout(function(){
        document.getElementById("SuccessImage").style.display = "none";
        document.getElementById("Index").style.display = "";
        document.getElementById("ConnectWidget").style.display = "";
    },3000)
    
    document.getElementById('SubjectInput').value = '';
    document.getElementById('ContentTextAreaInner').value = '';
    document.getElementById('MediaInput').value = '';
    document.getElementById('CTAInput').value = '';
    document.getElementById('RecipientsTextAreaInner').value = '';
    handles = [];
    addresses = [];
    potentialNotifications = [];
    notFound = [];
}

function HideIntroImage() {
  setTimeout(function(){
    document.getElementById('IntroImage').style.display = "none";
    document.getElementById('ConnectWidget').style.display = "";
    document.getElementById('Index').style.display = "";
  },3000)
}

window.onload = HideIntroImage;

// add ondrop={} to element in app.js
export async function dropHandler (e)  {
    console.log("Dropped a file")
    console.log("Event: ", e)
    let csvContent = await processCSVdrop(e);
    document.querySelector('#RecipientsTextAreaInner').innerHTML = csvContent;
}

export async function connectWallet() {
    document.querySelector('#connectWallet').classList.add('hidden');
    document.querySelector('#connectedWallet').classList.remove('hidden');

    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    if (!provider) {
        provider = new ethers.providers.Web3Provider(window.ethereum);

        // MetaMask requires requesting permission to connect users accounts
        let accounts = await provider.send("eth_requestAccounts", []);
        console.log(accounts)

        // The MetaMask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        signer = provider.getSigner();
        console.log(signer)
        document.querySelector('#connectedWallet').firstElementChild.value = accounts[0].substring(0, 6).concat("...").concat(accounts[0].substr(-4))

    }
}


export async function disconnectWallet() {
    provider = null;
    document.querySelector('#connectWallet').classList.remove('hidden');
    document.querySelector('#connectedWallet').classList.add('hidden');
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

    return new Promise(resolve => {
        const fileReader = new FileReader();

        fileReader.addEventListener("load", () => {
            const handlesRaw = fileReader.result;
            handles = handlesRaw.split(/(?:\r\n|\n)+/).filter(function(el) {return el.length != 0});
            console.log(handles)
            textToDisplay = handles.join('\n');
            //ToDo: filter non-RegEx strings
            resolve(textToDisplay)
        });
        fileReader.readAsText(file);
    });
}


export async function resolveHandles() {
    addresses = []
    notFound = []
    potentialNotifications = {}
    const idriss = new IdrissCrypto();
    
    for (let handle of handles) {
        let address;
        if (ethers.utils.isAddress(handle)) addresses.push(handle)
        else if (handle.endsWith('.eth')) {
            address = await provider.resolveName(handle);
        }
        else {
            let addressIDriss = await idriss.resolve(handle, {"network": "evm"});
            address = addressIDriss["Public ETH"] ?? Object.values(addressIDriss)[0];
            potentialNotifications[address] = handle;
        }

        if (address) addresses.push(address)
        else notFound.push(handle);
    }
    return addresses
}


export async function sendNotifications() {
    let recipients = []
    for (let address of addresses) {
        recipients.push('eip155:5:'+address)
    }
    console.log(recipients)
    let title = document.getElementById('SubjectInput').value;
    let content = document.getElementById('ContentTextAreaInner').value;
    let mediaLink = document.getElementById('MediaInput').value;
    let cta = document.getElementById('CTAInput').value;
    // send on-chain notification with PUSH to addresses
    let notifications = await PushAPI.payloads.sendNotification({
        signer,
        type: 4, // subset
        identityType: 2, // direct payload
        notification: {
          title: title,
          body: content
        },
        payload: {
          title: title,
          body: content,
          cta: cta,
          img: mediaLink
        },
        recipients: recipients, // recipients addresses
        channel: 'eip155:5:0x525ae54A4ace44Ed8D788a0d08DC95F8DF28fC28', // your channel address
        env: 'staging'
      });

    await offChainNotification(potentialNotifications, title, content, mediaLink, cta) // send off-chain notifications

    document.getElementById("Spinner").style.display = "none";
    document.getElementById("ButtonText").style.display = "";
    showSuccess();
}

async function offChainNotification(notifiedIDriss, title, content, media, cta) {
    const url = '/api/notify'

    // post body data
    const handles = notifiedIDriss
    const data = {"handles": handles, "title": title, "content": content, "media": media, "cta": cta}

    // request options
    const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
    }

    // send POST request
    fetch(url, options)
    .then(res => res.json())
    .then(res => console.log(res))
}


export async function init(){

    document.getElementById("Spinner").style.display = "";
    document.getElementById("ButtonText").style.display = "none";

    await connectWallet();

    await resolveHandles();
    console.log(addresses);
    await sendNotifications();

}


function deviceType(){
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)){
        return "tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)){
        return "mobile";
    }
    return "desktop";
};
