
![speCodee Icon](https://raw.githubusercontent.com/ed-miller/speCodee/master/images/speCodee_icon1.png)


### Inspiration
Writing code is an exhaustive process. You have to think about your idee, read documentation and type your code carefully line by line. Wouldn't it be easier if you could just ponder about you idea and simply say what you want to create? That's our vision! Creating software by talking to a computer which transfers your meta model to actual program language code.

### What it does
Our Machine Learning based speech recognition architecture transfers spoken metamodels to classes, methods and class attributes. To demonstrate our implementation we developed an extension for Visual Studio Code, with which one can create classes, methods, attributes, variables, statements and selecting lines by simply talk to the computer.

### How we built it
We use Alexa Voice Service (AVS) to detect spoken words, parse, transfer and interpret user intentions. The interpreted user intentions are processed by our SDK and transformed with a meta model language tranformator within the Visual Studio Code Extension to a specific programming language, the user wants to develop with.

### Challenges we ran into
Speech recognition (AVS) is not as reliable as we expected. The altenative Cortana Speech Recognition API is trainable with personal pronaunciations to improve recognition and to reduce the asyncroniticity of the web requests from the architecture.

### Accomplishments that we're proud of
We are developing a Visual Studio Code Extension which we will publish tomorow on GitHub and on Visual Studio Code Marktplace. Tomorow we hopefully have already accomplished to integrate a stable speech recognition in our SDK. In this project we are developing a metamodel to programming language transformator which can be reused in other projects.

### What we learned
Working with Speech Recognition APIs Transforming Metamodels to Domain Specific Languages Writing Visual Studio Code Extensions

### What's next for speCodee
Speech recognition have to be improved and make more reliable. The meta model transformator must be improved to transform in more different languages (currently only TypeScript is supported). Publishing Visual Studio Code Extension on Visual Studio Code Marktplace.

### Built With
* alexa-speech-recognition-api
* javascript
* node.js
* webpack
* mongodb
* typescript
* visual-studio-code
* visual-studio-code-extension

Important Note: This is a prototype which was developed for Windows. Despite that Visual Studio Code Extension are cross plattform, this one is only for Windows OS. Moreover our prototype support only German commands.

Testing: To start speech recognition you have to start the process Speech.exe. Afterwards you can start writing your code with your speech.