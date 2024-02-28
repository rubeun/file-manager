import { useState, FC } from "react";

type Node = {
  id: string;
  name: string;
  isFolder: boolean;
  nodes: Node[];
}

type FileType = {
  parentNode: Node;
  node: Node;
  editName: any;
}

const File: FC<FileType> = ({ parentNode, node, editName }) => {
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

      <span className="button" onClick={() => setShowInput(!showInput)}>
        {" "}
        ✏️
      </span>
    </div>
  );
};
export default File;
