import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("Signup");
  }
};

const signup = (dispatch) => async ({ email, password }) => {
  // make api request to sign up with that email and password
  // if we sign up, modify our state, and say that we are authenticated
  // if signing up fails, we probably need to reflect an error message

  try {
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signup", payload: response.data.token });

    // navigate to main flow
    navigate("TrackList");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with signup",
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  // Try to signin
  // Handle success by updating state
  // Handle failure showing error message (somehow)
  try {
    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });

    // navigate to main flow
    navigate("TrackList");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with signin",
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });

  navigate("Signup");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: "" }
);
