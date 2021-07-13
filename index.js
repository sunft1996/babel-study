/*
 * code --> 转化成ast，并修改节点 --> new code 
 * tip: 修改ast前，可以将前后两份ast进行比较，找出不同的部分，以此来编写修改节点的代码
 */

// tip: 把code转化成ast
const parser = require('@babel/parser');
// tip: 遍历ast并修改内容
const traverse = require('@babel/traverse').default;
// tip: 把ast转化成code
const generator = require('@babel/generator').default;
const fs = require('fs')
const path = require('path')


const source = `const a = 1`
let ast = parser.parse(source, {sourceType: 'module'});

fs.writeFileSync(path.join('./dist', 'oldAst.json'), JSON.stringify(ast))

traverse(ast,{
    VariableDeclaration:(p) => {
        const node = p.node;
        if(node.kind === 'const') {
            node.kind = 'var'
        }
    }
})

fs.writeFileSync(path.join('./dist', 'newAst.json'), JSON.stringify(ast))

const { code } = generator(ast)

console.log(code)
