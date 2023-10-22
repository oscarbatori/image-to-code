import { imageToCode } from "./useChatGpt";

figma.showUI(__html__, { themeColors: true, height: 300 });

const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Source Code Pro", style: "Medium" });
} 

const exportImage = async (nodes: readonly SceneNode[]) => {
  const bytes = await nodes[0].exportAsync({ format: 'PNG' });
  return bytes;
}

figma.ui.onmessage = (msg) => {  
  loadFonts().then(() => {
    if (msg.type === "prompt") {
      const nodes = figma.currentPage.selection;
      const prompt = msg.prompt;
      if (nodes.length == 1 && nodes[0].type == "GROUP") { 
        return exportImage(nodes).then((bytes) => {
          const code = imageToCode(bytes, prompt);
          const codeBlockNode = figma.createCodeBlock();
          console.log(code)
          codeBlockNode.code = code;
          codeBlockNode.codeLanguage = 'PYTHON';
          figma.currentPage.selection = [codeBlockNode];
          figma.viewport.scrollAndZoomIntoView([codeBlockNode]);
        });
      } else {
        figma.closePlugin("Code Gen requires the selection of a single group node")
      };
    }
    figma.closePlugin("All done");
  });
}; 
