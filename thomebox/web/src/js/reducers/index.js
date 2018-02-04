import {combineReducers} from "redux"

import explorer from "./explorerReducer"
import gallery from "./galleryReducer"

export default combineReducers({ explorer, gallery })