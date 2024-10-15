import axios from 'axios';
import React, { useState } from 'react';
import DotsLoader from './DotsLoader/DotsLoader';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

const AssignmentForm = () => {
    const [result, setResult] = useState(null);
    console.log("🚀 ~ AssignmentForm ~ result:", result)
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        subjectName: '',
        topic: '',
        topic_details: '',
        length: 'Select Length',
        languageStyle: 'Select Language Style',
        academicLevel: 'Select Academic Level',
        focusArea: '',
        structure: 'Select Structure',
        researchDepth: 'Select Research Depth',
        useOfReferences: 'Select References',
        citationStyle: 'Select Citation Style',
        tone: 'Select Tone',
        visualElements: 'Select Visual Elements',
        pointOfView: 'Select Point of View',
        deadlineSensitivity: 'Select Deadline Sensitivity',
        plagiarismSensitivity: 'Select Plagiarism Sensitivity',
        criticalThinking: 'Select Critical Thinking',
        typeOfSources: 'Select Type of Sources',
        assignmentType: 'Select Assignment Type',
        regionalFocus: 'Select Regional Focus',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/api/v1/assingment_prompt", formData);
            setResult(response.data);
            // Clear form fields
            setFormData({
                subjectName: '',
                topic: '',
                topic_details: '',
                length: 'Select Length',
                languageStyle: 'Select Language Style',
                academicLevel: 'Select Academic Level',
                focusArea: '',
                structure: 'Select Structure',
                researchDepth: 'Select Research Depth',
                useOfReferences: 'Select References',
                citationStyle: 'Select Citation Style',
                tone: 'Select Tone',
                visualElements: 'Select Visual Elements',
                pointOfView: 'Select Point of View',
                deadlineSensitivity: 'Select Deadline Sensitivity',
                plagiarismSensitivity: 'Select Plagiarism Sensitivity',
                criticalThinking: 'Select Critical Thinking',
                typeOfSources: 'Select Type of Sources',
                assignmentType: 'Select Assignment Type',
                regionalFocus: 'Select Regional Focus',
            });
        } catch (error) {
            console.error("Submission error:", error);
            setResult("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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

    const downloadPDF = () => {
        const content = document.querySelector(".response-content");
        html2canvas(content).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("response.pdf");
        });
    };

    const downloadDOC = () => {
        const content = document.querySelector(".response-content").innerHTML;
        
        const doc = new Docxtemplater(new PizZip(), {
            paragraphLoop: true,
            linebreaks: true,
        });
    
        // Set the AI response content (you can add more formatting here)
        doc.setData({ content });
    
        try {
            // Render the document
            doc.render();
            
            const out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });
    
            // Save the DOCX file
            saveAs(out, "response.docx");
        } catch (error) {
            console.error("Error generating document", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-300 to-purple-300 p-8 flex justify-center items-center">
            <div className="container bg-white shadow-lg rounded-lg p-8 gap-6">
                <div className=" shadow-lg p-5   w-[100%]">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Assignment Details</h2>
                    <form onSubmit={handleSubmit} className='space-y-6 '>
                        <input
                            type="text"
                            name="subjectName"
                            value={formData.subjectName}
                            onChange={handleChange}
                            placeholder="Subject Name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />

                        {/* Topic */}
                        <input
                            type="text"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            placeholder="Topic"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />

                        <textarea
                            type="text"
                            name="topic_details"
                            value={formData.topic_details}
                            onChange={handleChange}
                            placeholder="Topic Details"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />

                        {/* Length and Language Style */}
                        <div className="flex space-x-4">
                            <select
                                name="length"
                                value={formData.length}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Length</option>
                                <option>500 words</option>
                                <option>1000 words</option>
                                <option>1500 words</option>
                                <option>5 pages</option>
                                <option>10 pages</option>
                            </select>

                            <select
                                name="languageStyle"
                                value={formData.languageStyle}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Language Style</option>
                                <option>formal</option>
                                <option>conversational</option>
                                <option>technical</option>
                            </select>
                        </div>

                        {/* Academic Level and Focus Area */}
                        <div className="flex space-x-4">
                            <select
                                name="academicLevel"
                                value={formData.academicLevel}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Academic Level</option>
                                <option>high school</option>
                                <option>undergraduate</option>
                                <option>graduate</option>
                            </select>

                            <input
                                type="text"
                                name="focusArea"
                                value={formData.focusArea}
                                onChange={handleChange}
                                placeholder="Focus Area"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {/* Structure and Research Depth */}
                        <div className="flex space-x-4">
                            <select
                                name="structure"
                                value={formData.structure}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Structure</option>
                                <option>intro, methods, conclusion</option>
                                <option>abstract, body, discussion</option>
                            </select>

                            <select
                                name="researchDepth"
                                value={formData.researchDepth}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Research Depth</option>
                                <option>basic overview</option>
                                <option>in-depth analysis</option>
                            </select>
                        </div>

                        {/* Use of References and Citation Style */}
                        <div className="flex space-x-4">
                            <select
                                name="useOfReferences"
                                value={formData.useOfReferences}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select References</option>
                                <option>no references</option>
                                <option>3-5</option>
                                <option>6-8</option>
                            </select>

                            <select
                                name="citationStyle"
                                value={formData.citationStyle}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Citation Style</option>
                                <option>APA</option>
                                <option>MLA</option>
                                <option>Chicago</option>
                            </select>
                        </div>

                        {/* Tone and Visual Elements */}
                        <div className="flex space-x-4">
                            <select
                                name="tone"
                                value={formData.tone}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Tone</option>
                                <option>neutral</option>
                                <option>persuasive</option>
                            </select>

                            <select
                                name="visualElements"
                                value={formData.visualElements}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Visual Elements</option>
                                <option>no visuals</option>
                                <option>basic graphs</option>
                                <option>charts and tables</option>
                            </select>
                        </div>

                        {/* Point of View and Deadline Sensitivity */}
                        <div className="flex space-x-4">
                            <select
                                name="pointOfView"
                                value={formData.pointOfView}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Point of View</option>
                                <option>first-person</option>
                                <option>third-person</option>
                            </select>

                            <select
                                name="deadlineSensitivity"
                                value={formData.deadlineSensitivity}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Deadline Sensitivity</option>
                                <option>moderate</option>
                                <option>high</option>
                            </select>
                        </div>

                        {/* Plagiarism Sensitivity and Critical Thinking */}
                        <div className="flex space-x-4">
                            <select
                                name="plagiarismSensitivity"
                                value={formData.plagiarismSensitivity}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Plagiarism Sensitivity</option>
                                <option>moderate</option>
                                <option>high</option>
                            </select>

                            <select
                                name="criticalThinking"
                                value={formData.criticalThinking}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Critical Thinking</option>
                                <option>analytical</option>
                                <option>creative</option>
                            </select>
                        </div>

                        {/* Type of Sources and Assignment Type */}
                        <div className="flex space-x-4">
                            <select
                                name="typeOfSources"
                                value={formData.typeOfSources}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Type of Sources</option>
                                <option>scholarly</option>
                                <option>non-scholarly</option>
                            </select>

                            <select
                                name="assignmentType"
                                value={formData.assignmentType}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option>Select Assignment Type</option>
                                <option>Formal Writing</option>
                                <option>essay</option>
                                <option>report</option>
                                <option>case study</option>
                            </select>
                        </div>

                        {/* Regional Focus */}
                        <select
                            name="regionalFocus"
                            value={formData.regionalFocus}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option>Select Regional Focus</option>
                            <option>global</option>
                            <option>regional</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            {loading
                                ? <DotsLoader />
                                : "Submit"
                            }

                        </button>
                    </form>
                </div>

                <div className=" space-y-6 shadow-lg p-5 w-[100%] rounded-md">
                    <h2 className="text-3xl font-semibold text-gray-800">Response</h2>
                    <div className='space-y-6 shadow-lg p-5'>
                    <h3 className="font-semibold">Prompt :</h3>
                    {result?.prompt}
                    </div>

                    <div className="space-y-4">
                        {result && (
                            <div className="p-4 border rounded shadow-md">
                                <h3 className="font-semibold">AI Response:</h3>
                                <div className="response-content">
                                    <ReactMarkdown
                                        components={renderers}
                                        remarkPlugins={[remarkGfm]} // GitHub flavored markdown support
                                    >
                                        {result?.data}
                                    </ReactMarkdown>
                                </div>
                                <button
                                    onClick={downloadPDF}
                                    className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
                                >
                                    Download as PDF
                                </button>
                                <button
                                        onClick={downloadDOC}
                                        className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
                                    >
                                        Download as DOC
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div >
        </div >
    );
};

export default AssignmentForm;
