import { useState } from "react";

type Node = {
  id: string;
  name: string;
  isFolder: boolean;
  nodes: Node[];
}

type FileType = {
  parentNode: Node;
  node: Node;
  deleteNode: any;
  editName: any;
}

const File = ({ parentNode, node, deleteNode, editName }: FileType) => {
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
            placeholder="New File Name"
            onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={() => handleEditName()}>Save</button>
        </span>
      ) : (
        <span>📄 {node.name} </span>
      )}
      <span className="button" onClick={() => deleteNode(parentNode, node?.id)}>
        {" "}
        🗑️
      </span>
      <span className="button" onClick={() => setShowInput(!showInput)}>
        {" "}
        ✏️
      </span>
    </div>
  );
};
export default File;
