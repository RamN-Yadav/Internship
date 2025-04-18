import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { MdEmojiEvents } from "react-icons/md";

const quizData = [
  {
    question: "What does MERN stand for?",
    options: [
      "MongoDB, Express, React, Node",
      "MySQL, Express, Redux, Node",
      "MongoDB, Ember, React, Node",
      "MongoDB, Express, React, Nginx",
    ],
    answer: "MongoDB, Express, React, Node",
  },
  {
    question: "Which database is used in the MERN stack?",
    options: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
    answer: "MongoDB",
  },
  {
    question: "Which framework is used for backend development in MERN?",
    options: ["Express.js", "Django", "Flask", "Spring Boot"],
    answer: "Express.js",
  },
  {
    question: "What is React primarily used for?",
    options: [
      "Backend development",
      "Styling websites",
      "Building user interfaces",
      "Managing databases",
    ],
    answer: "Building user interfaces",
  },
  {
    question: "Which command is used to create a new React app?",
    options: [
      "npx create-react-app my-app",
      "npm install react",
      "react-init my-app",
      "create-react my-app",
    ],
    answer: "npx create-react-app my-app",
  },
  {
    question: "Which of the following is NOT a valid MongoDB data type?",
    options: ["String", "Integer", "Boolean", "Character"],
    answer: "Character",
  },
  {
    question: "What is the default port for a MongoDB server?",
    options: ["3306", "27017", "8080", "5432"],
    answer: "27017",
  },
  {
    question: "Which package is used to handle routes in Express.js?",
    options: ["express-router", "react-router", "express-routes", "route-express"],
    answer: "express-router",
  },
  {
    question: "What does JSX stand for in React?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JavaScript eXtension",
      "JSON Syntax XML",
    ],
    answer: "JavaScript XML",
  },
  {
    question: "Which lifecycle method is used in React to fetch data when the component mounts?",
    options: [
      "componentDidUpdate",
      "componentWillUnmount",
      "componentDidMount",
      "useEffect",
    ],
    answer: "componentDidMount",
  },
  {
    question: "Which of the following is used to define a schema in MongoDB?",
    options: ["Mongoose", "Sequelize", "Knex", "MongoClient"],
    answer: "Mongoose",
  },
  {
    question: "Which function is used to send a JSON response in Express.js?",
    options: ["res.send()", "res.write()", "res.json()", "res.end()"],
    answer: "res.json()",
  },
  {
    question: "Which command is used to install dependencies in a Node.js project?",
    options: ["npm install", "node install", "install npm", "node package"],
    answer: "npm install",
  },
  {
    question: "Which HTTP method is used to update data in a REST API?",
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: "PUT",
  },
  {
    question: "What is the main purpose of Redux in a React application?",
    options: [
      "Styling components",
      "Managing global state",
      "Handling API requests",
      "Creating UI components",
    ],
    answer: "Managing global state",
  },
  {
    question: "Which hook is used to manage state in a functional component?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    answer: "useState",
  },
  {
    question: "Which command is used to start a Node.js server?",
    options: ["node start", "npm start", "node server.js", "run node"],
    answer: "node server.js",
  },
  {
    question: "What does the 'useEffect' hook do in React?",
    options: [
      "Handles state management",
      "Runs side effects in functional components",
      "Manages component styling",
      "Handles routing in React",
    ],
    answer: "Runs side effects in functional components",
  },
  {
    question: "Which of the following is a NoSQL database?",
    options: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"],
    answer: "MongoDB",
  },
  {
    question: "Which of the following is NOT a valid HTTP method?",
    options: ["GET", "POST", "FETCH", "DELETE"],
    answer: "FETCH",
  },
  {
    question: "Which operator is used to check if two values are equal in both value and type in JavaScript?",
    options: ["==", "===", "=", "!=="],
    answer: "===",
  },
  {
    question: "Which command is used to initialize a new Node.js project?",
    options: ["npm start", "node init", "npm init", "node project"],
    answer: "npm init",
  },
  {
    question: "Which middleware is commonly used in Express to parse incoming JSON data?",
    options: ["body-parser", "json-parser", "express-json", "data-parser"],
    answer: "body-parser",
  },
  {
    question: "What is the default port for an Express.js server?",
    options: ["8080", "3000", "5000", "8000"],
    answer: "3000",
  },
  {
    question: "Which method is used to read data from a MongoDB collection using Mongoose?",
    options: ["find()", "fetch()", "query()", "select()"],
    answer: "find()",
  },
  {
    question: "Which of the following is a correct way to create a function in JavaScript?",
    options: [
      "function myFunction() {}",
      "def myFunction() {}",
      "new Function myFunction() {}",
      "create function myFunction() {}",
    ],
    answer: "function myFunction() {}",
  },
  {
    question: "Which HTTP status code represents a successful request?",
    options: ["200", "404", "500", "301"],
    answer: "200",
  },
  {
    question: "Which Node.js module is used to create a web server?",
    options: ["http", "fs", "express", "webserver"],
    answer: "http",
  },
  {
    question: "Which JavaScript keyword is used to declare a constant variable?",
    options: ["var", "let", "const", "static"],
    answer: "const",
  },
  {
    question: "Which method is used to remove an element from an array in JavaScript?",
    options: ["pop()", "remove()", "delete()", "splice()"],
    answer: "pop()",
  },
  {
    question: "Which of the following is used to install dependencies in a project using Yarn?",
    options: ["yarn install", "yarn add", "npm install", "install yarn"],
    answer: "yarn install",
  },
];

export default function Quizzes() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { user } = useContext(UserContext);

  const correctAnswer = quizData[currentQuestion].answer;

  const handleAnswer = (option) => {
    setSelectedAnswer(option);

    if (option === correctAnswer) {
      setScore(score + 1);
    }

    // Move to the next question after 1 second
    setTimeout(() => {
      setSelectedAnswer(null);

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-blue-400 to-green-300 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[40rem] h-auto text-center transform transition-all duration-500 hover:scale-105">
        {showResult ? (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-green-600">🎉 Quiz Completed!</h2>
            <p className="mt-4 text-xl font-semibold">
              Your Score: <span className="text-blue-600">{score}</span> / {quizData.length}
            </p>
            <button 
              className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setShowResult(false);
              }}
            >
              🔄 Restart
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <div className="flex items-center justify-center text-2xl font-semibold text-red-600">
              {user.name} <MdEmojiEvents className="ml-2 text-yellow-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mt-6">
              {quizData[currentQuestion].question}
            </h2>
            <div className="mt-6 space-y-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <button 
                  key={index} 
                  className={`w-full px-5 py-3 text-lg font-medium rounded-lg shadow-md transition-all duration-300 hover:scale-105
                    ${
                      selectedAnswer
                        ? option === correctAnswer
                          ? "bg-green-500 text-white" // Correct answer always green
                          : option === selectedAnswer
                          ? "bg-red-500 text-white" // Wrong answer red
                          : "bg-gray-300 text-black" // Disable other options
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null} // Disable buttons after selecting
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}