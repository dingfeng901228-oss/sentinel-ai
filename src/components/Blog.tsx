import { useState } from 'react'

interface BlogPost {
  type: 'featured' | 'standard'
  badge?: string
  title: string
  description?: string
  author?: string
  category: string
  category_color: string
  video_url: string
  display_order: number
}

const blogPosts: BlogPost[] = [
  {
    type: 'featured',
    badge: 'Must Read',
    title: 'Full-Frame vs. Crop Sensor: Which for Photography?',
    description: 'An honest look at the real-world differences between these camera systems to help you choose what\'s actually right for your photography needs.',
    author: 'By August Renner ©',
    category: 'Gear',
    category_color: '#7d1a4a',
    video_url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_155500_808e6fdd-761f-4acd-b3be-cb7e6e700def.mp4',
    display_order: 1,
  },
  {
    type: 'standard',
    title: 'Finding Natural Light in Unexpected Places',
    category: 'Lighting',
    category_color: '#2c4c34',
    video_url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4',
    display_order: 2,
  },
  {
    type: 'standard',
    title: 'My Approach to Editing: Creating a Consistent Photography Style',
    category: 'Editing',
    category_color: '#a63e2d',
    video_url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4',
    display_order: 3,
  },
  {
    type: 'standard',
    title: 'Pricing Your Photography: Strategies That Work',
    category: 'Business',
    category_color: '#1a2b8c',
    video_url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154232_f8809bd2-a6c3-4a38-908d-2005e5b3cb3e.mp4',
    display_order: 4,
  },
]

function VideoContainer({
  post,
  aspectClass = 'aspect-[16/10]',
  featured = false,
  className = '',
}: {
  post: BlogPost
  aspectClass?: string
  featured?: boolean
  className?: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`video-container relative overflow-hidden rounded-[20px] ${featured ? 'flex-1 min-h-[300px] md:min-h-[520px]' : aspectClass} cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video */}
      <video
        src={post.video_url}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className={`video-overlay absolute inset-0 bg-black/25 pointer-events-none ${isHovered ? '' : ''}`} />

      {/* Corner brackets */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`corner-bracket absolute w-3 h-3 border-t border-l border-white m-[15px] ${isHovered ? '' : ''}`} />
        <div className={`corner-bracket absolute top-0 right-0 w-3 h-3 border-t border-r border-white m-[15px] ${isHovered ? '' : ''}`} />
        <div className={`corner-bracket absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white m-[15px] ${isHovered ? '' : ''}`} />
        <div className={`corner-bracket absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white m-[15px] ${isHovered ? '' : ''}`} />
      </div>

      {/* Plus icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`plus-icon w-[70px] h-[70px] rounded-full bg-white/20 flex items-center justify-center ${isHovered ? '' : ''}`}>
          <span className="text-white text-3xl font-light">+</span>
        </div>
      </div>
    </div>
  )
}

function CategoryBadge({ category, color }: { category: string; color: string }) {
  return (
    <span
      className="inline-block text-white text-[11px] font-semibold capitalize px-[4px] py-[4px] rounded-[20px] shrink-0"
      style={{ backgroundColor: color }}
    >
      {category}
    </span>
  )
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <div className="featured-post grid grid-cols-1 lg:grid-cols-2 rounded-[20px] border border-[#f0f0f0] bg-[#fcfcfc] min-h-[520px] overflow-hidden">
      {/* Left: Video */}
      <VideoContainer post={post} featured />

      {/* Right: Content */}
      <div className="featured-content p-[40px] lg:p-[60px] flex flex-col">
        {/* Badge */}
        <div className="mb-4">
          <span className="inline-block bg-black text-white text-[12px] font-semibold px-4 py-2 rounded-[20px]">
            Must Read
          </span>
        </div>

        {/* Title */}
        <h3 className="featured-title font-outfit font-medium text-[#1a1a1a] leading-tight mb-4" style={{ fontSize: 'clamp(24px, 4vw, 48px)', letterSpacing: '-1.5px' }}>
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-[#666] text-[17px] leading-relaxed opacity-80 font-medium">
          {post.description}
        </p>

        {/* Footer: Author + Category pushed to bottom */}
        <div className="mt-auto pt-8 flex items-center justify-between">
          <span className="text-[#333] text-[14px] font-medium">{post.author}</span>
          <CategoryBadge category={post.category} color={post.category_color} />
        </div>
      </div>
    </div>
  )
}

function StandardCard({ post }: { post: BlogPost }) {
  return (
    <div className="blog-card group cursor-pointer">
      {/* Video container */}
      <VideoContainer post={post} />

      {/* Title + Category badge */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <h4 className="font-outfit font-semibold text-[17px] text-[#1a1a1a] leading-tight flex-1">
          {post.title}
        </h4>
        <CategoryBadge category={post.category} color={post.category_color} />
      </div>
    </div>
  )
}

export function Blog() {
  const featured = blogPosts.find((p) => p.type === 'featured')
  const standards = blogPosts.filter((p) => p.type === 'standard')

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 py-[60px]">
        {/* Header */}
        <div className="mb-12">
          {/* Badge */}
          <div className="mb-4">
            <span className="inline-block bg-[#f4f4f4] text-[#333] text-[12px] font-medium px-3 py-1 rounded-[8px]">
              Blog
            </span>
          </div>

          {/* Heading + Subtitle + View all button */}
          <div className="header-bottom flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
              <h2 className="blog-heading font-outfit font-medium text-[#1a1a1a] mb-3" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-2.5px' }}>
                Behind the lens
              </h2>
              <p className="text-[#666] text-[18px] font-medium opacity-80 max-w-[480px]">
                Thoughts, insights, and stories from my photography journey. Take a peek into my creative process and recent projects.
              </p>
            </div>

            {/* View all posts button */}
            <button className="view-all-btn inline-flex items-center justify-center bg-black text-white text-[14px] font-semibold px-6 py-3 rounded-[40px] whitespace-nowrap transition-transform duration-200 self-start md:self-auto">
              View all posts
            </button>
          </div>
        </div>

        {/* Featured Post */}
        {featured && (
          <div className="mb-10">
            <FeaturedPost post={featured} />
          </div>
        )}

        {/* Blog Grid */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
          {standards.map((post) => (
            <StandardCard key={post.display_order} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}