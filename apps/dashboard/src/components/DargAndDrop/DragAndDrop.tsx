"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { LeftSidebar } from "./layout/LeftSidebar";
import { RightSidebar } from "./layout/RightSidbar";
import { Header } from "./layout/Header";

function onError(error: Error) {
  console.error(error);
}
const theme = {};
export const DargAndDrop = () => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex">
        <RightSidebar />
        <div className="flex-1">
          <Header />
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                aria-placeholder={"Enter some text..."}
                placeholder={<div>Enter some text...</div>}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
        <LeftSidebar />
      </div>
    </LexicalComposer>
  );
};
