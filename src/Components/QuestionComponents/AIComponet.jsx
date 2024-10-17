import { useState, useContext } from "react";
import AIContext from "../../Context/AIContext";
import { AuthContext } from "../../Context/authContext";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'; 
import remarkGfm from 'remark-gfm'; 
import BrandLoader from "../DotsLoader/BrandLoader";

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

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    // Custom renderers for ReactMarkdown
    const renderers = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={okaidia} 
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
        <div className="m-6 p-6 bg-white rounded-lg">
            {/* Search Input Field */}
            <div className="flex items-center border-2 border-blue-400  mb-6 rounded-lg overflow-hidden">
                <input
                    type="text"
                    name="title"
                    placeholder="Ask a question..."
                    value={formData.title}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    required
                    className="w-full px-4 py-3 text-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                />
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg transition-all duration-300"
                >
                    Submit
                </button>
            </div>

            {/* AI Response Section */}
            <div>
                {!loading && !result ? (
                    <div className="text-start">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
                            Hello, {userData.fullName}!
                        </h1>
                        <p className="text-gray-500 text-2xl mt-4">What can I help you with today?</p>
                    </div>
                ) : loading ? (
                    <div className="">
                        <BrandLoader/>
                    </div>
                ) : error ? (
                    <p className="text-red-500 font-semibold">{error}</p>
                ) : (
                    <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                        {result && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Response:</h2>
                                <div className="response-content bg-white p-4 rounded-lg border border-gray-200 shadow-inner">
                                    <ReactMarkdown
                                        components={renderers}
                                        remarkPlugins={[remarkGfm]}
                                        className="prose prose-lg"
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
