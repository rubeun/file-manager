import { useState, FC } from "react";

type Node = {
  id: string;
  name: string;
  isFolder: boolean;
  nodes: Node[];
}


type FolderType = {
  node: Node;
  showContent: any;
}

const Folder: FC<FolderType> = ({ node, showContent }) => {
  const [folderOpen, setFolderOpen] = useState(false);

  return (
    <div>
      <span className="button" onClick={() => setFolderOpen(!folderOpen)}>
        {folderOpen ? `📂 ${node.name}` : `📁 ${node.name}`}
      </span>

      {folderOpen
        ? node.nodes.length > 0 &&
          node.nodes.map((child) => showContent(node, child))
        : null}
    </div>
  );
};

export default Folder;
