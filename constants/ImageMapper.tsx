
const ImageMapper = (images: string[],changeCurrentImage: React.Dispatch<React.SetStateAction<string>>, darkMode: boolean) => {
  if (images === null || images === undefined || images.length === 0) return;
    return images.map(x => (
      <div className={darkMode ? "other-image-dark" : "other-image"} key={x}>
          <img src={x} width="55px" height="55px" onClick={() => changeCurrentImage(x)} />
      </div>
    ))
}

export default ImageMapper;