import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic"; 

// import  {tiptapExtensions}  from "../constants/tiptapExtensions";

const parseJsonToHtml = (json) => {
  return parse(
    generateHTML(json, [Bold, Italic, Text, Paragraph, Document])
  )
  parse(generateHTML(json, extensions));
};

export default parseJsonToHtml;