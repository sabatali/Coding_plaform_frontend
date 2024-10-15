

const QuestionComponet = (data) => {
    console.log("🚀 ~ QuestionComponet ~ data:", data)



    return (
        <>
            <div className="flex flex-col min-h-screen bg-gray-50 p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 pb-2">{data.data.title}</h1>
                        <h4 className="text-[17px] font-500 text-gray-800 pb-5"> Publish By <span className="bg-gray-100 text-blue-600 p-1 rounded">{data.data.createdByUser || "Sabat Ali"} </span>  in <span className="bg-gray-100 text-blue-600 p-1 rounded"> {data.data.language}</span></h4>
                    </div>
                    <div className="flex justify-start items-start">
                        <h3 className="bg-green-200 text-black px-4 py-2 rounded">{data.data.difficulty}</h3>
                    </div>
                </div>
                <p className="text-1xl font-normal text-gray-700 pb-5 ">{data.data.description}</p>


                <h1 className="text-2xl font-bold text-gray-600 pb-2 ">Hint</h1>
                <code className="text-1xl font-normal text-gray-700 ">{data.data.hint}</code>


                <div className="pb-4 pt-4">
                    <h2 className="text-2xl font-bold text-gray-600 pb-2">Notes</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>
                            Don't forget to <code className="bg-gray-200 text-red-500 p-1 rounded">return</code> the result.
                        </li>
                        <li>
                            If you get stuck on a challenge, find help in the <span className="bg-gray-100 text-blue-600 p-1 rounded">Resources</span> tab.
                        </li>
                        <li>
                            If you're really stuck, unlock solutions in the <span className="bg-gray-100 text-blue-600 p-1 rounded">Solutions</span> tab.
                        </li>
                        <li>
                            Watch this helpful video in the <span className="bg-gray-100 text-blue-600 p-1 rounded">Video</span> tab for more guidance.
                        </li>
                        <li>
                            If you need further assistance, you can chat with AI in the <span className="bg-gray-100 text-blue-600 p-1 rounded">AI Help</span> tab.
                        </li>
                    </ul>
                </div>



            </div>
        </>
    )
}


export default QuestionComponet; 