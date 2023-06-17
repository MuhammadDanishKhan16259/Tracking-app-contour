[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ab9c80f5bc49485c905584e838e73368)](https://app.codacy.com?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

# Activity Tracker App (Frontend)
This is the frontend application for the Activity Tracker app. It provides a beautiful user interface and various functionalities to track and manage activities.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/activity-tracker-frontend.git
   ```
2. Navigate to the project directory:
   ```shell
    cd activity-tracker-backend
    ```
3. Install the dependencies:
    ```shell
    npm i
    ```
4. Start the server:
    ```shell
    npm run dev
    ```
The server will start running on the specified port.

## Usage

1. **Login**: Access the login page to log in to your account and access the dashboard.

2. **Signup**: If you don't have an account, sign up for a new account through the signup page.

3. **Dashboard**: Once logged in, you'll be redirected to the dashboard page, where you can manage your activities.

4. **Add Activity**: Click on the "Add Activity" button on the dashboard to open a modal. Fill in the activity details (name, date, duration, notes) and submit the form to add a new activity.

5. **Viewing Activities**: Activities added by the user will be displayed as cards on the dashboard. Each card shows relevant information and may have options to edit or delete the activity.

6. **Pagination**: If you have a large number of activities, pagination is implemented to improve usability. Navigate between pages to view additional activities.

7. **Logout**: To log out from the app, click on the logout option in the sidebar.

## Dependencies
The application uses vite: it is a build tool that aims to provide a faster and leaner development experience for modern web projects.

The frontend application relies on several dependencies to provide its functionality and design:

@headlessui/react
@material-tailwind/react
@reduxjs/toolkit
antd
axios
bootstrap
postcss-import
react
react-bootstrap
react-dom
react-icons
react-redux
react-router
react-router-dom
tailwind
Make sure to install these dependencies before running the application.

## Contributing
Contributions to the Activity Tracker app are welcome! If you would like to contribute, please follow the guidelines outlined in the contribution guidelines file.

## License
This project is licensed under the [MIT License](LICENSE). You can find more details in the LICENSE file.
