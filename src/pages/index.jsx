import styles from './index.scss';
import React from 'react';
import { Button } from 'antd';
import MonacoEditor from 'react-monaco-editor';
// import pseudoFileSystem from 'terminal-in-react-pseudo-file-system-plugin';
// const FileSystemPlugin = pseudoFileSystem();
// import 'xterm/lib/xterm.js';
// import 'xterm/css/xterm.css';
import { Terminal } from 'xterm'
var os = require('os');
// import * as fit from 'xterm/lib/addons/fit/fit'
// import * as attach from 'xterm/lib/addons/attach/attach'
var pty = require('node-pty');
// Terminal.applyAddon(fit)
// Terminal.applyAddon(attach)
const a = require()
// import { XTerm} from 'react-xterm';

class MainView extends React.PureComponent {
  state = {
    code: '//this is code',
  }
  DEFAULT_VALUE =  ['apex', 'azcli', 'bat', 'clojure', 'coffee', 'cpp', 'csharp', 'csp', 'css', 'dockerfile', 'fsharp', 'go', 'handlebars', 'html', 'ini', 'java', 'javascript', 'json', 'less', 'lua', 'markdown', 'msdax', 'mysql', 'objective', 'perl', 'pgsql', 'php', 'postiats', 'powerquery', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'ruby', 'rust', 'sb', 'scheme', 'scss', 'shell', 'solidity', 'sql', 'st', 'swift', 'typescript', 'vb', 'xml', 'yaml']
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  onChange = (newValue) => {
    console.log(newValue)
    this.setState({
      code: newValue
    })


  }
  rendert = () => {
    var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

    var ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env
    });

    ptyProcess.on('data', function(data) {
      process.stdout.write(data);
    });

    ptyProcess.write('ls\r');
    ptyProcess.resize(100, 40);
    ptyProcess.write('ls\r');

    // const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
    // let env = process.env
    // env['LC_ALL'] = 'zh_CN.UTF-8'
    // env['LANG'] = 'zh_CN.UTF-8'
    // env['LC_CTYPE'] = 'zh_CN.UTF-8'
    // const ptyProcess = pty.spawn(shell, [], {
    //   name: 'xterm-color',
    //   cols: 80,
    //   rows: 30,
    //   cwd: process.env.HOME,
    //   env: process.env,
    //   encoding: null
    // })
    // const xterm = new Terminal({
    //   cols: 80,
    //   rows: 30,
    //   theme: {
    //     foreground: 'rgb(254,239,143)',
    //     background: 'rgb(22,102,47)',
    //     cursor: 'rgb(254,239,143)'
    //   }
    // })
    // xterm.open(this.$refs.xterm)
    // xterm.on('data', (data) => {
    //   console.log(Buffer.from(data))
    //   console.log('xterm:' + Buffer.from(data).toString())
    //   ptyProcess.write(Buffer.from(data))
    // })
    // ptyProcess.on('data', function (data) {
    //   console.log(data)
    //   console.log('ptyProcess:' + data.toString())
    //   xterm.write(data.toString())
    // })
    // ptyProcess.write('export LANG=zh_CN.UTF-8\n')
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: "line",
      automaticLayout: false
    };

    return (
      <div>
        {this.rendert()}
        <MonacoEditor
          width="800"
          height="600"
          language="cpp"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          {/*<Terminal*/}
            {/*color='green'*/}
            {/*backgroundColor='black'*/}
            {/*barColor='black'*/}
            {/*plugins={[*/}
              {/*FileSystemPlugin,*/}
            {/*]}*/}
            {/*style={{ fontWeight: "bold", fontSize: "1em" }}*/}
            {/*commands={{*/}
              {/*'open-google': () => window.open('https://www.google.com/', '_blank'),*/}
              {/*showmsg: this.showMsg,*/}
              {/*popup: () => alert('Terminal in React')*/}
            {/*}}*/}
            {/*descriptions={{*/}
              {/*'open-google': 'opens google.com',*/}
              {/*showmsg: 'shows a message',*/}
              {/*alert: 'alert', popup: 'alert'*/}
            {/*}}*/}
            {/*msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'*/}
          {/*/>*/}
          {/*<XTerm ref='xterm' style={{*/}
            {/*addons:['fit', 'fullscreen', 'search'],*/}
            {/*overflow: 'hidden',*/}
            {/*position: 'relative',*/}
            {/*width: '100%',*/}
            {/*height: '100%'*/}
          {/*}} />*/}
        </div>
        <div ref="xterm"></div>

      </div>
    )
  }
}
export default MainView;
