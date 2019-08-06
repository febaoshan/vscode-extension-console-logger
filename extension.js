// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "console-logger" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.consoleLogger', function () {
		// The code you place here will be executed every time your command is executed

		// 步骤分解
		// 1. 获取选中文本信息
		// 2. 获取选中文本位置
		// 3. 获取console分隔符配置
		// 4. 添加console代码

		const activeTextEditor = vscode.window.activeTextEditor;
		const activeDocument = activeTextEditor.document;

		// 1. 获取所有选中行信息
		const selection = activeTextEditor.selection;
		// sample for selection: {"start":{"line":2,"character":0},"end":{"line":2,"character":7},"active":{"line":2,"character":7},"anchor":{"line":2,"character":0}}
		const { start, end } = selection;
		 
		// 当前行文本内容
		const curLineText = activeDocument.lineAt(start.line).text;

		// 当前行非空文本起始位置
		const curLineStartCharacter = curLineText.search(/\S/i);

		// 当前行为空文本
		const curBlankText = curLineText.substring(0, curLineStartCharacter);

		// 当前选中文本内容
		const curText = curLineText.substring(start.character, end.character);

		// console插入位置
		const insertPositon = new vscode.Position(start.line + 1, 0);

		// 获取配置
		const config = vscode.workspace.getConfiguration('vscodePluginConsoleLogger');
		const identifier = config.get('identifier');
		
		// 调用编辑接口
		activeTextEditor.edit((TextEditorEdit) => {
			TextEditorEdit.insert(insertPositon, `${curBlankText}console.log('${curText}${identifier}', ${curText});\n`);
		});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
