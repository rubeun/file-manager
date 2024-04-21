import { useState } from "react";

type Node = {
  id: string;
  name: string;
  isFolder: boolean;
  nodes: Node[];
}

type FolderType = {
  parentNode: Node | null;
  node: Node | null;
  deleteNode(parentNode: Node, nodeID: string): void;
  showContent(parentNode: Node, node: Node): any;
  editName(parentNode: Node | null, nodeID: string | undefined, newName: string | undefined): void;
  addFolder(nodeID: string | undefined, folderName: string): void;
  addFile(nodeID: string | undefined, fileName: string): void; 
}

const Folder = ({ parentNode, node, showContent, deleteNode, editName, addFolder, addFile }: FolderType) => {
  const [folderOpen, setFolderOpen] = useState(false);

  const [showEditInput, setShowEditInput] = useState(false);
  const [inputText, setInputText] = useState(node?.name);

  const [showFolderInput, setShowFolderInput] = useState(false);
  const [inputFolderText, setInputFolderText] = useState("");

  const [showFileInput, setShowFileInput] = useState(false);
  const [inputFileText, setInputFileText] = useState("");

  const handleEditName = () => {
    setShowEditInput(false);
    editName(parentNode, node?.id, inputText);
  };

  const handleAddFolder = () => {
    setShowFolderInput(false);
    addFolder(node?.id, inputFolderText);
    setInputFolderText("");
  };

  const handleAddFile = () => {
    setShowFileInput(false);
    addFile(node?.id, inputFileText);
    setInputFileText("");
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
      <span
        className="button"
        onClick={() => setShowFolderInput(!showFolderInput)}
      >
        {" "}
        🗂
      </span>
      <span className="button" onClick={() => setShowFileInput(!showFileInput)}>
        {" "}
        📝
      </span>

      {folderOpen
        ? node?.nodes &&
          node?.nodes.map((child) => showContent(node, child))
        : null}
      {showFolderInput ? (
        <div>
          <input
            type="text"
            value={inputFolderText}
            placeholder="New Folder Name"
            onChange={(e) => setInputFolderText(e.target.value)}
          />
          <button onClick={() => handleAddFolder()}>Save</button>
        </div>
      ) : null}
      {showFileInput ? (
        <div>
          <input
            type="text"
            value={inputFileText}
            placeholder="New File Name"
            onChange={(e) => setInputFileText(e.target.value)}
          />
          <button onClick={() => handleAddFile()}>Save</button>
        </div>
      ) : null}      
    </div>
  );
};

export default Folder;
