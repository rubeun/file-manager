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
  const [fileData, setFileData] = useState<Node | null>(fileManagerData as Node);

  // ################################# DELETE FILE/FOLDER #################################
  const deleteNode = (parentNode: Node, nodeID: string) => {
    if (nodeID === "root") { // #### ROOT
      setFileData(null);
    } else { // #### CHILD
      let tempFileData = { ...fileData as Node };
      // update the parentNode nodes array and remove the node with the matching nodeID
      const updatedNodes = parentNode.nodes.filter(
        (node) => node.id !== nodeID,
      );
      // find the appropriate node based on parentNode using DFS
      const dfs = (fileDataNode: Node) => {
        if (!fileDataNode.nodes || fileDataNode.nodes?.length < 1) {
          return fileDataNode;
        }

        fileDataNode.nodes.forEach((node) => {
          if (node.id === parentNode.id) {
            // replace the corresponding nodes with updated parentNodes nodes array
            node.nodes = updatedNodes;
          } else {
            dfs(node);
          }
        });
      };
      if (parentNode.id === "root") {
        tempFileData.nodes = updatedNodes;
      } else {
        dfs(tempFileData);
      }
      // update the fileData state
      setFileData(tempFileData);
    }
  };



  // ################################# RENAME FILE/FOLDER #################################
  const editName = (parentNode: Node, nodeID: string, newName: string) => {
    if (nodeID === "root") { // #### ROOT
      let tempFileData = { ...fileData as Node };
      tempFileData.name = newName;
      setFileData(tempFileData);
    } else { // #### CHILD 
      let tempFileData = { ...fileData as Node };

      const dfs = (fileDataNode: Node) => {
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

  // ################################# RENDER FILE/FOLDER #################################
  const showContent= (parentNode: Node, node: Node) => {
    if (node.isFolder === true) {
      return (
        <Folder
          key={node.id}
          parentNode={parentNode}
          node={node}
          showContent={showContent}
          deleteNode={deleteNode}
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
          deleteNode={deleteNode}
          editName={editName}
        />
      );
    }
  }

  return (
    <div className="App">
      <Header />
      <div className='wrapper'>
        <Folder parentNode={fileData} node={fileData} showContent={showContent} deleteNode={deleteNode} editName={editName} />
      </div>
    </div>
  );
}

export default App;
