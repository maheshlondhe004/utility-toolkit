const VideoToMp3Converter = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Video to MP3 Converter</h1>
            <p className="mb-4">Convert your video files to MP3 format easily.</p>
            <input type="file" accept="video/*" className="mb-4" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Convert</button>
        </div>
    );
}
export default VideoToMp3Converter;