import AIComponent from "../Components/QuestionComponents/AIComponet"



export const ChatWithAI = () => {

    const data = {
        title : ""
    }

    return(
        <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-xl">
        <AIComponent data={{data}}/>
        </div>
    )
}
