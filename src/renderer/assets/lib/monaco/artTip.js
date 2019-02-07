export default {
	suggestions: [
		{
			label: 'value',
			kind: monaco.languages.CompletionItemKind.Value,
			documentation: "arttemplate 输出",
			insertText: '{{${1:value}}}',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
		},
		{
			label: 'value$',
			kind: monaco.languages.CompletionItemKind.Value,
			documentation: "arttemplate 输出",
			insertText: '{{$ ${1:value}}}',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
		},
		{
			label: 'each',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "arttemplate each循环",
			insertText: '{{each ${1:params}}}\n' +
				'    {{${2:key}}} {{${3:value}}}\n' +
				'{{/each}}',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
		},
		{
			label: 'if',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "arttemplate if 判断语句",
			insertText: '{{if ${1:params}}}\n' +
				'    {{${2:content}}} \n' +
				'{{/if}}',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
		},
		{
			label: 'set',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "arttemplate set 设置变量",
			insertText: '{{set ${1:variable} = ${2:value}}}',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
		}
	]
}
