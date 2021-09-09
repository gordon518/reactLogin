This is the seed project for node express(back end)/react(front end) framework.

Run Guide
1.Install node modules
A Install Node-v12.22.0
B Run "npm install" to install node modules.

2 Build React
2.1 Debug Mode
A Run "npm run pack" to build react in debug mode in the command window.
2.2 Production Mode
Run "npm run build" to build react in production mode in the command window.

3 Debug react code
A Run "npm run pack" to build react in debug mode in the command window.
B Run "node app.js" in the command window.
C Open VSCode-v1.55.0
D Install the extension of "Debugger for Chrome".
E Set breakpoint in react code.
F Click "Run and Debug" in the left tool bar.
G Select "Debug React" on top bar, then click the "Start Debugging" icon to open chrome.
H Operate in chrome, make the web page to reach the breakpoint. Then debug in VsCode.
I If changing react code, it need to run "npm run pack" again to build react in debug mode.

4 Debug node code
A Open VSCode-v1.55.0
B Set breakpoint in node code.
C Open app.js in VsCode
D Click "Run and Debug" in the left tool bar.
E Select "Node current file" on top bar, then click the "Start Debugging" icon to start node.
F Open a web broser, go to "localhost:8888"
G Operate in web broser, make the web page to reach the breakpoint. Then debug in VsCode.

5 Run in production mode
A Run "npm run build" to build react in production mode in the command window.
B Run "node app.js" to start node.

