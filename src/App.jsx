import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AssignmentPrompt from './Components/AssignmentPrompt';
import JavaCodeCompiler from './Components/QuestionComponents/JavaCodeCompiler';
import SgpaCalculator from './Components/SgpaCalculator';
import GeneratePDF from './Components/generatePDF';
import { AuthContext } from './Context/authContext';
import Dashboard from "./dashboard/Dashboard";
import { ChatWithAI } from './pages/ChatWithAI';
import FeedbackPage from './pages/FeedbackPage';
import ProfilePage from './pages/Profile';
import QuestionDetailsPage from './pages/QuestionDetailsPage';
import QuestionTable from './tables/questionTable';
import Login from './template/Login';
import QuestionForm from './template/Question';
import Register from './template/Register';
import Template from "./template/Template";


function App() {
  const { isLogin } = useContext(AuthContext);
  // console.log("🚀 ~ App ~ isLogin:", isLogin);

  return (
    <>
      {!!isLogin ? (
        
        <Template>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assignmentprompt" element={<AssignmentPrompt />} />
            <Route path="/question" element={<QuestionForm />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/ga" element={<GeneratePDF />} />
            <Route path="/chatwith_ai" element={<ChatWithAI />} />
            <Route path="/questions-table" element={<QuestionTable />} />
            <Route path="/questions/:id" element={<QuestionDetailsPage />} />
            <Route path="/feedbacke" element={<FeedbackPage />} />
            <Route path="/java-compiler" element={<JavaCodeCompiler />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/sgpa"
              element={
                <>
                  <SgpaCalculator />
                </>
              }
            />
          </Routes>
        </Template>
      ) : (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
              path="/sgpa"
              element={
                <>
                  <SgpaCalculator />
                </>
              }
            />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
      )}
    </>
  );
}

export default App;
