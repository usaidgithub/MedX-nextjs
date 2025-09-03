import React, { useState } from 'react';
import { Upload, FileText, Activity, AlertCircle, CheckCircle, Clock, Download, Copy, Heart } from 'lucide-react';

const ReportAnalysisApp = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    setError('');
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF, JPG, or PNG file');
      return;
    }
    
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }
    
    setFile(selectedFile);
  };

  const handleFileInput = (e) => {
    if (e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const analyzeReport = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append('report', file);

      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysis(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze report');
    } finally {
      setLoading(false);
    }
  };

  const parseAnalysisText = (text) => {
    const sections = {};
    const lines = text.split('\n').filter(line => line.trim());
    
    let currentSection = '';
    let currentContent = [];
    
    lines.forEach(line => {
      const trimmed = line.trim();
      
      if (trimmed.includes('REPORT INFORMATION:')) {
        currentSection = 'reportInfo';
        currentContent = [];
      } else if (trimmed.includes('KEY LABORATORY FINDINGS:')) {
        if (currentSection) sections[currentSection] = currentContent;
        currentSection = 'keyFindings';
        currentContent = [];
      } else if (trimmed.includes('CLINICAL ASSESSMENT:')) {
        if (currentSection) sections[currentSection] = currentContent;
        currentSection = 'clinicalAssessment';
        currentContent = [];
      } else if (trimmed.includes('RECOMMENDATIONS:')) {
        if (currentSection) sections[currentSection] = currentContent;
        currentSection = 'recommendations';
        currentContent = [];
      } else if (trimmed.includes('IMMEDIATE ACTIONS:')) {
        if (currentSection) sections[currentSection] = currentContent;
        currentSection = 'immediateActions';
        currentContent = [];
      } else if (trimmed.includes('FOLLOW-UP CARE:')) {
        if (currentSection) sections[currentSection] = currentContent;
        currentSection = 'followUpCare';
        currentContent = [];
      } else if (trimmed.includes('LIFESTYLE IMPROVEMENTS:')) {
        if (currentSection) sections[currentSection] = currentContent;
        currentSection = 'lifestyleImprovements';
        currentContent = [];
      } else if (trimmed.includes('ADDITIONAL TESTS:')) {
        if (currentSection) sections[currentSection] = currentContent;
        currentSection = 'additionalTests';
        currentContent = [];
      } else if (trimmed.includes('DISCLAIMER:') || trimmed.includes('IMPORTANT DISCLAIMER:')) {
        if (currentSection) sections[currentSection] = currentContent;
        currentSection = 'disclaimer';
        currentContent = [];
      } else if (trimmed && !trimmed.includes('═') && !trimmed.includes('🏥')) {
        currentContent.push(trimmed);
      }
    });
    
    if (currentSection) sections[currentSection] = currentContent;
    return sections;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(analysis.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  const downloadReport = () => {
    const element = document.createElement('a');
    const file = new Blob([analysis.result], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `blood-report-analysis-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const sections = analysis ? parseAnalysisText(analysis.result) : {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blood Report Analysis Platform</h1>
              <p className="text-blue-600 text-sm">AI-powered medical insights with professional accuracy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Upload Card */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Upload className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Upload Blood Report</h2>
          </div>

          <div
            className={`
              border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
              ${dragActive 
                ? 'border-blue-400 bg-blue-50' 
                : file 
                ? 'border-blue-300 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-input"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileInput}
            />
            
            <div className="flex flex-col items-center space-y-4">
              <div className={`p-4 rounded-full ${file ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                <FileText className="w-8 h-8" />
              </div>
              
              {file ? (
                <div className="text-center">
                  <p className="text-blue-700 font-medium text-lg">{file.name}</p>
                  <p className="text-blue-600 text-sm">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-800 font-medium text-lg mb-2">
                    Drop your blood report here or click to browse
                  </p>
                  <p className="text-gray-600">
                    Supports PDF, JPG, PNG files up to 10MB
                  </p>
                </div>
              )}
              
              <label htmlFor="file-input" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors font-medium">
                {file ? 'Change File' : 'Select File'}
              </label>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={analyzeReport}
              disabled={!file || loading}
              className={`
                px-8 py-3 rounded-lg font-semibold transition-all text-lg
                ${!file || loading 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                }
              `}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-blue-300 border-t-white rounded-full animate-spin"></div>
                  Analyzing Report...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Analyze Report
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Medical Analysis Report</h2>
                    <p className="text-gray-600">Generated {new Date().toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={downloadReport}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* Report Information */}
            {sections.reportInfo && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Report Information</h3>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  {sections.reportInfo.map((line, index) => (
                    <p key={index} className="text-gray-800 mb-2 last:mb-0">
                      <span className="font-medium text-blue-800">
                        {line.split(':')[0]}:
                      </span>
                      <span className="ml-2">{line.split(':').slice(1).join(':')}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Key Laboratory Findings */}
            {sections.keyFindings && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Key Laboratory Findings</h3>
                </div>
                <div className="space-y-4">
                  {sections.keyFindings.map((finding, index) => {
                    const isAbnormal = finding.toLowerCase().includes('status: high') || 
                                     finding.toLowerCase().includes('status: low') || 
                                     finding.toLowerCase().includes('status: critical');
                    
                    return (
                      <div key={index} className={`rounded-lg p-4 border-l-4 ${
                        isAbnormal 
                          ? 'bg-red-50 border-l-red-400 border border-red-200' 
                          : 'bg-green-50 border-l-green-400 border border-green-200'
                      }`}>
                        <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                          {finding}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Clinical Assessment */}
            {sections.clinicalAssessment && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Clinical Assessment</h3>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  {sections.clinicalAssessment.map((line, index) => (
                    <p key={index} className="text-gray-800 mb-2 last:mb-0 leading-relaxed">
                      {line.startsWith('- ') ? (
                        <span className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          {line.substring(2)}
                        </span>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Immediate Actions */}
              {sections.immediateActions && (
                <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-semibold text-red-800">Immediate Actions</h3>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    {sections.immediateActions.map((action, index) => (
                      <p key={index} className="text-red-700 mb-2 last:mb-0 flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                        {action.replace('•', '').trim()}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Follow-up Care */}
              {sections.followUpCare && (
                <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-800">Follow-up Care</h3>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    {sections.followUpCare.map((item, index) => (
                      <p key={index} className="text-blue-700 mb-2 last:mb-0 flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        {item.replace('•', '').trim()}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Lifestyle Improvements */}
              {sections.lifestyleImprovements && (
                <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-800">Lifestyle Improvements</h3>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    {sections.lifestyleImprovements.map((item, index) => (
                      <p key={index} className="text-green-700 mb-2 last:mb-0 flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                        {item.replace('•', '').trim()}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Tests */}
              {sections.additionalTests && (
                <div className="bg-white rounded-xl shadow-sm border border-purple-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-purple-800">Additional Tests</h3>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    {sections.additionalTests.map((test, index) => (
                      <p key={index} className="text-purple-700 mb-2 last:mb-0 flex items-start gap-2">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                        {test.replace('•', '').trim()}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            {sections.disclaimer && (
              <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      {sections.disclaimer.map((line, index) => (
                        <p key={index} className="text-yellow-800 leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportAnalysisApp;