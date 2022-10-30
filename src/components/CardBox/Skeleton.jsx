import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={4}
    width={386}
    height={444}
    viewBox="0 0 386 444"
    backgroundColor="#c7c7c7"
    foregroundColor="#ededed"
    {...props}
  >
    <rect x="10" y="10" rx="0" ry="0" width="335" height="340" />
    <rect x="10" y="355" rx="0" ry="0" width="226" height="15" />
    <rect x="10" y="370" rx="0" ry="0" width="103" height="15" />
    <circle cx="310" cy="360" r="27" />
  </ContentLoader>
);

export default Skeleton;
