import api from "../../api";
import ACTION_TYPES from "../actions/actionTypes";

// REDUX THUNK asenkron aksiyonu

export const getBasket = () => (dispatch) => {
  dispatch({ type: ACTION_TYPES.BASKET_LOADING });

  api
    .get("/cart")
    .then((res) =>
      dispatch({ type: ACTION_TYPES.BASKET_SUCCESS, payload: res.data })
    )
    .catch((err) =>
      dispatch({ type: ACTION_TYPES.BASKET_ERROR, payload: err.message })
    );
};

// Sepete yeni ürün ekleyecek
export const createItem = (product) => (dispatch) => {
  // 1)Sepete kaydedilecek veriyi hazırla
  const newItem = {
    id: product.id,
    title: product.title,
    price: product.price,
    photo: product.photo,
    restaurantId: product.restaurantId,
    amount: 1,
  };

  // 2) api'a sepete eklemek için istek at
  api
    .post("/cart", newItem)
    // 3) istek başarılı olursa reducer'a haber gönder
    .then((res) =>
      dispatch({ type: ACTION_TYPES.CREATE_ITEM, payload: res.data })
    )
    .catch(() => alert("Bir sorun oluştu"));
};

// Sepeteki ürünün miktarını güncelleyecek fonksiyon
export const updateItem = (id, newAmount) => (dispatch) => {
  // api'a güncelleme isteği at

  api
    .patch(`/cart/${id}`, { amount: newAmount })
    //İstek başarılı olursa reducer'a haber ver
    .then((res) =>
      dispatch({ type: ACTION_TYPES.UPDATE_ITEM, payload: res.data })
    )
    .catch((err) => alert("işlem başarısız oldu"));
};

//Sepetteki ürür direkt kaldıracak fonksiyon

export const removeItem = (id) => (dispatch) => {
  api
    .delete(`/cart/${id}`)
    .then(() => dispatch({ type: ACTION_TYPES.REMOVE_ITEM, payload: id }))
    .catch(() => alert("işlem başarısız oldu"));
};
