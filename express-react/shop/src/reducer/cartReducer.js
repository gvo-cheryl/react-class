// === state2 ============================================================

export const increase = (i) => ({
  type: "increase",
  id: i,
});

export const increaseAsync = (i) => (dispatch) => {
  console.log(i);
  setTimeout(() => {
    dispatch({
      type: "increase",
      id: i,
    });
  }, 100);
};

let defaultState = [
  { id: 1, name: "awesome", quantity: 2 },
  { id: 2, name: "aweful", quantity: 10 },
];

function cartReducer(state = defaultState, action) {
  let copyState = null;
  switch (action.type) {
    case "increase":
      copyState = [...state];
      copyState[action.id].quantity++;
      return copyState;
    case "decrease":
      copyState = [...state];
      copyState[action.id].quantity--;
      return copyState;
    case "addCart":
      return checkData(state, action.data);
    default:
      return state;
  }
}

function checkData(state, newData) {
  let copy = [...state];
  let exist = copy.find((each) => {
    if (each.name === newData.name) {
      each.quantity += newData.quantity;
      return true;
    }
  });
  if (!exist) {
    copy.push(newData);
  }
  return copy;
}

export default cartReducer;
