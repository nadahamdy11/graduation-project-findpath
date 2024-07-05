import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import style from "../Styles/Reviews.module.css";
import { Rate } from 'antd'
function ReviewCard({ children, image }) {
  return (
    <div className="reviewcard " >
      <img className={style.image} src={image} />
      <div className={style.card} >
        <div className="pt-5">
          {
            <div className=" icon text-center mt-4 mb-4 text-warning fs-3">
              <Rate allowHalf defaultValue={2.5} style={{fontSize:"20px"}} />
            </div>
            
          }
          <div className="text-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
ReviewCard.propTypes = {
  image: PropTypes.node,
  children: PropTypes.node,
};
export default ReviewCard;
