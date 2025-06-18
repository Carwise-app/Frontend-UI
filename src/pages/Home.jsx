import React from "react"
import MainPageBanner from "../components/Banner"
import BlinkingScrollHint from "../components/Scroll"
import ShowcaseArea from "../components/Showcase"

export default function HomePage(){
    return(
        <>
            <MainPageBanner/>
            <BlinkingScrollHint/>
            <ShowcaseArea/>
        </>
        
    )
}