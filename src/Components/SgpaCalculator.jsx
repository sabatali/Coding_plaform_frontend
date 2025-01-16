import React, { useState } from "react";

const SgpaCalculator = () => {
  const [subjects, setSubjects] = useState([
    { name: "Civics & Community Engagement", creditHours: 2, percentage: 0, gradePoints: 0, grade: '', totalPoints: 0 },
    { name: "Object Oriented Programming", creditHours: 4, percentage: 0, gradePoints: 0, grade: '', totalPoints: 0 },
    { name: "Accounting Fundamentals", creditHours: 3, percentage: 0, gradePoints: 0, grade: '', totalPoints: 0 },
    { name: "Discrete Structures", creditHours: 3, percentage: 0, gradePoints: 0, grade: '', totalPoints: 0 },
    { name: "Expository Writing", creditHours: 3, percentage: 0, gradePoints: 0, grade: '', totalPoints: 0 },
    { name: "Calculus and Analytical Geometry", creditHours: 3, percentage: 0, gradePoints: 0, grade: '', totalPoints: 0 },
  ]);

  const [showAlert, setShowAlert] = useState(true);

  // Close the alert message
  const closeAlert = () => {
    setShowAlert(false);
  };

  const [sgpa, setSgpa] = useState(null);

  // Handle changes in subject details
  const handleInputChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = field === "creditHours" || field === "percentage" || field === "gradePoints"
      ? parseFloat(value) || 0
      : value; // For numbers, parse; for names, keep string
    // Recalculate grade points based on percentage
    if (field === "percentage") {
      updatedSubjects[index].gradePoints = calculateGradePoints(value);
      updatedSubjects[index].grade = calculateGrade(value);
      updatedSubjects[index].totalPoints = updatedSubjects[index].creditHours * updatedSubjects[index].gradePoints; // Update total points
    }
    setSubjects(updatedSubjects);
  };

  // Calculate grade points based on percentage
  const calculateGradePoints = (percentage) => {
    if (percentage >= 90) return 4.0;
    if (percentage >= 80) return 4.0;
    if (percentage >= 75) return 3.5;
    if (percentage >= 70) return 3.0;
    if (percentage >= 65) return 2.5;
    if (percentage >= 60) return 2.0;
    if (percentage >= 55) return 1.5;
    if (percentage >= 50) return 1.0;
    return 0.0;
  };

  // Calculate grade based on percentage
  const calculateGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 75) return "B+";
    if (percentage >= 70) return "B";
    if (percentage >= 65) return "C+";
    if (percentage >= 60) return "C";
    if (percentage >= 55) return "D+";
    if (percentage >= 50) return "D";
    return "F";
  };

  // Calculate SGPA
  const calculateSGPA = () => {
    let totalWeightedPoints = 0;
    let totalCreditHours = 0;

    subjects.forEach((subject) => {
      totalWeightedPoints += subject.creditHours * subject.gradePoints;
      totalCreditHours += subject.creditHours;
    });

    const calculatedSgpa = totalCreditHours
      ? (totalWeightedPoints / totalCreditHours).toFixed(2)
      : 0;

    setSgpa(calculatedSgpa);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex gap-80 mb-4 items-center mt-2">
      <div><h1 className="text-2xl font-bold">SGPA Calculator</h1><div className="text-lg font-medium text-gray-600">
        Developed By <a className="text text-blue-700" href="https://www.linkedin.com/in/sabat-ali/">Sabat Ali</a>
      </div></div>
     <div>
     <button
        onClick={calculateSGPA}
        className="mt-2 px-6 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
      >
        Calculate SGPA
      </button>
     </div>
      </div>
     
      {showAlert && (
        <div className="bg-blue-50 border-t-4 border-blue-500 text-blue-700 px-6 py-4 mb-3 rounded-lg shadow-md">
          <div className="flex relative justify-between items-center">
            <div className="flex-1 pr-4">
              <p className="font-semibold text-lg">Informational message</p>
              <ul className="text-sm mt-2 list-inside pl-4 list-disc">
                <li>You can update the Subject Name, Credit Hours, and Percentage fields for each subject.</li>
                <li>The Grade Points, Grade, and Total Points will be calculated automatically based on the entered percentage and credit hours.</li>
                <li>Click on Calculate SGPA to view your calculated SGPA.</li>
                <li>Your changes will be saved automatically as you edit the fields.</li>

                <li>If you encounter any issues, please double-check your inputs.</li>
                <li>For any other errors or issues, kindly contact us at <a href="mailto:maliksabatali@gmail" className="text-blue-500 hover:text-blue-700">maliksabatali@gmail</a>.</li>
              </ul>
            </div>
            <button
              onClick={closeAlert}
              className="ml-4 absolute top-0 right-10 text-blue-700 hover:text-blue-900 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 4.293a1 1 0 011.414 0L10 6.586l2.293-2.293a1 1 0 111.414 1.414L11.414 8l2.293 2.293a1 1 0 01-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 11-1.414-1.414L8.586 8 6.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {sgpa !== null && (
        <div className="m-4  bg-white p-4 rounded shadow-md w-full max-w-4xl ">
         <h4 className="text-xl font-bold text-gray-700"> Your SGPA is: {sgpa}</h4>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
        {subjects.map((subject, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Subject Name:
              </label>
              
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={subject.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Percentage:
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={subject.percentage}
                onChange={(e) =>
                  handleInputChange(index, "percentage", e.target.value)
                }
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Credit Hours:
              </label>
              <input
                type="number"
                min="0"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={subject.creditHours}
                onChange={(e) =>
                  handleInputChange(index, "creditHours", e.target.value)
                }
              />
            </div>
           
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Grade Points:
              </label>
              <input
                type="number"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={subject.gradePoints}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Grade:
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={subject.grade}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Points:
              </label>
              <input
                type="number"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={subject.totalPoints}
                readOnly
              />
            </div>
          </div>
        ))}
      </div>
     
      
    </div>
  );
};

export default SgpaCalculator;
