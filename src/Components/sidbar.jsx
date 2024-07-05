// eslint-disable-next-line no-unused-vars
import React from 'react';
import style from "../Styles/StartShipment.module.css";
export default function sidbar() {
  return (
    <div className="container-fluid">
          <form className="form-horizontal">
            <div className="form-group">
               <label htmlFor="from" className='col-xs-2 control-label'>From</label>
                <div className="col-xs-4">
                    <input type="text" id='from' placeholder='from' className={style.from} />
                </div>
            </div>

            <div className="form-group">
               <label htmlFor="to" className='col-xs-2 control-label'>To</label>
                <div className="col-xs-4">
                    <input type="text" id='to' placeholder='to' className={style.from} />
                </div>
            </div>
            <button className={style.butn} >calculate</button>

         </form>

        </div>  
  )
}
