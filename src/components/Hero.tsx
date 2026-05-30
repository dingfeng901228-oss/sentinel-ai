import { Suspense, lazy, useState } from "react"

const Spline = lazy(() => import("@splinetool/react-spline").then(m => ({ default: m.default })))

function SplineFallback() {
  return <div className="absolute inset-0 bg-gradient-to-br from-hero-bg via-background to-hero-bg" />
}

function SplineErrorFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-hero-bg via-background to-hero-bg">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-2xl" />
      </div>
    </div>
  )
}

function SplineWithFallback() {
  const [hasError, setHasError] = useState(false)

  return (
    <Suspense fallback={<SplineFallback />}>
      {hasError ? (
        <SplineErrorFallback />
      ) : (
        <Spline
          scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
          className="w-full h-full"
          onError={() => setHasError(true)}
        />
      )}
    </Suspense>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-hero-bg">
      {/* Spline 3D Background */}
      <div className="absolute inset-0">
        <SplineWithFallback />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />

      {/* Content container */}
      <div className="relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-md lg:max-w-2xl px-6 md:px-10 pb-10 md:pb-10 pt-32">
        {/* Heading */}
        <h1
          className="animate-fade-up text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.05em] text-foreground mb-2 md:mb-4 uppercase"
          style={{ animationDelay: "0.2s" }}
        >
          SENTINEL <span className="text-primary">AI</span>
        </h1>

        {/* Subheading */}
        <p
          className="animate-fade-up text-foreground/80 text-[clamp(1.125rem,2.5vw,1.875rem)] font-light mb-3 md:mb-6"
          style={{ animationDelay: "0.4s" }}
        >
          We implement security correctly.
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-up flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8"
          style={{ animationDelay: "0.6s" }}
        >
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.97] transition-all rounded-lg uppercase text-xs tracking-widest px-8 py-4 font-medium">
            Our Solutions
          </button>
          <button className="border border-border bg-transparent text-foreground hover:bg-secondary active:scale-[0.97] transition-all rounded-lg uppercase text-xs tracking-widest px-8 py-4 font-medium">
            Contact Us
          </button>
        </div>

        {/* Stats row */}
        <div
          className="animate-fade-up flex flex-wrap gap-6 sm:gap-12 text-foreground"
          style={{ animationDelay: "0.8s" }}
        >
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-primary">99.9%</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Detection Rate</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-primary">&lt;50ms</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Response Time</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-primary">24/7</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Active Monitoring</p>
          </div>
        </div>
      </div>
    </section>
  )
}