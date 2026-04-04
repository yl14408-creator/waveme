import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface Photo {
  id: string;
  src: string;
  caption?: string;
  alt?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  layout?: 'grid' | 'masonry' | 'carousel';
  columns?: 2 | 3 | 4;
}

export function PhotoGallery({
  photos,
  layout: _layout = 'grid',
  columns = 3,
}: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const columnClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  if (photos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>暂无照片</p>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid ${columnClasses[columns]} gap-4`}>
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer bg-gray-100"
            onClick={() => openLightbox(photo, index)}
          >
            <img
              src={photo.src}
              alt={photo.alt || photo.caption || 'Project photo'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            {/* Caption */}
            {photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm truncate">{photo.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={selectedPhoto.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-5xl max-h-[80vh] px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt || selectedPhoto.caption || 'Photo'}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              {selectedPhoto.caption && (
                <p className="text-white/80 text-center mt-4">{selectedPhoto.caption}</p>
              )}
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
              {currentIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
