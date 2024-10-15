import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight, tomorrow, coy, dark, okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Import different themes
import ReactMarkdown from 'react-markdown';

const SolutionComponet = (data) => {
    const text = data.data.solutionDescription
    const [theme, setTheme] = useState(solarizedlight);
    const [line, setLine] = useState(true);
    const [wrap, setWrap] = useState(false);
    const [filter, setFilter] = useState(false);
    const themes = [
        { name: 'Solarized Light', value: solarizedlight },
        { name: 'Tomorrow Night', value: tomorrow },
        { name: 'Coy', value: coy },
        { name: 'Dark', value: dark },
        { name: 'Okaidia', value: okaidia },
    ];

    const handleLine = () => {
        setLine(!line);
    };

    const handleWrap = () => {
        setWrap(!wrap);
    };

    const handleFilter = () => {
        setFilter(!filter);
    };

    const handleThemeChange = (e) => {
        const selectedTheme = themes.find(t => t.name === e.target.value);
        setTheme(selectedTheme.value);
    };

    return (
        <>
            <div className="m-3 p-6 border-2 border-blue-300 rounded-lg shadow-lg bg-white">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-xl font-semibold text-gray-800">
                        {data.data.title}
                    </h2>

                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                        onClick={handleFilter}
                    >
                        Filter
                    </button>
                </div>

                {filter && (
                    <div className='flex gap-5 items-center'>
                        <div className="">
                            <label htmlFor="themeSelect" className="mr-2 font-semibold">Choose a theme:</label>
                            <select id="themeSelect" onChange={handleThemeChange} className="p-2 border rounded-md">
                                {themes.map((themeOption, index) => (
                                    <option key={index} value={themeOption.name}>
                                        {themeOption.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex gap-3 items-center '>
                            <input type="checkbox" onChange={handleLine} checked={line} id="lineCheckbox" />
                            <label htmlFor="lineCheckbox">Show line numbers</label>
                        </div>

                        <div className='flex gap-3 items-center'>
                            <input type="checkbox" onChange={handleWrap} checked={wrap} id="wrapCheckbox" />
                            <label htmlFor="wrapCheckbox">Wrap long lines</label>
                        </div>
                    </div>
                )}

                <SyntaxHighlighter
                    language="cpp"
                    style={theme}
                    showLineNumbers={line}
                    wrapLines={wrap}
                >
                    {data.data.solutionCode}
                </SyntaxHighlighter>

                <div className="border-l-4 mt-6 border-green-500 bg-white shadow-lg p-4 rounded"
            >
                <h2 className="text-xl font-semibold text-gray-800">
                    Code Explanation
                </h2>

                <div dangerouslySetInnerHTML={{ __html: text }} />

            </div>
            </div>

            
        </>
    );
};

export default SolutionComponet;
