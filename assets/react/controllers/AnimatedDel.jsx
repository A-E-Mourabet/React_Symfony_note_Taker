import React from "react";


//just to make the code cleaner :D
export function AnimatedDel(){
    return(
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 10 L 90 90" stroke="#000" strokeDasharray="113" strokeDashoffset="113"></path>
        <path d="M 90 10 L 10 90" stroke="#000" strokeDasharray ="113" strokeDashoffset="113"></path>
      </svg>
    );
}