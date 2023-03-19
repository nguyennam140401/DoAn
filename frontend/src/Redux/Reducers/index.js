import { combineReducers } from "redux";
import accountReducer from "./Account.reducer";
import productReducer from "./Product.reducer";
import categoryReducer from "./Category.reducer";
import roleReducer from "./Role.reducer";
import orderReducer from "./Order.reducer";
const rootReducers = combineReducers({
	accountReducer,
	productReducer,
	categoryReducer,
	roleReducer,
	orderReducer,
});
export default rootReducers;
