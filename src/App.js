import "./App.css";
import * as React from "react";
import { useTable } from "react-table";

function App() {
  const [data, setData] = React.useState([]); // State to hold the fetched data
  const [startTime, setStartTime] = React.useState(""); // State to hold the start time
  const [endTime, setEndTime] = React.useState(""); // State to hold the end time
  const handleClearFields = () => {
    setStartTime("");
    setEndTime("");
  };

  // Fetch data from your backend API
  React.useEffect(() => {
    fetch("http://localhost:3001/appointments") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array to run effect only once on component mount

  const columns = React.useMemo(
    () => [
      {
        Header: "Clinician_Id",
        accessor: "clinician_id",
      },
      {
        Header: "Clinician_Name",
        accessor: "clinician_full_name",
      },
      {
        Header: "Patient_Id",
        accessor: "patient_id",
      },
      {
        Header: "Patient_Name",
        accessor: "patient_full_name",
      },
      {
        Header: "Appointment_Datetime",
        accessor: "appointment_datetime",
      },
      {
        Header: "Appointment_Purpose",
        accessor: "appointment_purpose",
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Filter function to check if appointment time falls within the specified range
  const isWithinTimeRange = (appointmentTime) => {
    if (!startTime) return true; // Return true if no start time is specified

    const appointmentTimestamp = new Date(appointmentTime).getTime();
    const startTimestamp = new Date(startTime).getTime();
    const endTimestamp = new Date(endTime).getTime();

    return appointmentTimestamp >= startTimestamp && (!endTime || appointmentTimestamp <= endTimestamp);
  };

  // Filter appointments based on the specified time range
  const filteredRows = React.useMemo(() => {
    return rows.filter(row => isWithinTimeRange(row.original.appointment_datetime));
  }, [rows, startTime, endTime]);

  // Function to handle filter button click
  const handleFilterClick = () => {
    // Refetch data from the API to apply the time filter
    fetch("http://localhost:3001/appointments") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="App">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
        {/* Time range filter inputs */}
        <div className="flex space-x-4 mb-4">
          <div>
            <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">Start Time:</label>
            <input
              type="datetime-local"
              id="start-time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">End Time:</label>
            <input
              type="datetime-local"
              id="end-time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            onClick={handleClearFields}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Clear Fields
          </button>
        </div>
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {filteredRows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
