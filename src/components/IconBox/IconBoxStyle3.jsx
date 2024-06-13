import colors from "../../colorTheme";
import SectionHeading from "../SectionHeading";

export default function IconBoxStyle3({ item, index }) {
  const { CCTitle, CCDescription, CCImage, CCQuote } = item;

  return (

    <div className="cs_iconbox cs_style_3 " >
      <div className="cs_iconbox_left" >
        <div className=" cs_center " >
          <img src={CCImage} alt="Icon" />
        </div>
      </div>
      <div className="cs_iconbox_right" >
        <h4 className="cs_iconbox_number font-medium	" style={{color: colors.secondary}}>{index}</h4>
        <h2 className="cs_iconbox_title cs_fs_32  font-medium" >
          {CCTitle}
        </h2>
        <p className="cs_iconbox_subtitle m-0 font-normal	" >{CCDescription}</p>
        <SectionHeading titleDown={CCQuote} titleDownProps="1px"/>
      </div>
    </div>
  );
}
