import { useState, useContext } from "react";
import AIContext from "../../Context/AIContext";
import { AuthContext } from "../../Context/authContext";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; 
import remarkGfm from 'remark-gfm'; 

const AIComponent = (data) => {
    const { loading, result, error, fetchAIResponse } = useContext(AIContext);
    const [formData, setFormData] = useState({ title: data.data.title });
    const { userData } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (formData.title.trim() === "") return;
        await fetchAIResponse(formData.title);
    };

    // Function to handle key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    // Custom renderers for ReactMarkdown to handle code blocks
    const renderers = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={materialDark} // Black background and dark theme
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }
    };

    return (
        <div className="m-4">
            {/* Search Input Field */}
            <div className="flex border-2 border-blue-300 shadow-lg overflow-hidden mb-5 font-[sans-serif] rounded-lg">
                <input
                    type="text"
                    name="title"
                    placeholder="Enter Prompt here"
                    value={formData.title}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress} // Trigger submit on "Enter"
                    required
                    className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
                />
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center justify-center bg-[#007bff] px-5 text-sm text-white"
                >
                    Enter
                </button>
            </div>

            {/* AI Response Section */}
            <div className="">
                {!loading && !result ? (
                    <div className="text-start pt-7">
                        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
                            Hello, {userData.fullName}
                        </h1>
                        <p className="text-gray-500 text-5xl mt-2">How can I help you today?</p>
                    </div>
                ) : loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    // Display the AI response
                    <div className="space-y-4">
                        {result && (
                            <div className="p-4 border rounded shadow-md">
                                <h3 className="font-semibold">AI Response:</h3>
                                <div className="response-content">
                                    <ReactMarkdown
                                        components={renderers}
                                        remarkPlugins={[remarkGfm]} // GitHub flavored markdown support
                                    >
                                        {result.response}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIComponent;
