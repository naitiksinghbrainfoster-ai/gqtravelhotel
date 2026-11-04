import React from 'react';

export function LegalText({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="space-y-5 text-sm leading-7 text-slate-700">
      {blocks.map((block, index) => {
        const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
        if (lines[0]?.startsWith('## ')) {
          return (
            <section key={index}>
              <h2 className="text-base font-bold text-slate-900">{lines[0].slice(3)}</h2>
              {lines.slice(1).map((line, lineIndex) => (
                <p key={lineIndex} className="mt-2 whitespace-pre-wrap">{line}</p>
              ))}
            </section>
          );
        }

        if (lines.length > 0 && lines.every((line) => line.startsWith('- '))) {
          return (
            <ul key={index} className="list-disc space-y-1 pl-5">
              {lines.map((line, lineIndex) => <li key={lineIndex}>{line.slice(2)}</li>)}
            </ul>
          );
        }

        return <p key={index} className="whitespace-pre-wrap">{lines.join('\n')}</p>;
      })}
    </div>
  );
}
