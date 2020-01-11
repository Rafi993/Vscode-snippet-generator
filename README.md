## Vscode snippet generator
Generate vscode snippets from markdown files

### Why ?
Vscode snippets are quite weird with their array syntax for the snippet body and it might be cool
if you could categories snippets into folders and files.

### Creating new snippet
1. clonse the repo
    ```
    $ git clone https://github.com/Rafi993/Vscode-snippet-generator.git
    $ cd Vscode-snippet-generator
    ```
2. Just create a new folder in this project (folder name will be used as .json file name example **react**)
3. Create markdown file for snippet inside that folder
4. Follow the below format for writing snippet
    ```
      -----------------------------------------
      Name: Poorly named snippet
      Prefix: pns
      Description: This snippet does something
      -----------------------------------------
      This is the actual snippet body
    ```    
5. Run
   ```
    $ node ./generator.js
   ```
6. Copy your .json file (name will be same as the folder you created example **react.json**) and paste it into vscode


### Todo
- [ ] Figure out was way to copy snippets into vscode automatically (should work cross platform)