let defaultState = [
  { id: 0, name: "cheryl", email: "it.progrowth@gmail.com", active: false },
];

function userReducer(state = defaultState, action) {
  switch (action.type) {
    case "add":
      let newUser = [...state];
      newUser.push(action.data);
      return newUser;
    case "updateActive":
      let users = [...state];
      users.find((user) => {
        if (user.id === action.data.id) {
          return (user.active = action.data.active);
        }
      });
      return users;
    default:
      return state;
  }
}

export default userReducer;
