import Image from 'next/image';

const ImageMapper = (images: string[],changeCurrentImage: React.Dispatch<React.SetStateAction<string>>) => {
    return images.map(x => (
      <div className="other-image" key={x}>
          <Image src={x} width="55px" height="55px" onClick={() => changeCurrentImage(x)} />
      </div>
    ))
}

export default ImageMapper;