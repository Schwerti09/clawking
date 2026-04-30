// Server component wrapping a styled <pre> with a language tag + copy button.
import CopyCodeButton from "./CopyCodeButton"

export default function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  return (
    <div className="mt-5 rounded-2xl border border-gray-800 bg-[#0b0f17] overflow-hidden shadow-inner">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-black/40">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">
          {lang || "bash"}
        </span>
        <CopyCodeButton code={code} />
      </div>
      <pre className="px-4 py-4 overflow-x-auto text-sm leading-relaxed text-gray-200 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}
