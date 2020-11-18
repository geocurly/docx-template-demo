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

const COLORS = {
    Str: "#8BC34A",
    Block: "#80D8FF",
    Identity: "#B39DDB",
    Image: "#80D8FF",
    ImageSize: "#F44336",
    Call: "#80D8FF",
    Condition: "#FFEB3B",
    EscapedBlock: "#EF6C00",
    EscapedChar: "#EF6C00",
    Expression: "#80D8FF",
    FilterExpression: "#80D8FF",
    Default: "#B39DDB",
};

function highlight(content, node) {

    switch (node.type) {
        case STR:
            break;
        case BLOCK:
            break;
        case IMAGE:
            break;
        case CALL:
            break;
        case CONDITION:
            break;
        case EXPRESSION:
        case FILTER_EXPRESSION:
            break;
    }

    const start = node.position.start;
    const end = node.position.end;
    const color = COLORS[node.type];
    const nodeContent = `<span style="color: ${color}">${content.substr(start, end)}</span>`;
    return content.substr(0, start) + nodeContent + content.substr(end, content.length);
}

export default function (content, ast) {
    for (let node of ast) {
        content = highlight(content, node);
    }

    return content;
}