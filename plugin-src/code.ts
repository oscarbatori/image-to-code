import { imageToCode } from "./useChatGpt";

figma.showUI(__html__, { themeColors: true, height: 300 });

const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Source Code Pro", style: "Medium" });
} 

const exportImage = async (node: SceneNode) => {
  const bytes = await node.exportAsync({ format: 'PNG' });
  return bytes;
}

figma.ui.onmessage = (msg) => {  
  loadFonts().then(() => {
    if (msg.type === "prompt") {
      const nodes = figma.currentPage.selection;
      const prompt = msg.prompt;
      if (nodes.length == 1 && nodes[0].type == "GROUP") { 
        const groupNode = nodes[0]
        return exportImage(groupNode).then((bytes) => {
          const code = imageToCode(bytes, prompt);
          const codeBlockNode = figma.createCodeBlock();
          console.log(code)
          codeBlockNode.code = code;
          codeBlockNode.codeLanguage = 'PYTHON';
          codeBlockNode.x = groupNode.x
          codeBlockNode.y = groupNode.y
          figma.currentPage.selection = [codeBlockNode];
          figma.viewport.scrollAndZoomIntoView([codeBlockNode]);
          figma.closePlugin();
        });
      } else {
        figma.closePlugin("Code Gen requires the selection of a single group node")
      };
    }
    figma.closePlugin("All done");
  });
}; 
