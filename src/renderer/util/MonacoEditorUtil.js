import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import store from '../store'
import { DEFAULT_TAG_LIST } from '@/util/DefaultTagUtil'
monaco.languages.register({ id: 'art' })
let languageList = ['art']
languageList.map(name => {
	monaco.languages.registerCompletionItemProvider(name, {
		provideCompletionItems (model, position) {
			// 获取当前行数
			const line = position.lineNumber
			// 获取当前列数
			const column = position.column
			// 获取当前输入行的所有内容
			const content = model.getLineContent(line)
			const preStr = content.substring(0, column - 1)

			// each 循环
			if (/{{(.)*(e|ea|eac|each)$/.test(preStr)) {
				return {
					incomplete: true,
					suggestions: [
						{
							label: 'each',
							kind: monaco.languages.CompletionItemKind.Variable,
							documentation: '循环',
							detail: '循环',
							insertText: 'each $0 }}\n {{ \\$index }} {{ \\$value }} \n{{/each}}',
							insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
						}
					]
				}
			}
			// 表格对象
			if (/{{(.)*(t|ta|tab|tabl|table|table)$/.test(preStr)) {
				return {
					incomplete: true,
					suggestions: [
						{
							label: 'table',
							kind: monaco.languages.CompletionItemKind.Variable,
							documentation: '数据库表逆向数据',
							detail: '数据库表对象',
							insertText: 'table',
							insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
						}
					]
				}
			}
			// 表格字段
			if (/{{(.)*(table\.)$/.test(preStr)) {
				return {
					incomplete: true,
					suggestions: [
						{
							label: 'tableName',
							kind: monaco.languages.CompletionItemKind.Field,
							documentation: '数据库表名',
							detail: '表名',
							insertText: 'tableName',
							insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
						},
						{
							label: 'className',
							kind: monaco.languages.CompletionItemKind.Field,
							documentation: '数据库表类名',
							detail: '类名',
							insertText: 'className',
							insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
						},
						{
							label: 'lowerCaseTableName',
							kind: monaco.languages.CompletionItemKind.Field,
							documentation: '数据库表驼峰名',
							detail: '驼峰名',
							insertText: 'lowerCaseTableName',
							insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
						},
						{
							label: 'columns',
							kind: monaco.languages.CompletionItemKind.Variable,
							documentation: '数据库表字段集合',
							detail: '字段集合',
							insertText: 'columns',
							insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
						}
					]
				}
			}
			// 数据库表字段对象
			if (/{{(.)*(\$|\$v|\$va|\$val|\$valu|\$value)$/.test(preStr)) {
				return {
					incomplete: true,
					suggestions: [
						{
							label: '$value',
							kind: monaco.languages.CompletionItemKind.Variable,
							documentation: '数据库表字段对象',
							detail: '字段对象',
							insertText: 'value',
							insertTextRules: monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
						}
					]
				}
			}
			if (/{{(.)*\$value.$/.test(preStr)) {
				const customTagSuggestionsList = []
				store.state.tag.customTagList.forEach(item => {
					customTagSuggestionsList.push({
						label: `${item.name}[${item.key}]`,
						kind: monaco.languages.CompletionItemKind.Field,
						documentation: item.name + '(自定义字段)',
						detail: item.name + '(自定义字段)',
						insertText: item.key,
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
					})
				})
				DEFAULT_TAG_LIST.forEach(item => {
					customTagSuggestionsList.push({
						label: `${item.name}[${item.key}]`,
						kind: monaco.languages.CompletionItemKind.Field,
						documentation: item.name + '(默认字段)',
						detail: item.name + '(默认字段)',
						insertText: item.key,
						insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
					})
				})
				return {
					incomplete: true,
					suggestions: [
						{
							label: '字段名[name]',
							kind: monaco.languages.CompletionItemKind.Field,
							documentation: '数据库表字段名',
							detail: '字段名',
							insertText: 'name',
							insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
						},
						{
							label: '字段驼峰名称[lowCaseName]',
							kind: monaco.languages.CompletionItemKind.Field,
							documentation: '数据库表字段驼峰名',
							detail: '字段驼峰名称',
							insertText: 'lowCaseName',
							insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
						},
						{
							label: '字段备注[remark]',
							kind: monaco.languages.CompletionItemKind.Field,
							documentation: '数据库表字段备注',
							detail: '字段备注',
							insertText: 'remark',
							insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
						},
						{
							label: '字段是否为空[isNull]',
							kind: monaco.languages.CompletionItemKind.Field,
							documentation: '数据库表字段是否为空',
							detail: '字段是否为空',
							insertText: 'isNull',
							insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
						},
						{
							label: '字段是否为主键[isPrimary]',
							kind: monaco.languages.CompletionItemKind.Field,
							documentation: '数据库表字段是否为主键',
							detail: '字段是否为主键',
							insertText: 'isPrimary',
							insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
						}
					].concat(customTagSuggestionsList)
				}
			}
			return {
				incomplete: true,
				suggestions: [
				]
			}
		},
		triggerCharacters: ['table', '.']
	})

	monaco.languages.setMonarchTokensProvider(name, {
		tokenizer: {
			root:[
				[/{{/, { token: "art-key" }],
				[/}}/, { token: "art-key" }]
			],
		}
	})
})
monaco.editor.setModelMarkers = function () {}
export default monaco
