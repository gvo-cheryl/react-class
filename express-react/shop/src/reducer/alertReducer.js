// === state1 ============================================================

let defaultAlert = true;

function alertReducer(state = defaultAlert, action) {
  if (action.type === "close") {
    state = false;
  }
  return state;
}

export default alertReducer;
