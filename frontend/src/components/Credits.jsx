export const Credits = ({
  extractedHotLink, extractedPhotoOwner, extractedPhotoOwnerLink,
}) => {
  return (
    <>
      <span className="source">
        <p>
          Photo by <a href={extractedHotLink}>{extractedPhotoOwner}</a> on{" "}
          <a href={extractedPhotoOwnerLink}>Unsplash</a>
        </p>
      </span>
    </>
  );
};
