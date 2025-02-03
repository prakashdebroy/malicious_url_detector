#    IITK Hackathon ( PS2 )
#  Malicious URL Detector 

## Project Overview
The Malicious URL Detector is a web application that allows users to check whether a given URL is safe or potentially harmful. It integrates with an Whois API that analyzes the provided URL and returns a result indicating whether it is safe or not.

## Features
- URL Safety Check: Users can input a URL, and the app will analyze its safety.
- API Response: The application communicates with a backend API to fetch the URL safety status.
- User-Friendly Interface: A simple and clean UI for ease of use.
- Error Handling: Proper error messages for invalid URLs, network failures, and unexpected API responses.

## Tech Stack
### Frontend
- React.js
- CSS (for styling)

### Backend
- FastAPI / Flask

## Installation & Setup

Clone the Repository.

We have to dawnload the node_modules inside the 

to Dawnload node_modules follow this :

1) open Git Bash inside the URL-detector file
2) Run command :
        1. npm install
        2. npm install react react-dom
        3. npm start

3) Then you have to Start the Server.js which can be done by a command node server.js 

4) Done now you can Check it using react web.

## Configuration
- Ensure the backend is running and accessible from the frontend.

# How we made this?
We 1st year student at National Forensic Sciences University, Started with basic to cover the PS2.
1) Make the Backend which is Whois API takes URL from user local host server and ckeck the Legitimate of URL by analysing SSL,Whois Info of the url.
2) We then jump to make the UI version of this using react app.

3) We tried to Jump for real - time Detection like using extension but due to less time we have to stop there.

## Team Deauth Defy
#### - Anshul Rajkumar
#### - Prakash Debroy
#### - Priyanshu Sahoo

