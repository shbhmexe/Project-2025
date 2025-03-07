# Candidate Application

This project is a candidate application form built with Next.js for the frontend and Prisma for the backend. It allows candidates to submit their information, including a resume, which is then parsed and stored in a vector database for further analysis and evaluation using the Google Gemini API.

## Features

- Candidate application form with fields for name, email, LinkedIn URL, resume, and skills & experience
- Resume parsing using `pdf-parse`
- Storing resume vectors in Pinecone
- Integration with Google Gemini API for AI-powered candidate evaluation

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Pinecone API Key
- Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/candidate-application.git
   cd candidate-application
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your PostgreSQL, Pinecone, and Google Gemini API keys:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/candidateapp
   PINECONE_API_KEY=your_pinecone_api_key
   GEMINI_API_KEY=your_gemini_api_key
   PINECONE_INDEX=your_pinecone_index_name
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to see the application form.

## Usage

- Fill in the candidate application form and submit your details.
- The resume will be parsed, and the candidate information will be stored in the database.
- The AI-powered evaluation will provide feedback on the candidate's fit for the job description.

## License

This project is licensed under the MIT License.