# C&L AI Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Installation](#installation)
   - [Frontend Setup](#frontend-setup)
   - [Backend Setup](#backend-setup)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Contributing](#contributing)
7. [License](#license)

## Project Overview

C&L AI is a document-based question-answering application that allows users to upload documents (PDFs and Word files) and ask questions about the content. The application uses Natural Language Processing (NLP) techniques with SpaCy to analyze and respond to user queries.

## Features

- Upload documents (PDF and Word formats)
- Ask questions related to the content of the uploaded document
- View chat history in a sidebar
- Loading notification with a progress bar during document processing
- Responsive design

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Python](https://www.python.org/) (version 3.8 or higher)
- [pip](https://pip.pypa.io/en/stable/) (Python package installer)
- [PostgreSQL](https://www.postgresql.org/) (if using PostgreSQL as a database)

### Frontend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/cl-ai.git
   cd cl-ai/frontend
   ```

Usage
Upload a Document: Click on the file input to upload a PDF or Word document.
Ask a Question: Type your question related to the content of the uploaded document in the text area and click "Submit."
View Responses: Responses will appear in the chat history on the left sidebar.

API Endpoints

You can use BASE_URL/swagger/ To get API points

Document Upload
POST /api/documents/
Uploads a document and returns an ID for querying.
Submit Query
POST /api/documents/{document_id}/query/
Submits a query related to the uploaded document and returns the response.
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch: git checkout -b feature-branch.
Make your changes and commit them: git commit -m 'Add a new feature'.
Push to the branch: git push origin feature-branch.
Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
