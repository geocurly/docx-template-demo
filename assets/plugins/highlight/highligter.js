import * as constants from './constants';
import "./style/theme.scss";

class Highlighter {
    constructor(base, content) {
        this.original = content;
    }

    accept(node) {
        switch (node.type) {
            case constants.STR:
                return this.string(node);
            case constants.BLOCK:
                return this.block(node);
            case constants.IDENTITY:
                return this.id(node);
            case constants.IMAGE:
                return this.image(node);
            case constants.IMAGE_SIZE:
                return this.imageSize(node);
            case constants.CALL:
                return this.call(node);
            case constants.CONDITION:
                return this.condition(node);
            case constants.ESCAPED_BLOCK:
                return this.escapedBlock(node);
            case constants.ESCAPED_CHAR:
                return this.escapedChar(node);
            case constants.FILTER_EXPRESSION:
                return this.filter(node);
        }

        return null;
    }

    highlight(node, content) {
        return {
            content: `<span class="${constants.CLASSES[node.type]}">${content}</span>`
        }
    }

    content(node) {
        const {start, end} = node.position;
        return this.original.substr(start, end - start);
    }

    nested(base, nested) {
        let text = [];
        if (nested.length > 0) {
            const {start, end} = base.position
            let from = start;

            for (let child of nested) {
                text.push(this.original.substr(from, child.position.start - from));
                text.push(this.accept(child).content);
                from = child.position.end;
            }

            text.push(this.original.substr(from, end - from));
        } else {
            text.push(this.content(base));
        }

        return text.join('')
    }

    block(node) {
        return this.highlight(node, this.nested(node, node.nested));
    }

    escapedBlock(node) {
        return this.highlight(node, this.content(node));
    }

    string(node) {
        return this.highlight(node, this.nested(node, node.nested));
    }

    image(node) {
        return this.highlight(node, this.nested(node, [node.identity, node.size]));
    }

    imageSize(node) {
        return this.highlight(node, this.content(node));
    }

    call(node) {
        return this.highlight(node, this.nested(node, [node.identity, ...node.params]));
    }

    id(node) {
        return this.highlight(node, this.content(node));
    }

    condition(node) {
        const ifNode = node.if.position;
        const thenNode = node.then.position;
        let nested;
        if (ifNode.start === thenNode.start && ifNode.end === thenNode.end) {
            nested = [node.if, node.else];
        } else {
            nested = [node.if, node.then, node.else];
        }

        return this.highlight(node, this.nested(node, nested));
    }

    filter(node) {
        return this.highlight(node, this.nested(node, [node.left, node.right]));
    }

    escapedChar(node) {
        return this.highlight(node, this.content(node));
    }
}

export default function (content, ast) {
    if (ast.length > 0) {
        const text = [];
        let from = 0;

        for (let node of ast) {
            text.push(content.substr(from, node.position.start - from));

            const highlighter = new Highlighter(node, content);
            const result = highlighter.accept(node)
            text.push(result.content);
            from = node.position.end;
        }

        text.push(content.substr(from));
        return text.join('');
    }

    return content;
}