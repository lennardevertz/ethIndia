import { ShowHideCTA, ShowHideMedia, ShowHideSubject, ConnectWallet, dropHandler, init } from './utils/functions';
import './App.css';
import deliveredImage from './delivered.png';

function App() {

  return (
    <html>
<head>
<title>ETHIndia</title>
</head>
<body>

{/* CONNECT WALLET */}
<div id="ConnectWidget" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-end h-16">
        <div className="ml-4 flex items-center md:ml-6">
            <input id="connectWallet" type="submit" value="Connect Wallet" className="w-10/12 sm:w-full ml-6 sm:ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#11dd74] hover:bg-[#11cc74] hover:cursor-pointer"/>
            <div id="connectedWallet" className="hidden flex w-10/12 sm:w-full ml-6 sm:ml-4 whitespace-nowrap inline-flex items-center justify-center px-2 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-900">
                <input type="submit" value="0xcCE9...6a1f"/>
                <div id="disconnectWallet" className="ml-1 items-center justify-center px-1 py-1 border border-transparent rounded-md shadow-sm bg-indigo-50 hover:cursor-pointer text-gray-500 hover:text-[#5865F2]">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                   </svg>
                </div>
            </div>
        </div>
    </div>
</div>

{/* INDEX */}
<div id="Index" className="justify-center border-1 border-black w-96 rounded-md p-3 m-auto mt-10 shadow-2xl">
    <div className="items-center flex justify-between">
        <p className="text-lg leading-6 font-medium text-gray-900">Notify Your Community</p>
    </div>

{/* CONTENT */}
<div className="mt-3">
    <label className="text-sm text-gray-500">Content:</label>
    <div id="ContentTextArea" className="mt-1">
      <textarea id="ContentTextAreaInner" required cols="20" rows="2" maxLength="45" className="placeholder-gray-400 placeholder:text-sm resize-none shadow-sm appearance-none border border-gray-300 rounded-md w-full h-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="GM! We've just published the newest article on our blog. Check it out here."></textarea>
    </div>
    <div className="mr-1 flex items-center justify-end">
      <input id="SubjectCheckbox" onClick={ShowHideSubject} type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
      <label htmlFor="SubjectCheckbox" className="ml-1 block text-sm text-gray-500">Subject</label>
      <input id="MediaCheckbox" onClick={ShowHideMedia} type="checkbox" className="ml-4 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
      <label htmlFor="MediaCheckbox" className="ml-1 block text-sm text-gray-500">Media</label>
      <input id="CTACheckbox" onClick={ShowHideCTA} type="checkbox" className="ml-4 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
      <label htmlFor="CTACheckbox" className="ml-1 block text-sm text-gray-500">CTA</label>
   </div>
   <div id="SubjectDiv" style={{display: 'none'}}>
      <label className="text-sm text-gray-500">Subject:</label>
      <input id="SubjectInput"  name="password" type="text" className="mt-1 items-center justify-center rounded-md border border-gray-300 shadow-sm w-full px-3 py-2 text-black bg-white outline-0 truncate-clip placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="New article on IDriss blog"/>
    </div>
   <div id="MediaDiv" style={{display: 'none'}} className="mt-2">
      <label className="text-sm text-gray-500">Media URL:</label>
      <input id="MediaInput"  name="password" type="text" className="mt-1 items-center justify-center rounded-md border border-gray-300 shadow-sm w-full px-3 py-2 text-black bg-white outline-0 truncate-clip placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="www.youtube.com/ri2b3ri23d"/>
    </div>
   <div id="CTADiv" style={{display: 'none'}} className="mt-2">
      <label className="text-sm text-gray-500">CTA:</label>
      <input id="CTAInput"  name="password" type="text" className="mt-1 items-center justify-center rounded-md border border-gray-300 shadow-sm w-full px-3 py-2 text-black bg-white outline-0 truncate-clip placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="https://twitter.com/IDriss_xyz/status/1581651925035978752"/>
    </div>
</div>

{/* RECIPIENTS */}
<div className="mt-2">
    <label className="text-sm text-gray-500">Recipients:</label>
    <div id="RecipientsTextArea" className="mt-1" onDrop={dropHandler}>
      <textarea id="RecipientsTextAreaInner" required cols="20" rows="2" maxLength="45" className="placeholder-gray-400 placeholder:text-sm resize-none shadow-sm appearance-none border border-gray-300 rounded-md w-full h-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="geoist.eth&#10;geoist.lens&#10;@geoist_&#10;+16506655942&#10;hello@idriss.xyz&#10;0x88d7...9F75&#10;-------------- paste or drag a file here --------------&#10;&#10;"></textarea>
    </div>
</div>

{/* CONNECT WALLET & SEND BUTTON */}
    <div className="flex justify-center mt-3">
        <button onClick={ConnectWallet} type="button" className="w-full min-h-[42px] justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#11dd74] text-base font-medium text-white hover:bg-[#11cc74]">
            <span id="ButtonText">Connect Wallet</span>
                <div id="Spinner" style={{display: 'none'}} className="ml-1 flex justify-center items-center">
                    <div className="spinner-border animate-spin inline-block w-5 h-5 border-2 border-white rounded-full" role="status">
                        <span className="text-xl text-black">•</span>
                    </div>
                    <span className="ml-1 text-white text-base font-medium sm:text-sm"></span>
                </div>
        </button>
    </div>
</div>

{/* SUCCESS SCREEN */}
<div id="SuccessImage" className="hidden absolute w-full h-full flex items-center justify-center">
<img src={deliveredImage} className="border border-transparent rounded-md shadow-sm"/>
</div>

</body>
</html>
  );
}

export default App;
