import React from 'react'

export default function PostCard({ post }) {
  const { title, author, content, tags = [], cover_image } = post
  const preview = content.length > 160 ? content.slice(0, 160) + '…' : content

  return (
    <article className="group bg-slate-800/40 border border-sky-400/10 hover:border-sky-400/30 transition-colors rounded-2xl overflow-hidden backdrop-blur-sm">
      {cover_image && (
        <div className="h-48 w-full overflow-hidden">
          <img src={cover_image} alt={title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"/>
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sky-200/80 text-sm mb-3">By {author}</p>
        <p className="text-slate-300/90 text-sm leading-relaxed mb-4">{preview}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="text-xs bg-slate-700/60 text-sky-200/90 border border-sky-400/10 px-2 py-1 rounded-full">#{t}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  )}
