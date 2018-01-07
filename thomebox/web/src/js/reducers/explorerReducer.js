const INITIAL_STATE = {
  breadcrumpItems: [
    { id: 1, name: 'Home', icon: 'home' }, { id: 2, name: 'Photos2' }, { id: 3, name: 'Holiday 2017' }
  ],
  elements: [],

  currentFolderId: -1,
  loading: true,
  loaded: false
}

export default function reducer (state = INITIAL_STATE, action) {
  console.log("explorer reducer fired with action", action, "got state", state)

  switch(action.type){
    case "FETCH_FOLDER_FINISHED":
      return{
        ...state,
        elements: action.payload.elements,
        currentFolderId: action.payload.currentFolderId
      }
  }
  return state
}