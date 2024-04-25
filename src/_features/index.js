import authReducer from "./authSlice"
import cartReducer from "./cartSlice"
import commonSlice from "./commonSlice"
import companySlice from "./companySlice"
import ordersSlice from "./ordersSlice"
import usersSlice from "./usersSlice"
const rootReducers = {
  auth: authReducer,
  cart: cartReducer,
  common: commonSlice,
  company: companySlice,
  users: usersSlice,
  orders: ordersSlice,
}

export default rootReducers
