# Special Feature
Make difference by innovating frameworks. Convension over config, it's stupid to config every URL calls in router.
Our router is different, system will automatically process every URL requests, and dispatch requests to relevant processor in api folder.
For example: for the URL call of "/api/login", system will dispatch this call to the file of "/api/login.js".
By this convension, we can get rid of config of every URL calls.
<br>
This project is the seed project for node express(back end)/react(front end) framework.

# Run Guide
1.Install node modules<br>
A Install Node-v12.22.0<br>
B Run "npm install" to install node modules.<br>

2 Build React<br>
2.1 Debug Mode<br>
Run "npm run pack" to build react in debug mode in the command window.<br>
2.2 Production Mode<br>
Run "npm run build" to build react in production mode in the command window.<br>

3 Debug react code, there are 2 ways to debug, will describe in 3.1 and 3.2<br>
3.1 debug react code without webpack-dev-server<br>
A Run "npm run pack" to build react in debug mode in the command window.<br>
B Run "node app.js" in the command window.<br>
C Open VSCode-v1.55.0<br>
D Install the extension of "Debugger for Chrome" for VSCode.<br>
E Set breakpoint in react code in VSCode.<br>
F Click "Run and Debug" in the left tool bar.<br>
G Select "React:8888" on top bar, then click the "Start Debugging" icon to open chrome.<br>
H Operate in chrome, make the web page to reach the breakpoint. Then debug in VsCode.<br>
I If changing react code, it need to run "npm run pack" again to build react in debug mode.<br>

3.2 debug react code with webpack-dev-server(Recommended)<br>
A Run "node app.js" in the command window to start node API server.<br>
B Run "npm run start" in another command window to start webpack-dev-server.<br>
C Open VSCode-v1.55.0<br>
D Install the extension of "Debugger for Chrome" for VSCode.<br>
E Set breakpoint in react code in VSCode.<br>
F Click "Run and Debug" in the left tool bar.<br>
G Select "React:3000" on top bar, then click the "Start Debugging" icon to open chrome.<br>
H Operate in chrome, make the web page to reach the breakpoint. Then debug in VsCode.<br>
I If changing react code, don't need to restart webpack-dev-server, it will take effect immediately.

4 Debug node code<br>
A Open VSCode-v1.55.0<br>
B Set breakpoint in node code.<br>
C Open app.js in VsCode<br>
D Click "Run and Debug" in the left tool bar.<br>
E Select "Node current file" on top bar, then click the "Start Debugging" icon to start node.<br>
F Open a web broser, go to "localhost:8888"<br>
G Operate in web browser, make the web page to reach the breakpoint. Then debug in VsCode.<br>

5 Run in production mode<br>
A Run "npm run build" to build react in production mode in the command window.<br>
B Run "node app.js" to start node.<br>
C Open a web browser, go to "localhost:8888"<br>
D Input 'admin' as username, 'admin' as password to login.<br>
