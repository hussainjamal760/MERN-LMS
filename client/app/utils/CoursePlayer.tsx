import React, { FC, useEffect, useState } from 'react';
import axios from "axios";

type Props = {
    videoUrl: string,
    title: string
}

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: "",
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(null); 
        
        const fetchVideoData = async () => {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
                    videoId: videoUrl
                });
                setVideoData(response.data);
            } catch (err: any) {
                console.error("Error fetching VdoCipher OTP:", err); 
                
                const errorMessage = err.response?.data?.message || err.message || "Could not load video player. Please try again.";
                
                setError(errorMessage);
            }
        };

        if (videoUrl) {
             fetchVideoData();
        }

    }, [videoUrl]); 

    if (error) {
        return (
            <div className="w-full min-h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-red-600 dark:text-red-400 font-medium text-lg text-center">
                    ❌ Video Error: {error}
                </p>
            </div>
        );
    }
    
    if (!videoData.otp && !error) {
         return (
            <div className="w-full min-h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <p className="text-gray-500 dark:text-gray-400">Loading video...</p>
            </div>
        );
    }

    return (
        <div style={{ paddingBottom: "41%", position: "relative" }}>
            {
                videoData.otp && videoData.playbackInfo !== "" && (
                    <iframe
                        src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=HRgbAaIOvTi4CcdU`}
                        style={{
                            border: 0,
                            width: "90%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                        allowFullScreen={true}
                        allow="encrypted-media"
                    />
                )
            }
        </div>
    );
}

export default CoursePlayer;