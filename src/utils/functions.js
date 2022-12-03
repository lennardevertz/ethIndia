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

// levertz: execute after success
//document.getElementById("SuccessImage").style.display = "";
//document.getElementById("Index").style.display = "none";
//document.getElementById("ConnectWidget").style.display = "none";

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
    await resolveHandles();
    console.log(addresses);
    await sendNotifications();
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
            address = addressIDriss['Public ETH'] ?? addressIDriss[0];
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
    // // send on-chain notification with PUSH to addresses
    // let notifications = await PushAPI.payloads.sendNotification({
    //     signer,
    //     type: 4, // subset
    //     identityType: 2, // direct payload
    //     notification: {
    //       title: title,
    //       body: content
    //     },
    //     payload: {
    //       title: title,
    //       body: content,
    //       cta: '',
    //       img: mediaLink
    //     },
    //     recipients: recipients, // recipients addresses
    //     channel: 'eip155:5:0x525ae54A4ace44Ed8D788a0d08DC95F8DF28fC28', // your channel address
    //     env: 'staging'
    //   });

    await offChainNotification(potentialNotifications, title, content, mediaLink) // send off-chain notifications

    document.getElementById("Spinner").style.display = "none";
    document.getElementById("ButtonText").style.display = "";
}

async function offChainNotification(notifiedIDriss, title, content, media) {
    const url = 'http://localhost:5000/api/notify'

    // post body data
    const handles = notifiedIDriss
    const data = {"handles": handles, "title": title, "content": content, "media": media}

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

    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    signer = provider.getSigner()


    // const providerOptions = {
    //     ...WalletConnectOpts,
    //     ...WalletLinkOpts
    // }

    // if (deviceType() === "desktop") {
    //      Object.assign(providerOptions, MetaMaskOpts);
    //     Object.assign(providerOptions, TallyOpts);
    // }

    // web3Modal = new Web3Modal({
    //     network: 'mainnet',
    //     cacheProvider: false, // optional
    //     providerOptions, // required
    //     disableInjectedProvider: true, // optional. For MetaMask / Brave / Opera.
    // });

    // await web3Modal.clearCachedProvider();
    // provider = null

    // try {
    //     console.log("Trying to connect!");
    //     provider = await web3Modal.connect();
    //     const web3 = new Web3(provider);
    //     accounts = await web3.eth.getAccounts();
    //     account = accounts[0];
    //     console.log(account)
    // } catch(e) {
    //     console.log("Could not get a wallet connection", e);
    //     return;
    // }

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


export async function copyTweet() {
    let content = document.getElementById("tweetContent").innerHTML;
    await navigator.clipboard.writeText(content);
    const tooltip = document.getElementById("tooltip");
    tooltip.style.visibility = "visible";
    setTimeout(function () {
        tooltip.style.visibility = "hidden";
    }, 1000);
}
