import WrongReferral from './wrongReferral';
import { } from '../utils/functions';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



export default function Home() {
    return (
<html>
<head>
<title>ETHIndia</title>
</head>
<body>

<!-- INDEX -->
<div id="Index" class="justify-center border-1 border-black w-96 rounded-md p-3 m-auto mt-10 shadow-2xl">
    <div class="items-center flex justify-between">
        <p class="text-lg leading-6 font-medium text-gray-900">Notify Your Community</p>
    </div>

<!-- CONTENT -->
<div class="mt-3">
    <label class="text-sm text-gray-500">Content:</label>
    <div id="ContentTextArea" class="mt-1">
      <textarea id="ContentTextAreaInner" required cols="20" rows="2" maxlength="45" class="placeholder-gray-400 placeholder:text-sm resize-none shadow-sm appearance-none border border-gray-300 rounded-md w-full h-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="GM! We've just published the newest article on our blog. Check it out here."></textarea>
    </div>
    <div class="mr-1 flex items-center justify-end">
      <input id="SubjectCheckbox" onclick="ShowHideSubject()" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
      <label for="SubjectCheckbox" class="ml-1 block text-sm text-gray-500">Subject</label>
      <input id="MediaCheckbox" onclick="ShowHideMedia()" type="checkbox" class="ml-4 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
      <label for="MediaCheckbox" class="ml-1 block text-sm text-gray-500">Media</label>
      <input id="CTACheckbox" onclick="ShowHideCTA()" type="checkbox" class="ml-4 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
      <label for="CTACheckbox" class="ml-1 block text-sm text-gray-500">CTA</label>
   </div>
   <div id="SubjectDiv" style="display:none">
      <label class="text-sm text-gray-500">Subject:</label>
      <input id="SubjectInput" style="" name="password" type="text" class="mt-1 items-center justify-center rounded-md border border-gray-300 shadow-sm w-full px-3 py-2 text-black bg-white outline-0 w-full truncate-clip placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="New article on IDriss blog">
    </div>
   <div id="MediaDiv" style="display:none" class="mt-2">
      <label class="text-sm text-gray-500">Media URL:</label>
      <input id="MediaInput" style="" name="password" type="text" class="mt-1 items-center justify-center rounded-md border border-gray-300 shadow-sm w-full px-3 py-2 text-black bg-white outline-0 w-full truncate-clip placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="www.youtube.com/ri2b3ri23d">
    </div>
   <div id="CTADiv" style="display:none" class="mt-2">
      <label class="text-sm text-gray-500">CTA:</label>
      <input id="CTAInput" style="" name="password" type="text" class="mt-1 items-center justify-center rounded-md border border-gray-300 shadow-sm w-full px-3 py-2 text-black bg-white outline-0 w-full truncate-clip placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="https://twitter.com/IDriss_xyz/status/1581651925035978752">
    </div>
</div>

<!-- RECIPIENTS-->
<div class="mt-2">
    <label class="text-sm text-gray-500">Recipients:</label>
    <div id="RecipientsTextArea" class="mt-1">
      <textarea id="RecipientsTextAreaInner" required cols="20" rows="2" maxlength="45" class="placeholder-gray-400 placeholder:text-sm resize-none shadow-sm appearance-none border border-gray-300 rounded-md w-full h-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="geoist.eth&#10;geoist.lens&#10;@geoist_&#10;+16506655942&#10;hello@idriss.xyz&#10;0x88d7...9F75&#10;-------------- paste or drag a file here --------------&#10;&#10;"></textarea>
    </div>
</div>

<!-- CONNECT WALLET & SEND BUTTON -->
    <div class="flex justify-center mt-3">
        <button type="button" onclick="" class="w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#11dd74] text-base font-medium text-white hover:bg-[#11cc74]">
            <span>Connect Wallet</span>
        </button>
    </div>
</div>

<script type="text/javascript">

    function ShowHideSubject(SubjectCheckbox) {
        var divpassword = document.getElementById("SubjectCheckbox").checked;
        document.getElementById("SubjectDiv").style.display = divpassword === true ? "block" : "none";
        document.getElementById("SubjectInput").focus();
    }

    function ShowHideMedia(MediaCheckbox) {
        var divpassword = document.getElementById("MediaCheckbox").checked;
        document.getElementById("MediaDiv").style.display = divpassword === true ? "block" : "none";
        document.getElementById("MediaInput").focus();
    }

    function ShowHideCTA(CTACheckbox) {
        var divpassword = document.getElementById("CTACheckbox").checked;
        document.getElementById("CTADiv").style.display = divpassword === true ? "block" : "none";
        document.getElementById("CTAInput").focus();
    }

</script>
</body>
</html>
    )
}