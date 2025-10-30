import { profile } from '../../data/profile'

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold">About</h2>
        <p className="mt-4 text-white/80 leading-relaxed">
          {profile.about}
        </p>
      </div>
    </section>
  )
}



