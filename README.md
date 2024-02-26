# Total Life Front end Application
# React Front-end Application

This is a React front-end application that fetches data from a backend API to display appointments and provides filtering based on time range.

## Features

- **Fetch Data**: Fetches appointment data from a backend API.
- **Display Appointments**: Displays appointments in a table format.
- **Filter by Time Range**: Allows filtering appointments based on a specified time range.
- **Clear Fields**: Provides a button to clear the time range filter fields.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React-Table**: A lightweight library for building tables in React.
- **CSS**: Styling for the application components.

## Usage

1. Clone the repository:

git clone <repository-url>


2. Install dependencies:

npm install


3. Run the application:

npm run start


4. Access the application in your browser at [http://localhost:3000](http://localhost:3000).

## Application Structure

- **public folder**: icons and logo used for styling the application
- **App.css**: CSS file for styling the application components.
- **App.js**: Main component containing the application logic.
- **index.js**: Entry point of the application.

## Application Logic

- Fetches appointment data from the backend API using the `fetch` API.
- Utilizes the `useTable` hook from `react-table` to display appointments in a table format.
- Provides input fields to specify the time range for filtering appointments.
- Implements logic to filter appointments based on the specified time range.
- Includes a button to clear the time range filter fields.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
