import { EmojiNode } from './nodes/EmojiNode';
import ExampleTheme from './themes/ExampleTheme';

const editorConfig = {
  theme: ExampleTheme,
  editable: true,
  onError(error) {
    throw error;
  },
  nodes: [EmojiNode]
};

export default editorConfig;