import React, { useState } from 'react';
import './App.css';
import { fileManagerData } from './data/fileManagerData';
import File from './components/File';
import Folder from './components/Folder';
import Header from './components/Header';

type Node = {
  id: string;
  name: string;
  isFolder: boolean;
  nodes: Node[];
}

const App = () => {
  const [fileData, setFileData] = useState<Node>(fileManagerData as Node);

  // Rename File or Folder names
  const editName = (parentNode: Node, nodeID: string, newName: string) => {
    if (nodeID === "root") {
      let tempFileData = { ...fileData };
      tempFileData.name = newName;
      setFileData(tempFileData);
    } else {
      let tempFileData = { ...fileData };

      const dfs = (fileDataNode: Node) => {
        // console.log("dfs - fileDataNode", fileDataNode);
        if (!fileDataNode.nodes || fileDataNode.nodes?.length < 1) {
          return fileDataNode;
        }

        fileDataNode.nodes.forEach((node) => {
          if (node.id === nodeID) {
            node.name = newName;
          } else {
            dfs(node);
          }
        });
      };
      dfs(tempFileData);
      setFileData(tempFileData);
    }
  }

  // Renders either Folder or File component 
  const showContent= (parentNode: Node, node: Node) => {
    if (node.isFolder === true) {
      return (
        <Folder
          key={node.id}
          parentNode={parentNode}
          node={node}
          showContent={showContent}
          editName={editName}
        />
      );
      // }
    } else {
      return (
        <File
          key={node.id}
          parentNode={parentNode}
          node={node}
          editName={editName}
        />
      );
    }
  }

  return (
    <div className="App">
      <Header />
      <div className='wrapper'>
        <Folder parentNode={fileData} node={fileData} showContent={showContent} editName={editName} />
      </div>
    </div>
  );
}

export default App;
