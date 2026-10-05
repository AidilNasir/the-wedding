import React from 'react';
import { Sparkles, Heart, Infinity as InfinityIcon } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const StorySection: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'sparkle':
        return <Sparkles className="w-3.5 h-3.5 text-[#e6ca65]" />;
      case 'heart':
        return <Heart className="w-3.5 h-3.5 fill-[#e6ca65] text-[#e6ca65]" />;
      case 'infinity':
      default:
        return <InfinityIcon className="w-4 h-4 text-[#e6ca65]" />;
    }
  };

  return (
    <section id="storySection" className="relative py-28 px-6 overflow-hidden">
      {/* Background couple image with subtle dark shading */}
      <div className="absolute inset-0 z-0">
        <img
          src={WEDDING_DATA.images.heroCover}
          alt="Love Story Background"
          className="w-full h-full object-cover object-center opacity-20 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/95 to-[#0a0a0c]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#e6ca65]/90 font-medium">
            Perjalanan Cinta Kami
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl text-[#f9f8f5] font-light mt-2">
            Our Love Story
          </h2>
          <div className="w-16 h-px bg-[#d4af37]/40 mx-auto mt-4"></div>
        </div>

        {/* Story Timeline Cards */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px before:w-0.5 before:bg-gradient-to-b before:from-[#d4af37]/10 before:via-[#d4af37]/40 before:to-[#d4af37]/10">
          {WEDDING_DATA.stories.map((story, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={story.year}
                className="relative flex flex-col md:flex-row items-center"
              >
                {/* Left side content for even, or spacer for odd */}
                <div
                  className={`flex-1 w-full pl-10 md:pl-0 ${
                    !isEven ? 'md:pr-12 md:text-right' : 'hidden md:block'
                  }`}
                >
                  {!isEven && (
                    <div className="glass-card p-6 md:p-8 rounded-2xl border border-[#252530] hover:border-[#d4af37]/30 transition-all shadow-xl">
                      <span className="text-xs font-semibold text-[#e6ca65] tracking-widest uppercase">
                        {story.tag}
                      </span>
                      <h4 className="font-cormorant text-xl text-[#f9f8f5] font-medium mt-1 mb-2">
                        {story.title}
                      </h4>
                      <p className="text-xs md:text-sm text-[#d5d3ce]/80 leading-relaxed font-light">
                        {story.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Central Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#121216] border-2 border-[#e6ca65] flex items-center justify-center text-[#e6ca65] text-xs shadow-lg z-10">
                  {getIcon(story.icon)}
                </div>

                {/* Right side content for odd, or spacer for even */}
                <div
                  className={`flex-1 w-full pl-10 md:pl-12 ${
                    isEven ? 'block' : 'hidden md:block'
                  }`}
                >
                  {isEven && (
                    <div className="glass-card p-6 md:p-8 rounded-2xl border border-[#252530] hover:border-[#d4af37]/30 transition-all shadow-xl">
                      <span className="text-xs font-semibold text-[#e6ca65] tracking-widest uppercase">
                        {story.tag}
                      </span>
                      <h4 className="font-cormorant text-xl text-[#f9f8f5] font-medium mt-1 mb-2">
                        {story.title}
                      </h4>
                      <p className="text-xs md:text-sm text-[#d5d3ce]/80 leading-relaxed font-light">
                        {story.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
