import React, { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import axios from 'axios';
import { local_url } from '../../constent';

const JavaCodeCompiler = () => {
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
 }`
);

const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(`${local_url}/api/v1/compiler`, { code });
      setOutput(response.data.output || response.data.error);
      setLoading(false)
    } catch (error) {
        console.log("🚀 ~ handleSubmit ~ error:", error)
        setLoading(false)
      setOutput( error.response.data.error || 'Error compiling code.');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-t-lg">
        <div className="text-gray-700 font-semibold">Main.java</div>
        <div className="flex space-x-3">
          {!loading ? (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none" onClick={handleSubmit}>
            Run
          </button>
          ) : (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none" onClick={handleSubmit}>
            Compiling ...
          </button>
            
          )}
        </div>
      </div>

      <div className="border border-gray-300 rounded-b-lg overflow-hidden">
        <CodeEditor
          value={code}
          language="java"
          placeholder="Enter your Java code here"
          onChange={(e) => setCode(e.target.value)}  // Directly update state
          padding={15}
          style={{
            fontSize: 14,
            backgroundColor: '#f5f5f5',
            fontFamily: 'monospace',
            height: '300px',
            overflow: 'auto'
          }}
          className="w-full"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-indigo-600">Output:</h3>
        <div className="bg-gray-100 p-5 rounded-lg border border-gray-300 shadow-md mt-2">
        {!loading ?
          <pre className="whitespace-pre-wrap">
            {output}
          </pre> : "Compiling ..."}
        </div>
      </div>
    </div>
  );
};

export default JavaCodeCompiler;
