const babel = require('@babel/core')
const code = `const a = 1;` // 转换后 var a = 1
const arrowFnPlugin = {
  // 访问者模式
  visitor: {
    // 当访问到某个路径的时候进行匹配
    VariableDeclaration:(p) => {
        const node = p.node;
        if(node.kind === 'const') {
            node.kind = 'var'
        }
    }
  },
}

const r = babel.transform(code, {
  plugins: [arrowFnPlugin],
})

console.log(r.code)