import { useEffect, useState, useRef } from "react";

export const useRecordVoice = () => {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recording, setRecording] = useState(false);
    const chunks = useRef([]);
    const startRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.start();
            setRecording(true);
        }
    };
    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setRecording(false);
        }
    };
    const initialMediaRecorder = (stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.onstart = () => {
            chunks.current = [];
        };
        mediaRecorder.ondataavailable = (ev) => {
            chunks.current.push(ev.data);
        };
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
            console.log(audioBlob, 'audioBlob')
        };

        setMediaRecorder(mediaRecorder);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then(initialMediaRecorder);
        }
    }, []);

    return {
        recording, startRecording, stopRecording
    };
};