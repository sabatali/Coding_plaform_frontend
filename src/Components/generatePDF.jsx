import { jsPDF } from "jspdf";
import React from 'react';

const GeneratePDF = () => {
  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Setting the font for normal text
    doc.setFont("helvetica");
    doc.setFontSize(12);

    // Adding formatted content to the PDF
    doc.text("## Assignment: A Comprehensive Exploration of Logical Laws in Discrete Structures", 10, 10);
    doc.text("**Select Length:** 2000 words", 10, 20);
    
    // Adding bold text
    doc.setFont("helvetica", "bold");
    doc.text("**Select Language Style:**", 10, 30);
    
    // Switching to normal text again
    doc.setFont("helvetica", "normal");
    doc.text("Formal Academic English", 80, 30);
    
    doc.text("**Select Academic Level:** Undergraduate (Junior/Senior level)", 10, 40);
    
    // Adding more sections with bold and normal texts
    doc.setFont("helvetica", "bold");
    doc.text("**Select Structure:**", 10, 50);
    doc.setFont("helvetica", "normal");
    doc.text("Problem-based learning with a concluding synthesis essay.", 80, 50);
    
    doc.setFont("helvetica", "bold");
    doc.text("**Select Research Depth:**", 10, 60);
    doc.setFont("helvetica", "normal");
    doc.text("Moderate (requiring in-depth understanding of concepts, not easy)", 80, 60);
    
    // Adding line skip (next section starts after line break)
    doc.addPage();
    
    // Continue adding sections
    doc.setFont("helvetica", "bold");
    doc.text("**Select References:**", 10, 10);
    doc.setFont("helvetica", "normal");
    doc.text("5-7 peer-reviewed journal articles and/or textbooks.", 80, 10);

    doc.setFont("helvetica", "bold");
    doc.text("**Select Citation Style:**", 10, 20);
    doc.setFont("helvetica", "normal");
    doc.text("APA 7th edition", 80, 20);

    // More sections with proper formatting
    doc.setFont("helvetica", "bold");
    doc.text("**Select Tone:**", 10, 30);
    doc.setFont("helvetica", "normal");
    doc.text("Objective and analytical, with a clear presentation of evidence and reasoning.", 80, 30);

    doc.setFont("helvetica", "bold");
    doc.text("**Select Visual Elements:**", 10, 40);
    doc.setFont("helvetica", "normal");
    doc.text("Truth tables for each law, Venn diagrams illustrating set relationships.", 80, 40);

    doc.setFont("helvetica", "bold");
    doc.text("**Select Point of View:**", 10, 50);
    doc.setFont("helvetica", "normal");
    doc.text("Third-person objective.", 80, 50);

    doc.setFont("helvetica", "bold");
    doc.text("**Select Plagiarism Sensitivity:**", 10, 60);
    doc.setFont("helvetica", "normal");
    doc.text("High (Zero tolerance for plagiarism; all sources must be properly cited).", 80, 60);

    doc.setFont("helvetica", "bold");
    doc.text("**Select Critical Thinking:**", 10, 70);
    doc.setFont("helvetica", "normal");
    doc.text("High (Requires analysis, evaluation, and synthesis of information).", 80, 70);

    doc.setFont("helvetica", "bold");
    doc.text("**Select Type of Sources:**", 10, 80);
    doc.setFont("helvetica", "normal");
    doc.text("Peer-reviewed journal articles and/or textbooks.", 80, 80);

    // Save the PDF with a specific name
    doc.save("formatted_response.pdf");
  };

  return (
    <div>
      <button onClick={handleGeneratePDF}>Generate PDF</button>
    </div>
  );
};

export default GeneratePDF;
