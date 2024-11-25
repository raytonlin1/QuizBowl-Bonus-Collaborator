# Quizbowl Chatter
This project was inspired by my love of learning things through quizbowl, but there were a lack of ways to collaborate in our studying the friends. I decided to make a chat app that could use QBReader so we could collaborate on bonuses.

## What It Does
It includes real-time chat with different logged in users, that can have different usernames and profile pictures. Built-in QBReader functionality using their API will be added.

### Chatting
<img src="https://github.com/user-attachments/assets/8a8bdd14-9ca3-4c56-bf2b-930af217d661" alt="logo" width="750" height="auto">
 </p>


## Technologies
This project is a monorepo with a combination of 2 npm projects, the backend server and the frontend UI. So there are two `package.json` configs.
  1. [`server/package.json`](package.json) for [Node server](server/) & [NestJS](https://nestjs.com/)
  2. [`client/package.json`](react-ui/package.json) for [React web UI](react-ui/)
      * generated by [create-react-app](https://github.com/facebookincubator/create-react-app)
The frontend is deployed using AWS Amplify, and the server is deployed using AWS Elastic Beanstalk, with files being stored in AWS S3 buckets and data being stored using MongoDB.

## Contributing
Want to work on this project?  Check out our [contributing guidelines](CONTRIBUTING.md)!


## Find a bug?
Create an issue [here](https://github.com/raytonlin1/QuizBowl-Bonus-Collaborator/issues/new) and I'll get back to you!
