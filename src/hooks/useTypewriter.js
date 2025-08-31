import { useState, useEffect } from "react";

export function useTypewriter(text, speed=100){
    const [displayedText, setDisplayedText]= useState("");

    useEffect(()=>{
        let i=0;
        const interval=setInterval(()=>{
            setDisplayedText(text.slice(0,i+1));
            i++;
            if(i==text.length){
                clearInterval(interval)
            }
        },speed);

        return ()=>clearInterval(interval);
    },[text, speed]);

    return displayedText;
}