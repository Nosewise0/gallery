import { useEffect, useRef } from 'react';
import InfiniteGallery from "@/components/ui/3d-gallery-photography";

export default function GalleryDemo() {
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		const handleUserInteraction = () => {
			if (audioRef.current) {
				audioRef.current.volume = 0.5;
				audioRef.current.play().catch((error) => {
					console.log('Audio autoplay prevented:', error);
				});
			}
			document.removeEventListener('click', handleUserInteraction);
			document.removeEventListener('wheel', handleUserInteraction);
			document.removeEventListener('keydown', handleUserInteraction);
			document.removeEventListener('touchstart', handleUserInteraction);
		};

		document.addEventListener('click', handleUserInteraction);
		document.addEventListener('wheel', handleUserInteraction);
		document.addEventListener('keydown', handleUserInteraction);
		document.addEventListener('touchstart', handleUserInteraction);

		return () => {
			document.removeEventListener('click', handleUserInteraction);
			document.removeEventListener('wheel', handleUserInteraction);
			document.removeEventListener('keydown', handleUserInteraction);
			document.removeEventListener('touchstart', handleUserInteraction);
		};
	}, []);

	const sampleImages = [
		{ src: '/1.jpg', alt: 'Portrait 1' },
		{ src: '/2.jpg', alt: 'Portrait 2' },
		{ src: '/3.jpg', alt: 'Portrait 3' },
		{ src: '/4.jpg', alt: 'Portrait 4' },
		{ src: '/5.jpg', alt: 'Portrait 5' },
		{ src: '/6.jpg', alt: 'Portrait 6' },
		{ src: '/7.jpg', alt: 'Portrait 7' },
		{ src: '/8.jpg', alt: 'Portrait 8' },
		{ src: '/9.jpg', alt: 'Portrait 9' },
	];

	return (
		<main className="min-h-screen h-full w-full">
			<audio
				ref={audioRef}
				src="/music.mp3"
				loop
			/>
			<InfiniteGallery
				images={sampleImages}
				speed={1.2}
				zSpacing={3}
				visibleCount={12}
				falloff={{ near: 0.8, far: 14 }}
				className="h-screen w-full rounded-lg overflow-hidden"
			/>
			<div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
				<h1 className="font-serif text-4xl md:text-7xl tracking-tight">
					<span className="italic">My Pretty Baby</span>
				</h1>
			</div>

			<div className="text-center fixed bottom-10 left-0 right-0 font-mono uppercase text-[11px] font-semibold">
				<p>Use mouse wheel, arrow keys, or touch to navigate</p>
				<p className="opacity-60">
					Auto-play resumes after 3 seconds of inactivity
				</p>
			</div>
		</main>
	);
}
