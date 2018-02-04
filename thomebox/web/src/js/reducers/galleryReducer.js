const INITIAL_STATE = {
  folderId: -1,
  images: [],
  showImageIndex: 0,
  maxWidth: 1900,
  maxHeight: 1000
}

export default function reducer (state = INITIAL_STATE, action) {

  switch (action.type) {
    case "FETCH_PICTURES_FINISHED":
      return {
        ...state,
        images: action.payload.images,
        folderId: action.payload.folderId,
        showImageIndex: action.payload.showImageIndex,
        maxHeight: action.payload.maxHeight,
        maxWidth: action.payload.maxWidth
      }

  }
  return state
}