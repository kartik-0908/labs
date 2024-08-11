"use client";
import { useRecordVoice } from "@/lib/hooks/RecordVoice";

const Microphone = () => {
  const { startRecording, stopRecording } = useRecordVoice();

  return (
    <button
      onMouseDown={startRecording}    
      onMouseUp={stopRecording}       
      onTouchStart={startRecording}   
      onTouchEnd={stopRecording}      
      className="border-none bg-transparent w-10"
    >
      Microphone
    </button>
  );
};

export { Microphone };