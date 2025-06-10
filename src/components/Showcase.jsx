import { Box,Link,Typography } from "@mui/material";
import React, { useState } from "react";
import ShowcaseCard from "./Card";


export default function ShowcaseArea(){
const [showAll, setShowAll] = useState(false);

const cardCount = 12;
const cards = Array.from({length: cardCount}, (_, index) => <Link key={index} href="#" underline="none">
    <ShowcaseCard />
  </Link>
);

const visibleCards = showAll ? cards : cards.slice(0,4);  

    return(
        <Box className="m-10">
            <Typography variant="h3" className="flex justify-center pb-10">
                Vitrin
            </Typography>
            <Box className="flex justify-start px-5 gap-6 flex-wrap ">
              {visibleCards}
            </Box>
            {cards.length > 4 && (
                <Box className="flex justify-center mt-3">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-xl rounded-4xl px-8 py-2 cursor-pointer mt-3
                            border-2 border-gray-400 text-gray-400 hover:bg-[#dc143c] hover:border-[#dc143c] hover:text-white transition"
                        >
                        {showAll ? "Gizle" : "Daha Fazlası"}
                    </button>
                </Box>
            )}
        </Box>
    )
}