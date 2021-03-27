import { FC } from "react";

import CustomCSSReset from "./CustomCSSReset";

interface Props {
  html: string;
}

const PreviewContainer: FC<Props> = ({ html }) => {
  return (
    <CustomCSSReset>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </CustomCSSReset>
  );
};
export default PreviewContainer;
