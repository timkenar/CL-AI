import React, { useState } from 'react'; 
import { uploadDocument, submitQuery } from './service';
import LoadingNotification from './loading';

const MainPage = () => {
    const [file, setFile] = useState(null);
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [progress, setProgress] = useState(0); // Progress state

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setProgress(0); // Reset progress

        if (!file) {
            setError('Please upload a document before asking a question.');
            setLoading(false);
            return;
        }

        // Add user's query to messages
        setMessages((prevMessages) => [...prevMessages, { text: query, type: 'user' }]);
        
        try {
            // Simulate loading progress
            for (let i = 0; i <= 100; i += 10) {
                setProgress(i);
                await new Promise(resolve => setTimeout(resolve, 120)); // Simulate loading delay
            }

            const docResponse = await uploadDocument(file);
            const documentId = docResponse.id;

            // Simulate more loading
            for (let i = 100; i <= 100; i += 0) {
                setProgress(100);
                await new Promise(resolve => setTimeout(resolve, 120));
                break; // End the loop after setting progress to 100
            }

            const queryResponse = await submitQuery(documentId, query);
            setMessages((prevMessages) => [...prevMessages, { text: queryResponse.answer, type: 'bot' }]);
            setQuery(''); // Clear the query input after submission
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to process your request. Please try again.');
            setMessages((prevMessages) => [...prevMessages, { text: 'Error processing request. Please try again.', type: 'bot' }]);
        } finally {
            setLoading(false);
            setProgress(0); // Reset progress after loading
        }
    };

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    return (
        <div className="container mx-auto p-4 flex">
            {loading && <LoadingNotification message="Uploading Document" progress={progress} />}
            
            {sidebarVisible && (
                <div className="w-1/3 bg-gray-600 p-4 border rounded-l">
                    <h2 className="font-bold">Chat History</h2>
                    <div className="space-y-2 h-96 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`p-2 rounded ${msg.type === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={`flex-grow p-4 ${sidebarVisible ? 'ml-4' : ''}`}>
                <header className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl font-bold">C&L AI</h1>
                    <button onClick={toggleSidebar} className="bg-blue-500 text-white rounded p-2">
                        {sidebarVisible ? 'Hide Chat History' : 'Show Chat History'}
                    </button>
                </header>

                <div className="flex flex-col h-full">
                    <div className="flex-grow overflow-y-auto p-4 border rounded bg-black shadow-md">
                        {messages.map((msg, index) => (
                            <div key={index} className={`my-2 p-2 rounded ${msg.type === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4 flex">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="file-input border rounded p-2 mr-2"
                            required
                        />
                        <textarea
                            value={query}
                            onChange={handleQueryChange}
                            placeholder="Ask your question..."
                            className="border rounded p-2 w-full h-16"
                            required
                        />
                        <button type="submit" className="bg-blue-500 text-white rounded p-2 ml-2">
                            Submit
                        </button>
                    </form>
                </div>

                {error && (
                    <div className="mt-4 p-4 border rounded bg-red-600 text-white">
                        <h2 className="font-bold">Error:</h2>
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPage;
