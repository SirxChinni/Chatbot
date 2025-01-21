# Chatbot for Generic Question Answering

## Description
This chatbot is designed to answer a variety of generic questions based on user input. Built with a React frontend, Node.js backend, and MySQL database, the app fetches responses from a predefined set of commands stored in the database. If the user's question is not in the predefined set, the chatbot will respond with "I don't understand."

## Features
- **User Interaction**: Users can send messages to the chatbot, and it responds with a relevant answer if the question matches one in the database.
- **Database Integration**: The chatbot uses MySQL to store predefined commands and responses.
- **Fallback Response**: If the chatbot doesn't recognize the input, it will respond with "I don't understand."

## Sample Commands

Here are some sample questions you can ask the chatbot:

| **Command**                     | **Response**                                                                                                     |
|----------------------------------|------------------------------------------------------------------------------------------------------------------|
| What is your name?               | I am a chatbot.                                                                                                  |
| How are you?                     | I am functioning well, thank you!                                                                                 |
| Hi                               | Hi! I am chatbot and I am here to assist you.                                                                    |
| What can you do?                 | I can answer questions, provide information, and assist you with your queries.                                   |
| Can you tell me a joke?          | Sure! Why don't skeletons fight each other? They don't have the guts!                                              |
| Are you human?                   | No, I am not human, but I am here to make your interactions easier and enjoyable.                                 |
| Can you play games?              | While I can't play games like humans, I can help you learn or play simple text-based games.                      |
| How do you work?                 | I work by analyzing your input and providing the best possible response.                                          |
| Can you tell me a fun fact?      | Sure! Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible! |
| Do you have emotions?            | I don't have emotions like humans, but I am designed to make your experience enjoyable and informative!           |

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js
- **Database**: MySQL

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
