import { FC } from "react";

type Node = {
  id: string;
  name: string;
  isFolder: boolean;
  nodes: Node[];
}

type FileType = {
  node: Node;
}

const File: FC<FileType> = ({ node }) => {

  return (
    <div key={node.id}>
      <span>📄 {node.name} </span>
    </div>
  );
};
export default File;
