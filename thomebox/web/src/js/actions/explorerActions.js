import axios from "axios";

export function changeCurrentFolderTo (folderId) {

  return function (dispatch) {
    dispatch({ type: "FETCH_FOLDER" });

    axios.get("/folder/" + folderId)
      .then((response) => {
        dispatch({ type: "FETCH_FOLDER_FINISHED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "FETCH_FOLDER_REJECTED", payload: err })
      })
  }
}

export function changeCurrentFolderToHome () {
  return changeCurrentFolderTo(-1);
}