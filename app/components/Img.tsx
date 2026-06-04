import Image, { ImageProps } from 'next/image';

type WebImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src: string;
  altText?: string;
  imgClass?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
};

export default function Img({
  src,
  altText,
  imgClass,
  priority = false,
  width,
  height,
  placeholder = 'empty',
  blurDataURL,
  ...props
}: WebImageProps) {
  const combinedClasses = [`brand-img-layer`, imgClass].filter(Boolean).join(' ');

  return (
    <>
      <Image
        src={src}
        alt={altText ?? 'Kutra Image'}
        width={width ?? 128}
        height={height ?? 128}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={combinedClasses}
        quality={90}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    </>
  );
}