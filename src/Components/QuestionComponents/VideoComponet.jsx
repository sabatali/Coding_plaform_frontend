const VideoComponent = (data) => {
console.log("🚀 ~ VideoComponent ~ data:", data.data.videoLink)
const videoLink = data.data.videoLink ;
    
    // Function to convert shortened YouTube URL to embed URL
    const getEmbedUrl = (url) => {
        const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (videoIdMatch) {
            return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
        }
        return url;
    };

    const embedUrl = getEmbedUrl(videoLink);
    return (
        <>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
            <div className="w-full max-w-3xl p-6 bg-white rounded-xl shadow-2xl">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
                    Related to: {data.data.title}
                </h2>
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <iframe
                        className="w-full h-64 md:h-96 rounded-lg transition-transform transform hover:scale-105"
                        src={embedUrl || "https://www.youtube.com/embed/60jEzverV3c?si=S4egxmaXydIiyI2T"}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    </>
    
    )
}


export default VideoComponent; 