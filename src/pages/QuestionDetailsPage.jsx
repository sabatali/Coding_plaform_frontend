import { useEffect, useState } from "react";
import AIComponet from "../Components/QuestionComponents/AIComponet";
import QuestionComponet from "../Components/QuestionComponents/QuestionComponet";
import ScraperComponet from "../Components/QuestionComponents/ScraperComponet";
import VideoComponent from "../Components/QuestionComponents/VideoComponet";
import SolutionComponet from "../Components/QuestionComponents/SolutionComponet";
import CommentsComponet from "../Components/QuestionComponents/CommentsComponent";
import axios from "axios";
import { useParams } from "react-router-dom";
import { local_url } from "../constent";

const QuestionDetailsPage = () => {
    const { id } = useParams();
    console.log("🚀 ~ QuestionDetailsPage ~ id:", id)
    const [activeComponent, setActiveComponent] = useState("q");
    const [loading, setLoading] = useState(true);
    const [questionData, setQuestionData] = useState(true);
    console.log("🚀 ~ QuestionDetailsPage ~ questionData:", questionData)



    useEffect(() => {
        const fetchQuestionData = async () => {
          try {
            const response = await axios.get(`${local_url}/api/v1/question/${id}`);
            setQuestionData(response.data.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching question data:', error);
            setLoading(false);
          }
        };
    
        fetchQuestionData();
      }, [id]);

    const handleActiveButton = (act) => {
        setActiveComponent(act);
    };

    const buttonBaseStyle = "w-full p-3 rounded-lg text-lg font-semibold transition-all duration-300";
    const buttonActiveStyle = "bg-blue-600 text-white shadow-lg";
    const buttonInactiveStyle = "bg-gray-300 text-gray-800";

    if (loading) return <p>Loading...</p>;


    return (
        <div className="p-6">
            <div className="flex gap-4 mb-6">
                <button
                    type="button"
                    className={`${buttonBaseStyle} ${activeComponent === "q" ? buttonActiveStyle : buttonInactiveStyle}`}
                    onClick={() => handleActiveButton("q")}
                >
                    Question
                </button>
                <button
                    type="button"
                    className={`${buttonBaseStyle} ${activeComponent === "scp" ? buttonActiveStyle : buttonInactiveStyle}`}
                    onClick={() => handleActiveButton("scp")}
                >
                    Resources
                </button>
                <button
                    type="button"
                    className={`${buttonBaseStyle} ${activeComponent === "ai" ? buttonActiveStyle : buttonInactiveStyle}`}
                    onClick={() => handleActiveButton("ai")}
                >
                    Chat With AI
                </button>
                <button
                    type="button"
                    className={`${buttonBaseStyle} ${activeComponent === "v" ? buttonActiveStyle : buttonInactiveStyle}`}
                    onClick={() => handleActiveButton("v")}
                >
                    Video
                </button>
                <button
                    type="button"
                    className={`${buttonBaseStyle} ${activeComponent === "sol" ? buttonActiveStyle : buttonInactiveStyle}`}
                    onClick={() => handleActiveButton("sol")}
                >
                    Solution
                </button>
                <button
                    type="button"
                    className={`${buttonBaseStyle} ${activeComponent === "com" ? buttonActiveStyle : buttonInactiveStyle}`}
                    onClick={() => handleActiveButton("com")}
                >
                    Comments
                </button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-xl">
                {activeComponent === "q" && <QuestionComponet data={questionData} />}
                {activeComponent === "scp" && <ScraperComponet data={questionData} />}
                {activeComponent === "ai" && <AIComponet data={questionData} />}
                {activeComponent === "v" && <VideoComponent data={questionData} />}
                {activeComponent === "sol" && <SolutionComponet data={questionData} />}
                {activeComponent === "com" && <CommentsComponet data={questionData} />}
            </div>
        </div>
    );
};

export default QuestionDetailsPage;
