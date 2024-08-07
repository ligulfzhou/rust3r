"use client";

import { CodeBlock } from "react-code-block";

function MyCodeBlock({ code, language }: { code: string, language: string }) {
  return (
    <CodeBlock code={code} language={language}>
      <CodeBlock.Code className="bg-gray-900 p-6 rounded-xl shadow-lg max-h-96 overflow-auto">
        <div className="table-row">
          <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
          <CodeBlock.LineContent className="table-cell">
            <CodeBlock.Token />
          </CodeBlock.LineContent>
        </div>
      </CodeBlock.Code>
    </CodeBlock>
  );
}

export default MyCodeBlock;
