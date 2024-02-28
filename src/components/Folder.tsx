import { useState, FC } from "react";

type Node = {
  id: string;
  name: string;
  isFolder: boolean;
  nodes: Node[];
}


type FolderType = {
  parentNode: Node;
  node: Node;
  showContent: any;
  editName: any;
}

const Folder: FC<FolderType> = ({ parentNode, node, showContent, editName }) => {
  const [folderOpen, setFolderOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState(node.name);

  const handleEditName = () => {
    setShowInput(false);
    editName(parentNode, node.id, inputText);
  };


  return (
    <div>
      {showInput ? (
        <span>
          <input
            type="text"
            value={inputText}
            placeholder="Update Folder Name"
            onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={() => handleEditName()}>Save</button>
        </span>
      ) : (
        <span className="button" onClick={() => setFolderOpen(!folderOpen)}>
          {folderOpen ? `📂 ${node.name}` : `📁 ${node.name}`}
        </span>
      )}
      <span className="button" onClick={() => setShowInput(!showInput)}>
        {" "}
        ✏️
      </span>

      {folderOpen
        ? node.nodes.length > 0 &&
          node.nodes.map((child) => showContent(node, child))
        : null}
    </div>
  );
};

export default Folder;
