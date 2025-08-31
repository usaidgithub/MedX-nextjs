import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Upload, FileText, PlusCircle, Trash2, ArrowUpCircle } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const MedicalVault = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileNameInput, setFileNameInput] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/check-auth');
                if (res.ok) {
                    //   router.push('/chatbot');
                    console.log('Authenticated');
                }
            } catch (error) {
                router.push('/login');
                console.error('Error checking authentication:', error);
            }
        };
        checkAuth();
    }, [router]);
    const fetchDocuments = async () => {
        try {
            const res = await fetch("/api/document"); // Our GET endpoint
            const data = await res.json(); // Parse JSON

            if (res.ok) {
                setFiles(data.documents || []); // Update state
                console.log("Received documents:", data.documents); // Log directly
            } else {
                console.error("Error fetching documents:", data.message);
            }
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };
    const getViewableUrl = (fileUrl) => {
        return fileUrl.replace("/raw/", "/upload/");
    };
    useEffect(() => {
        fetchDocuments();
    }, []);
    const handleFileSelect = (file) => {
        setSelectedFile(file);
        setFileNameInput(file.name); // Set initial name to the original file name
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleNameAndUpload = async (event) => {
        event.preventDefault();
        const loadingToastId = toast.loading("Uploading reports...Please wait");
        if (!selectedFile || !fileNameInput) return;

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("fileName", fileNameInput);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Post uploaded successfully!", { id: loadingToastId });
                setFiles([...files, data.document]);
                setSelectedFile(null);
                setFileNameInput("");
            } else {
                toast.error(data.message, { id: loadingToastId });
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to upload post", { id: loadingToastId });
        }
    };


    const handleDeleteFile = (fileId) => {
        // Temporarily remove from UI
        setFiles((prevFiles) => prevFiles.filter(file => file._id !== fileId));

        // If the deleted file was selected, reset selection
        if (selectedFile && selectedFile._id === fileId) {
            setSelectedFile(null);
            setFileNameInput("");
        }
    };


    const formatFileSize = (size) => {
        if (size < 1024) {
            return `${size} B`;
        } else if (size < 1024 * 1024) {
            return `${(size / 1024).toFixed(1)} KB`;
        } else {
            return `${(size / (1024 * 1024)).toFixed(1)} MB`;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans antialiased">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full max-w-6xl mx-auto">
                {/* Header Section */}
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-blue-400 tracking-tight">
                        🔐 Secure Medical Vault
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Your health records, securely stored and easily accessible.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* File Upload Section */}
                    <div className="md:col-span-1 bg-gray-800 rounded-3xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-200 mb-6">Upload Documents</h2>

                        {!selectedFile ? (
                            <div
                                className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl transition-colors duration-200 ease-in-out
                ${isDragging ? "border-blue-500 bg-gray-700" : "border-gray-600 bg-gray-800"}`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <ArrowUpCircle className={`h-16 w-16 mb-4 transition-colors duration-200 ease-in-out ${isDragging ? "text-blue-400" : "text-gray-500"}`} />
                                <p className="text-lg text-gray-300 font-medium text-center">
                                    Drag and drop a file here
                                </p>
                                <p className="text-sm text-gray-500">or</p>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 mt-4 flex items-center gap-2"
                                >
                                    <PlusCircle className="h-5 w-5" /> Choose File
                                </label>
                                <p className="text-xs text-gray-500 mt-2">
                                    PDF formats are accepted.
                                </p>
                            </div>
                        ) : (
                            // Naming and confirmation section
                            <div className="p-6 bg-gray-700 rounded-xl space-y-4">
                                <p className="text-gray-200 text-lg font-semibold">Ready to upload:</p>
                                <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-xl">
                                    <FileText className="h-6 w-6 text-blue-400" />
                                    <span className="truncate text-gray-300">{selectedFile.name}</span>
                                    <span className="text-xs text-gray-500 ml-auto flex-shrink-0">{formatFileSize(selectedFile.size)}</span>
                                </div>
                                <form onSubmit={handleNameAndUpload} className="space-y-4">
                                    <div>
                                        <label htmlFor="fileName" className="block text-gray-400 font-medium mb-2">Name your file:</label>
                                        <input
                                            type="text"
                                            id="fileName"
                                            value={fileNameInput}
                                            onChange={(e) => setFileNameInput(e.target.value)}
                                            className="w-full p-3 rounded-lg bg-gray-900 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="e.g., Blood Test Results 2024"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => { setSelectedFile(null); setFileNameInput(""); }}
                                            className="px-4 py-2 text-sm font-semibold text-gray-400 border border-gray-600 rounded-full hover:bg-gray-700 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105"
                                        >
                                            <Upload className="h-4 w-4" /> Upload File
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Document List Section */}
                    <div className="md:col-span-2 bg-gray-800 rounded-3xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-200 mb-6">
                            My Documents ({files.length})
                        </h2>

                        {files.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500 bg-gray-900 rounded-xl">
                                <FileText className="h-10 w-10 text-gray-600 mb-2" />
                                <p>No medical records found.</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Start by uploading your first document to get started.
                                </p>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {files.map((file) => (
                                    <li
                                        key={file._id}
                                        className="flex items-center justify-between p-5 border border-gray-700 rounded-xl bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-200"
                                    >
                                        {/* Left Side: File Details */}
                                        <div className="flex items-center gap-4 min-w-0">
                                            <FileText className="h-8 w-8 text-blue-400 flex-shrink-0" />
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-gray-200 font-medium truncate">
                                                    {file.fileName}
                                                </span>
                                                <span className="text-sm text-gray-500 mt-1">
                                                    Uploaded: {new Date(file.uploadedAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right Side: Actions */}
                                        <div className="flex items-center gap-4">
                                            <button
                                                className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors duration-200"
                                                onClick={() => window.open(file.fileUrl, "_blank")}
                                            >
                                                View
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-400 transition-colors duration-200"
                                                onClick={() => handleDeleteFile(file._id)}
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MedicalVault;