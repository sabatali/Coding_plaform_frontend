import axios from "axios";
import { useState } from "react";
import { local_url } from "../../constent";

const ScraperComponet = (data) => {
    const [loading, setLoading] = useState(false);
    let title = data.data.title;
    const [formData, setFormData] = useState({ title });
    const [resources, setResources] = useState([]);
    console.log("🚀 ~ ScraperComponet ~ resources:", resources);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${local_url}/api/v1/resources`, formData);
            setResources(response.data.data);
        } catch (error) {
            console.error('Error fetching question data:', error);
        }
        setLoading(false);
    };

    return (
        <div className="m-4">
            {/* Search Input Field */}

            <div class="flex border-2 border-blue-300 shadow-lg  overflow-hidden mb-5 font-[sans-serif] rounded-lg">
                <input type="text" name="title" placeholder="Search for C++ tutorials..."
                    value={formData.title}
                    onChange={handleChange}
                    required
                    class="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3" />
                <button type='button' onClick={handleSubmit} class="flex items-center justify-center bg-[#007bff] px-5 text-sm text-white">
                    Search
                </button>
            </div>

            {/* Displaying the Search Results */}
            <div className="">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="space-y-4">
                        {resources.length > 0 && resources.map((resource, index) => (
                            <div
                                key={index}
                                className="border-l-4 border-green-500 bg-white shadow-lg p-4 rounded"
                            >
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                    {resource.title}
                                </h3>
                                <p className="text-gray-600 mb-2">
                                    {resource.description}
                                </p>
                                <a
                                    href={resource.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    Read more
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScraperComponet;
