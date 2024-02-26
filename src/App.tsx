import React, { useState } from 'react';
import './App.css';
import { fileManagerData } from './data/fileManagerData';
import File from './components/File';
import Folder from './components/Folder';

type Node = {
  id: string;
  name: string;
  isFolder: boolean;
  nodes: Node[];
}

const App = () => {
  const [fileData, setFileData] = useState<Node>(fileManagerData as Node);

  const showContent= (parentNode: Node, node: Node) => {
    if (node.isFolder === true) {
      return (
        <Folder
          key={node.id}
          node={node}
          showContent={showContent}
        />
      );
      // }
    } else {
      return (
        <File
          key={node.id}
          node={node}
        />
      );
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>File Manager</h1>
      </header>
      <div>
        {showContent(fileData, fileData)}
      </div>
    </div>
  );
}

export default App;
