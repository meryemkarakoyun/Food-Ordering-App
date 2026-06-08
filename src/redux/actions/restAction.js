// asenkron thunk aksiyonu
import ACTION_TYPES from "./actionTypes";
import api from "../../api";

// fonksiyon içinde fonksiyon tanımlamayı 2 farklı şekilde yapabiliriz 1.si aşağıdaki gibi 2.si ise projede kullanacağımız gibi
//    const getRestaurants = () => {
//       return () => {};
//       };

export const getRestaurants = () => (dispatch) => {
  dispatch({ type: ACTION_TYPES.REST_LOADING });

  api
    .get("/restaurants")
    .then((res) =>
      dispatch({ type: ACTION_TYPES.REST_SUCCESS, payload: res.data })
    )
    .catch((err) => ({ type: ACTION_TYPES.REST_ERROR, payload: err.message }));
};
