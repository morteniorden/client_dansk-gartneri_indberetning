import { FC } from "react";

interface Props {
  html: string;
}

const PreviewContainer: FC<Props> = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};
export default PreviewContainer;
