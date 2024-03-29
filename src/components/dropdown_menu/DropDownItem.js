
import React from 'react';
import '../../styles/DropDownItem.css';

function DropDownItem(props) {

  const handleOptionClick = () => {
    if (props.option_action) {
      props.option_action();
    }
    console.log("Option Name: ", props.name);
  };

  return (
    <div className="dropdown_option">
      <a href={props.link} onClick={handleOptionClick}>
      <div className="dropdown_option_imgLink">
        <img className="option_img" src={props.img} alt={props.altImg} />
        {props.name}
      </div>
      <img className="pointer_img" src={props.pointer} alt="pointer_imagem" />
      </a>
    </div>
  )
}

export default DropDownItem