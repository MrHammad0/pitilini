// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const ChatBot = () => {
// //   const [input, setInput] = useState('');
// //   const [messages, setMessages] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const sendMessage = async () => {
// //     if (!input.trim()) return;

// //     const newMessage = { text: input, sender: 'user' };
// //     setMessages([...messages, newMessage]);
// //     setInput('');
// //     setLoading(true);

// //     try {
// //       const response = await axios.post('https://api.chatbot.com/v2/messages', 
// //         {
// //           message: input
// //         },
// //         {
// //           headers: {
// //             'Authorization': `Bearer tVGKQ8g5hcgkEO7cUs31wsBLHgx96OPi`, // Replace with your API key
// //             'Content-Type': 'application/json',
// //           }
// //         }
// //       );

// //       const botMessage = { text: response.data.message, sender: 'bot' };
// //       setMessages([...messages, newMessage, botMessage]);
// //     } catch (error) {
// //       console.error('Error sending message:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <div>
// //         {messages.map((msg, index) => (
// //           <div key={index} className={msg.sender}>
// //             {msg.text}
// //           </div>
// //         ))}
// //       </div>
// //       <input
// //         type="text"
// //         value={input}
// //         onChange={(e) => setInput(e.target.value)}
// //         placeholder="Type your message..."
// //       />
// //       <button onClick={sendMessage} disabled={loading}>
// //         {loading ? 'Sending...' : 'Send'}
// //       </button>
// //     </div>
// //   );
// // };

// // export default ChatBot;


// import React, { useEffect } from 'react';

// const Chatbot = () => {
//   useEffect(() => {
//     // Ensure that the chat widget script is loaded
//     const script = document.createElement('script');
//     script.src = "https://your-chatbot-api-url.com/widget.js"; // Replace with your actual widget script URL
//     script.async = true;
//     script.onload = () => {
//       window.BE_API = window.BE_API || {};

//       // Initialize chatbot after script has loaded
//       window.BE_API.onLoad = function () {
//         window.BE_API.create();
//       };

//       // Example of using other methods
//       window.BE_API.onChatWindowOpen = function () {
//         console.log('Chat window opened');
//       };

//       window.BE_API.sendMessage = function (message) {
//         console.log('Message sent:', message);
//         window.BE_API.sendMessage(message); // Send message to chatbot
//       };
//     };

//     document.body.appendChild(script);

//     // Cleanup script on component unmount
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Example function to trigger chatbot methods
//   const openChatWindow = () => {
//     if (window.BE_API) {
//       window.BE_API.openChatWindow();
//     }
//   };

//   const closeChatWindow = () => {
//     if (window.BE_API) {
//       window.BE_API.closeChatWindow();
//     }
//   };

//   return (
//     <div>
//       <button onClick={openChatWindow}>Open Chat</button>
//       <button onClick={closeChatWindow}>Close Chat</button>
//     </div>
//   );
// };

// export default Chatbot;
