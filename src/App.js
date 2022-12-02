import { ShowHideCTA, ShowHideMedia, ShowHideSubject} from './utils/functions';
import './App.css';

function App() {

  return (
    <html>
<head>
<title>ETHIndia</title>
</head>
<body>

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
   <div id="SubjectDiv" style={{display:'none'}}>
      <label className="text-sm text-gray-500">Subject:</label>
      <input id="SubjectInput"  name="password" type="text" className="mt-1 items-center justify-center rounded-md border border-gray-300 shadow-sm w-full px-3 py-2 text-black bg-white outline-0 w-full truncate-clip placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="New article on IDriss blog"/>
    </div>
   <div id="MediaDiv" style={{display:'none'}} className="mt-2">
      <label className="text-sm text-gray-500">Media URL:</label>
      <input id="MediaInput"  name="password" type="text" className="mt-1 items-center justify-center rounded-md border border-gray-300 shadow-sm w-full px-3 py-2 text-black bg-white outline-0 w-full truncate-clip placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="www.youtube.com/ri2b3ri23d"/>
    </div>
   <div id="CTADiv" style={{display:'none'}} className="mt-2">
      <label className="text-sm text-gray-500">CTA:</label>
      <input id="CTAInput"  name="password" type="text" className="mt-1 items-center justify-center rounded-md border border-gray-300 shadow-sm w-full px-3 py-2 text-black bg-white outline-0 w-full truncate-clip placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="https://twitter.com/IDriss_xyz/status/1581651925035978752"/>
    </div>
</div>

{/* RECIPIENTS */}
<div className="mt-2">
    <label className="text-sm text-gray-500">Recipients:</label>
    <div id="RecipientsTextArea" className="mt-1">
      <textarea id="RecipientsTextAreaInner" required cols="20" rows="2" maxLength="45" className="placeholder-gray-400 placeholder:text-sm resize-none shadow-sm appearance-none border border-gray-300 rounded-md w-full h-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="geoist.eth&#10;geoist.lens&#10;@geoist_&#10;+16506655942&#10;hello@idriss.xyz&#10;0x88d7...9F75&#10;-------------- paste or drag a file here --------------&#10;&#10;"></textarea>
    </div>
</div>

{/* CONNECT WALLET & SEND BUTTON */}
    <div className="flex justify-center mt-3">
        <button type="button" className="w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#11dd74] text-base font-medium text-white hover:bg-[#11cc74]">
            <span>Connect Wallet</span>
        </button>
    </div>
</div>
</body>
</html>
  );
}

export default App;
