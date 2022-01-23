import React, { useState, useEffect } from "react";

import useLocalStorage from './local/useLocalStorage'

const style = {
  table: {
    borderCollapse: "collapse"
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px"
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px"
    },
    inputs: {
      marginBottom: "5px"
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "violet",
      fontSize: "14px",
      borderRadius: "5px"
    }
  }
};

let entries_data = [];

function App() {
  const [entries, setEntries] = useLocalStorage("name",entries_data);

  useEffect(() => {
    console.log("application:", JSON.stringify(entries, null, 2));

    return () => console.log("App is re-rendering!");
  });

  const addEntry = entry => {
    setEntries(entries => [...entries, entry]);
  };

  return (
    <section>
      <h1>Phone Book</h1>
      <PhoneBookForm addEntry={addEntry} />
      <InformationTable entries={entries} />
    </section>
  );
}

const initiateEntry = {
  firstName: "",
  lastName: "",
  phone: ""
};

function PhoneBookForm({ addEntry}) {
  const [entry, setEntry] = useState(initiateEntry);

  useEffect(() => console.log("Form is rendering"));

  const handleSubmit = e => {
    e.preventDefault();
    addEntry(entry);
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setEntry(entry => ({ ...entry, [name]: value }));

    console.log({ name, value });
  };



 

  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>Ime:</label>
      <br />
      <input
        style={style.form.inputs}
        name="firstName"
        type="text"
        value={entry.firstName}
        onChange={handleChange}
      />
      <br />
      <label>Prezime:</label>
      <br />
      <input
        style={style.form.inputs}
        className="lastName"
        name="lastName"
        type="text"
        value={entry.lastName}
        onChange={handleChange}
      />
      <br />
      <label>Telefon:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="phone"
        type="text"
        value={entry.phone}
        onChange={handleChange}
      />
      <br />
      <input style={style.form.submitBtn} type="submit" value="Add User" />
    </form>
  );
}






function InformationTable({ entries}) {



  return (
    <>
      <table style={style.table} className="informationTable">
        <thead>
          <tr>
            <th style={style.tableCell}>Ime</th>
            <th style={style.tableCell}>Prezime</th>
            <th style={style.tableCell}>Broj telefona</th>
            
          </tr>
        </thead>
        <tbody>
          {!entries.length && <p>No data :( </p>}
            
          {entries.map(entry => (
            <PhoneBookEntry 
            entry={entry} 
            key={entry.firstName}
          
            />
            
          ))}
          
        </tbody>
       
      </table>
    </>
  )
          };

function PhoneBookEntry({ entry }) {
  return (
    <tr>
      <td>{entry.firstName}</td>
      <td>{entry.lastName}</td>
      <td>{entry.phone}</td>
      <td><button >Delete</button></td>
    </tr>
  );
};

export default App;
