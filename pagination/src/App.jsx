import { useState } from "react";
import users from "./data/users.json";
import "./App.css";

const columns = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Occupation", key: "occupation" },
];

function usePagination(currentPage, pageSize) {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const totalPage = Math.ceil(users.length / pageSize);
  const usersPerPage = users.slice(start, end);
  return { totalPage, usersPerPage };
}

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { totalPage, usersPerPage } = usePagination(currentPage, pageSize);

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              return <th key={column.key}>{column.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {usersPerPage.map((user) => {
            return (
              <>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.occupation}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <hr />
      <select
        onChange={(e) => {
          setCurrentPage(1);
          setPageSize(Number(e.target.value));
        }}
      >
        {[5, 10, 20].map((size) => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </select>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      <p>
        {currentPage} of {totalPage}
      </p>
      <button
        disabled={currentPage === totalPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </>
  );
}

export default App;
