const INITIAL_STATE = {
  breadcrumpItems: [
    { id: -1, name: 'Home', icon: 'home' }
  ],
  elements: [],

  currentFolderId: -1,
  loading: true,
  loaded: false
}

const NODE1_BEFORE_NODE2 = -1;
const NODE1_AFTER_NODE2 = 1;

function sortElements (elements) {
  elements.sort(function (node1, node2) {
    if (node1.type === 'folder' && node2.type !== 'folder') {
      return NODE1_BEFORE_NODE2
    }
    if (node2.type === 'folder' && node1.type !== 'folder') {
      return NODE1_AFTER_NODE2
    }

    return node1.name.localeCompare(node2.name)
  })
  return elements
}

export default function reducer (state = INITIAL_STATE, action) {
  console.log("explorer reducer fired with action", action, "got state", state)

  switch (action.type) {
    case "FETCH_FOLDER_FINISHED":
      return {
        ...state,
        elements: sortElements(action.payload.elements),
        currentFolderId: action.payload.currentFolderId
      }
    case "FETCH_BREADCRUMP_FINISHED":
      return {
        ...state,
        breadcrumpItems: action.payload.breadcrumpItems
      }
  }
  return state
}