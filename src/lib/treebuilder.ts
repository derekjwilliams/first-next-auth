import React from 'react';

interface TreeNode {
    tag: string;
    content: string | TreeNode[] | { tag: string; content: string };
}

interface Props {
    tree: TreeNode[];
}

const TreeBuilder: React.FC<Props> = ({ tree }) => {
    const buildTree = (nodes: TreeNode[], container: HTMLElement) => {
        nodes.forEach(node => {
            const el = document.createElement(node.tag);

            if (Array.isArray(node.content)) {
                buildTree(node.content, el);
            } else if (typeof node.content === 'object') {
                buildTree([node.content], el);
            } else {
                el.innerHTML = node.content;
            }

            container.appendChild(el);
        });
    };

    React.useEffect(() => {
        buildTree(tree, document.body);
    }, [tree]);

    return null; // This component doesn't render anything directly
};

export default TreeBuilder;
