import { useState, FC } from "react";

type Node = {
  id: string;
  name: string;
  isFolder: boolean;
  nodes: Node[];
}

type FolderType = {
  parentNode: Node | null;
  node: Node | null;
  deleteNode: any;
  showContent: any;
  editName: any;
}

const Folder: FC<FolderType> = ({ parentNode, node, showContent, deleteNode, editName }) => {
  const [folderOpen, setFolderOpen] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const [inputText, setInputText] = useState(node?.name);

  const handleEditName = () => {
    setShowEditInput(false);
    editName(parentNode, node?.id, inputText);
  };

  // If root node is null, show nothing
  if (parentNode === null || node === null) {
    return null;
  }

  return (
    <div>
      {showEditInput ? (
        <span>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={() => handleEditName()}>Save</button>
        </span>
      ) : (
        <span className="button" onClick={() => setFolderOpen(!folderOpen)}>
          {folderOpen ? `📂 ${node?.name}` : `📁 ${node?.name}`}
        </span>
      )}
      <span className="button" onClick={() => deleteNode(parentNode, node?.id)}>
        {" "}
        🗑️
      </span>
      <span className="button" onClick={() => setShowEditInput(!showEditInput)}>
        {" "}
        ✏️
      </span>

      {folderOpen
        ? node?.nodes &&
          node?.nodes.map((child) => showContent(node, child))
        : null}
    </div>
  );
};

export default Folder;
