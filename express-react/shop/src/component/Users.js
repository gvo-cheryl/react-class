import React, { useReducer, useEffect } from "react";
import axios from "axios";
import { connect, useSelector } from "react-redux";
import userReducer from "../../store/reducer/userReducer";
// import reducer from "../../store/reducer/reducer";

function Users(props) {
  const [state, dispatch] = useReducer(userReducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchUsers = async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch({ type: "SUCCESS", data: response.data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const { loading, data: users, error } = state;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error ...</div>;
  if (!users) return <div>No Users ...</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.username} ({user.name})
        </li>
      ))}
    </ul>
  );
}

function stateToProps(state) {
  return {
    state: state.userReducer,
  };
}

export default connect(stateToProps)(Users);
