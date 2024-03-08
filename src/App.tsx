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

  // Create New ID needed for new Folder or File's
  const calculateNewID = () => {
    return Date.now().toString();
  };

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

  // ##### ADD FOLDER ##########################################
  const addFolder = (nodeID: string, folderName: string) => {
    console.log("nodeID", nodeID);
    const newID = calculateNewID();
    const newFolder = {
      id: newID,
      name: folderName,
      isFolder: true,
      nodes: [],
    };
    let newFileData;

    if (nodeID === "root") { // Add to Root folder
      console.log("add folder to root ", folderName);
      console.log("newFolder ", newFolder);

      const newNodes = fileData?.nodes ? [...fileData.nodes, newFolder] : [newFolder];
      console.log("add folder root newNodes", newNodes);
      newFileData = { ...fileData };
      newFileData = {
        ...newFileData,
        nodes: newNodes,
      };
      console.log("add folder root newFileData", newFileData);
    } else {
      console.log("add folder to child ", folderName);
      // **** TODO ****
      return null;
    }
    setFileData(newFileData as Node);
  };  

  // ##### ADD FILE ##########################################
  const addFile = (nodeID: string, fileName: string) => {
    console.log("nodeID", nodeID);
    const newID = calculateNewID();
    const newFile = {
      id: newID,
      name: fileName,
      nodes: [],
    };
    let newFileData;

    if (nodeID === "root") {
      console.log("add file to root");
      console.log("fileName ", fileName);
      let newNodes;
      if (fileData?.nodes) {
        newNodes = [...fileData.nodes, newFile];
      } else {
        console.log("add file fileData has no nodes");
        newNodes = [newFile];
      }
      newFileData = {
        ...fileData,
        nodes: newNodes,
      };
    } else {
      console.log("add file to child");
      console.log("fileName ", fileName);
      // ***** TODO *****
    }
    setFileData(newFileData as Node);
  };  

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
          addFolder={addFolder}
          addFile={addFile}
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
        <Folder parentNode={fileData} node={fileData} showContent={showContent} deleteNode={deleteNode} editName={editName} addFolder={addFolder} addFile={addFile} />
      </div>
    </div>
  );
}

export default App;
