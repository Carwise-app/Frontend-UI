import React from "react"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import DenemePhoto from "../assets/DenemeArabaCard2.webp"

export default function ShowcaseCard(){
    return(
        <Card sx={{ maxWidth: 320, borderRadius:3}}>   
            <Box
                className="w-full h-48 overflow-hidden"
                sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#c4c4c4",
                }}>
            <img
                src={DenemePhoto} 
                alt="Ford"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
            />
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <Stack>
                        <span>Hyundai Bayon</span> 
                        <span className="text-sm text-gray-400">1.4 MPI Style </span>
                    </Stack>
                </Typography>
                <Box className="flex flex-wrap gap-3">
                    <button className="bg-gray-200 px-3 py-1 rounded-2xl text-xs font-semibold">
                        2022
                    </button>
                    <button className="bg-gray-200 px-3 py-1 rounded-2xl text-xs font-semibold">
                        277.427 KM
                    </button>
                    <button className="bg-gray-200 px-3 py-1 rounded-2xl text-xs font-semibold">
                        199 hp
                    </button>
                    <button className="bg-gray-200 px-3 py-1 rounded-2xl text-xs font-semibold">
                        Benzin&LPG
                    </button>
                    <button className="bg-gray-200 px-3 py-1 rounded-2xl text-xs font-semibold">
                        Otomatik
                    </button>
                </Box> 
            </CardContent>
            <CardActions className="flex justify-end">
                <Typography>
                    <span className="text-3xl font-semibold">975.000 ₺</span>
                </Typography>
            </CardActions>
        </Card>
    )
}