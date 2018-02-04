import axios from 'axios'

export function changeCurrentPictureTo (pictureId, maxWidth, maxHeight) {

  return function (dispatch) {
    dispatch({ type: "FETCH_PICTURES" });

    axios.get("/gallery/" + maxWidth + "/" + maxHeight + "/" + pictureId)
      .then((response) => {
        dispatch({ type: "FETCH_PICTURES_FINISHED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "FETCH_PICTURES_REJECTED", payload: err })
      })

  }
}
