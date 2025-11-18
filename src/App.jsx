import { useEffect, useState } from 'react'
import Header from './components/Header'
import PostCard from './components/PostCard'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/posts`)
        if (!res.ok) throw new Error('Failed to load posts')
        const data = await res.json()
        setPosts(data.items || [])
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(80%_60%_at_50%_20%,rgba(56,189,248,0.08),transparent),radial-gradient(60%_40%_at_30%_70%,rgba(139,92,246,0.07),transparent)]" />

      <Header />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        {/* hero */}
        <section className="mt-6 md:mt-10 mb-10">
          <div className="bg-slate-900/60 border border-sky-400/10 rounded-3xl p-6 md:p-10 overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">OctoVinyl Music Blog</h2>
                <p className="text-sky-200/90 text-base md:text-lg">Discover album reviews, artist spotlights, and curated playlists from across the seven seas of sound.</p>
              </div>
              <a href="/test" className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors">Check backend</a>
            </div>
          </div>
        </section>

        {/* posts grid */}
        <section id="latest">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-white font-semibold">Latest posts</h3>
          </div>

          {loading && (
            <p className="text-sky-200/80">Loading posts…</p>
          )}

          {error && (
            <p className="text-rose-300">{error}</p>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-sky-200/80">
              <p>No posts yet. Add your first review using the form below.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />)
            )}
          </div>
        </section>

        {/* create form */}
        <section className="mt-12">
          <h4 className="text-white font-semibold mb-3">Share a quick review</h4>
          <PostForm onCreated={(newId) => {
            // simple refresh
            window.location.reload()
          }} />
        </section>
      </main>

      <footer id="about" className="relative z-10 border-t border-slate-800/60 py-8 text-center text-sky-200/60">
        <p>Made with love for records and cephalopods.</p>
      </footer>
    </div>
  )
}

function PostForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [cover, setCover] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const body = {
        title, author, content,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        cover_image: cover || null,
      }
      const res = await fetch(`${baseUrl}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error('Failed to create')
      const data = await res.json()
      onCreated?.(data.id)
      setTitle(''); setAuthor(''); setContent(''); setTags(''); setCover('')
    } catch (e) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-sky-400/10 rounded-2xl p-6 space-y-4">
      {error && <p className="text-rose-300">{error}</p>}
      <div className="grid md:grid-cols-2 gap-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="bg-slate-800/80 border border-slate-700 text-white rounded-lg px-3 py-2 outline-none focus:border-sky-500" required />
        <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Author" className="bg-slate-800/80 border border-slate-700 text-white rounded-lg px-3 py-2 outline-none focus:border-sky-500" required />
      </div>
      <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Write your review…" rows="4" className="bg-slate-800/80 border border-slate-700 text-white rounded-lg px-3 py-2 outline-none focus:border-sky-500 w-full" required />
      <div className="grid md:grid-cols-2 gap-4">
        <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags (comma separated)" className="bg-slate-800/80 border border-slate-700 text-white rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
        <input value={cover} onChange={e=>setCover(e.target.value)} placeholder="Cover image URL (optional)" className="bg-slate-800/80 border border-slate-700 text-white rounded-lg px-3 py-2 outline-none focus:border-sky-500" />
      </div>
      <button disabled={submitting} className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-60 text-white font-semibold transition-colors">
        {submitting ? 'Publishing…' : 'Publish'}
      </button>
    </form>
  )
}

export default App
