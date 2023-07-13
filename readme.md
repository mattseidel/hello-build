# GitFavorites 🌟

## Description 📝
GitFavorites is an application built using React that allows users to manage their GitHub repositories and mark them as favorites. With a user-friendly interface and seamless integration with the GitHub API, GitFavorites makes it easy to keep track of your most loved repositories.

## Libraries Used 📚
- **Firebase**: Used for authentication purposes. [Official Documentation](https://firebase.google.com/docs)
- **Material-UI**: Provides CSS components for styling the UI. [Official Documentation](https://material-ui.com/)
- **JSON-Server**: Used to create a backend server for handling data storage. [Official Documentation](https://github.com/typicode/json-server)
- **@react-spring/web**: Enables the implementation of animations. [Official Documentation](https://www.react-spring.io/)
- **React**: The main library used for building the application. [Official Documentation](https://reactjs.org/)

## Testing 🔬
Unit tests need to be implemented to ensure the quality and reliability of the code.

## Styling 🎨
Additional CSS styling is required to enhance the visual appeal of the application as it currently appears too plain.

## Bug to Fix 🐛
One bug that needs to be addressed is the issue of not saving user credentials after updating the application. Currently, when the application is refreshed, the user needs to log in again. This inconvenience should be resolved to provide a seamless user experience.

## Installation and Usage 🚀
To start the application, open a new terminal and run the following command:
```
yarn dev
```
*This command will start the application.*

To start the backend server using JSON-Server on port 3000, open another terminal and run the following command:
```
yarn server
```
*This command will start the database server.*

Alternatively, if you prefer to use npm, you can run the following commands in separate terminals:
```
npm run dev
```
```
npm run server
```

## Usage Steps 📋
1. Log in by clicking the "Login" button in the top-right corner.
2. Grant access to the GitHub API when prompted.
3. Once logged in, you will be able to see all your repositories.
4. Clicking on the ❤️ icon will mark a repository as a favorite.
5. To view your favorite repositories, click on the "Favorites" menu.
6. All the information will be saved in the `db.json` file located in the `src` directory.
