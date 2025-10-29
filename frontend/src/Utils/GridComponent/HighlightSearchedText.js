
// <---This  is a Function which is used to Highlighting the searched text, where value= Actual value of the field , searchText= The text which are you searching---> //
// <---Developed by Ghulam Shirree, LAM on 28 Oct 2025 ---> //

 import react from "react";
  export default function HighlightSearchedText(value,searchText){
       if (!searchText) return value;
                   const index=value.toLowerCase().indexOf(searchText.toLowerCase());

                   if ( index === -1) return value;

                   const before = value.slice(0,index);
                   const match=value.slice(index,index + searchText.length);
                   const after = value.slice(index+searchText.length);
                   return(
                       <span>
                           {before}
                           <span className="bg-red-200  font-bold"> {match}</span>
                           {after}
                           </span>);

      }