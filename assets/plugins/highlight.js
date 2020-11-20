const STR = 'Str';
const BLOCK = 'Block';
const IDENTITY = 'Identity';
const IMAGE = 'Image';
const IMAGE_SIZE = 'ImageSize';
const CALL = 'Call';
const CONDITION = 'Condition';
const ESCAPED_BLOCK = 'EscapedBlock';
const ESCAPED_CHAR = 'EscapedChar';
const EXPRESSION = 'Expression';
const FILTER_EXPRESSION = 'FilterExpression';

const CLASSES = {
    Str: "highlight--str",
    Block: "highlight--block",
    Identity: "highlight--identity",
    Image: "highlight--image",
    ImageSize: "highlight--image-size",
    Call: "highlight--call",
    Condition: "highlight--condition",
    EscapedBlock: "highlight--escaped-block",
    EscapedChar: "highlight--escapedChar",
    Expression: "highlight--expression",
    FilterExpression: "highlight--filter-expression",
    Default: "highlight--default",
};

function highlight(original, node) {
    const start = node.position.start;
    const end = node.position.end;
    let highlighted = [];
    switch (node.type) {
        case STR:
        case BLOCK:
            for (let child of node.nested) {
                highlighted.push(highlight(original, child))
            }
            break;
        case IMAGE:
            highlighted.push(highlight(original, node.identity));
            highlighted.push(highlight(original, node.size));
            break;
        case CALL:
            highlighted.push(highlight(original, node.identity));
            for (let child of node.params) {
                highlighted.push(highlight(original, child));
            }
            break;
        case CONDITION:
            highlighted.push(highlight(original, node.if));
            highlighted.push(highlight(original, node.then));
            highlighted.push(highlight(original, node.else));
            break;
        case EXPRESSION:
        case FILTER_EXPRESSION:
            highlighted.push(highlight(original, node.left));
            highlighted.push(highlight(original, node.right));
            break;
    }

    let substr = original.substr(start, end - start);
    let replaced = substr;
    for (let {raw, content} of highlighted) {
        replaced = replaced.replace(raw, content);
    }

    return {
        raw: substr,
        content: `<span class="${CLASSES[node.type]}">${replaced}</span>`
    };
}

export default function (content, ast) {
    let replaced = content;
    for (let node of ast) {
        const highlighted = highlight(content, node);
        replaced = replaced.replace(highlighted.raw, highlighted.content);
    }

    return replaced;
}